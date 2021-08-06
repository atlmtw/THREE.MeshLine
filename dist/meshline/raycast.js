"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshLineRaycast = MeshLineRaycast;

var THREE = _interopRequireWildcard(require("three"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function MeshLineRaycast(raycaster, intersects) {
  var inverseMatrix = new THREE.Matrix4();
  var ray = new THREE.Ray();
  var sphere = new THREE.Sphere();
  var interRay = new THREE.Vector3();
  var geometry = this.geometry; // Checking boundingSphere distance to ray

  sphere.copy(geometry.boundingSphere);
  sphere.applyMatrix4(this.matrixWorld);

  if (raycaster.ray.intersectSphere(sphere, interRay) === false) {
    return;
  }

  inverseMatrix.getInverse(this.matrixWorld);
  ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);
  var vStart = new THREE.Vector3();
  var vEnd = new THREE.Vector3();
  var interSegment = new THREE.Vector3();
  var step = this instanceof THREE.LineSegments ? 2 : 1;
  var index = geometry.index;
  var attributes = geometry.attributes;

  if (index !== null) {
    var indices = index.array;
    var positions = attributes.position.array;
    var widths = attributes.width.array;

    for (var i = 0, l = indices.length - 1; i < l; i += step) {
      var a = indices[i];
      var b = indices[i + 1];
      vStart.fromArray(positions, a * 3);
      vEnd.fromArray(positions, b * 3);
      var width = widths[Math.floor(i / 3)] != undefined ? widths[Math.floor(i / 3)] : 1;
      var precision = raycaster.params.Line.threshold + this.material.lineWidth * width / 2;
      var precisionSq = precision * precision;
      var distSq = ray.distanceSqToSegment(vStart, vEnd, interRay, interSegment);
      if (distSq > precisionSq) continue;
      interRay.applyMatrix4(this.matrixWorld); //Move back to world space for distance calculation

      var distance = raycaster.ray.origin.distanceTo(interRay);
      if (distance < raycaster.near || distance > raycaster.far) continue;
      intersects.push({
        distance: distance,
        // What do we want? intersection point on the ray or on the segment??
        // point: raycaster.ray.at( distance ),
        point: interSegment.clone().applyMatrix4(this.matrixWorld),
        index: i,
        face: null,
        faceIndex: null,
        object: this
      }); // make event only fire once

      i = l;
    }
  }
}