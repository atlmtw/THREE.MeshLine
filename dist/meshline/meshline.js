"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshLine = void 0;

var THREE = _interopRequireWildcard(require("three"));

var _raycast = require("./raycast");

var _utils = require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MeshLine = /*#__PURE__*/function (_THREE$BufferGeometry) {
  _inherits(MeshLine, _THREE$BufferGeometry);

  var _super = _createSuper(MeshLine);

  function MeshLine() {
    var _this;

    _classCallCheck(this, MeshLine);

    _this = _super.call(this);
    _this.type = 'MeshLine';
    _this.isMeshLine = true;
    _this.positions = [];
    _this.raycast = _raycast.MeshLineRaycast;
    _this.previous = [];
    _this.next = [];
    _this.side = [];
    _this.width = [];
    _this.indices_array = [];
    _this.uvs = [];
    _this.counters = [];
    _this._points = [];
    _this._geom = null;
    _this.widthCallback = null; // Used to raycast

    _this.matrixWorld = new THREE.Matrix4();
    Object.defineProperties(_assertThisInitialized(_this), {
      // this is now a bufferGeometry
      // add getter to support previous api
      geometry: {
        enumerable: true,
        get: function get() {
          return this;
        }
      },
      geom: {
        enumerable: true,
        get: function get() {
          return this._geom;
        },
        set: function set(value) {
          this.setGeometry(value, this.widthCallback);
        }
      },
      // for declaritive architectures
      // to return the same value that sets the points
      // eg. this.points = points
      // console.log(this.points) -> points
      points: {
        enumerable: true,
        get: function get() {
          return this._points;
        },
        set: function set(value) {
          this.setPoints(value, this.widthCallback);
        }
      }
    });
    return _this;
  }

  _createClass(MeshLine, [{
    key: "setMatrixWorld",
    value: function setMatrixWorld(matrixWorld) {
      this.matrixWorld = matrixWorld;
    } // setting via a geometry is rather superfluous
    // as you're creating a unecessary geometry just to throw away
    // but exists to support previous api

  }, {
    key: "setGeometry",
    value: function setGeometry(g, c) {
      // as the input geometry are mutated we store them
      // for later retreival when necessary (declaritive architectures)
      this._geometry = g;

      if (g instanceof THREE.BufferGeometry) {
        this.setPoints(g.getAttribute('position').array, c);
      } else {
        this.setPoints(g, c);
      }
    }
  }, {
    key: "setPoints",
    value: function setPoints(points, wcb) {
      if (!(points instanceof Float32Array) && !(points instanceof Array)) {
        console.error('ERROR: The BufferArray of points is not instancied correctly.');
        return;
      } // as the points are mutated we store them
      // for later retreival when necessary (declaritive architectures)


      this._points = points;
      this.widthCallback = wcb;
      this.positions = [];
      this.counters = [];

      if (points.length && points[0] instanceof THREE.Vector3) {
        // could transform Vector3 array into the array used below
        // but this approach will only loop through the array once
        // and is more performant
        for (var j = 0; j < points.length; j++) {
          var p = points[j];
          var c = j / points.length;
          this.positions.push(p.x, p.y, p.z);
          this.positions.push(p.x, p.y, p.z);
          this.counters.push(c);
          this.counters.push(c);
        }
      } else {
        for (var j = 0; j < points.length; j += 3) {
          var c = j / points.length;
          this.positions.push(points[j], points[j + 1], points[j + 2]);
          this.positions.push(points[j], points[j + 1], points[j + 2]);
          this.counters.push(c);
          this.counters.push(c);
        }
      }

      this.process();
    }
  }, {
    key: "compareV3",
    value: function compareV3(a, b) {
      var aa = a * 6;
      var ab = b * 6;
      return this.positions[aa] === this.positions[ab] && this.positions[aa + 1] === this.positions[ab + 1] && this.positions[aa + 2] === this.positions[ab + 2];
    }
  }, {
    key: "copyV3",
    value: function copyV3(a) {
      var aa = a * 6;
      return [this.positions[aa], this.positions[aa + 1], this.positions[aa + 2]];
    }
  }, {
    key: "process",
    value: function process() {
      var l = this.positions.length / 6;
      this.previous = [];
      this.next = [];
      this.side = [];
      this.width = [];
      this.indices_array = [];
      this.uvs = [];
      var w;
      var v; // initial previous points

      if (this.compareV3(0, l - 1)) {
        v = this.copyV3(l - 2);
      } else {
        v = this.copyV3(0);
      }

      this.previous.push(v[0], v[1], v[2]);
      this.previous.push(v[0], v[1], v[2]);

      for (var j = 0; j < l; j++) {
        // sides
        this.side.push(1);
        this.side.push(-1); // widths

        if (this.widthCallback) w = this.widthCallback(j / (l - 1));else w = 1;
        this.width.push(w);
        this.width.push(w); // uvs

        this.uvs.push(j / (l - 1), 0);
        this.uvs.push(j / (l - 1), 1);

        if (j < l - 1) {
          // points previous to poisitions
          v = this.copyV3(j);
          this.previous.push(v[0], v[1], v[2]);
          this.previous.push(v[0], v[1], v[2]); // indices

          var n = j * 2;
          this.indices_array.push(n, n + 1, n + 2);
          this.indices_array.push(n + 2, n + 1, n + 3);
        }

        if (j > 0) {
          // points after poisitions
          v = this.copyV3(j);
          this.next.push(v[0], v[1], v[2]);
          this.next.push(v[0], v[1], v[2]);
        }
      } // last next point


      if (this.compareV3(l - 1, 0)) {
        v = this.copyV3(1);
      } else {
        v = this.copyV3(l - 1);
      }

      this.next.push(v[0], v[1], v[2]);
      this.next.push(v[0], v[1], v[2]); // redefining the attribute seems to prevent range errors
      // if the user sets a differing number of vertices

      if (!this._attributes || this._attributes.position.count !== this.positions.length) {
        this._attributes = {
          position: new THREE.BufferAttribute(new Float32Array(this.positions), 3),
          previous: new THREE.BufferAttribute(new Float32Array(this.previous), 3),
          next: new THREE.BufferAttribute(new Float32Array(this.next), 3),
          side: new THREE.BufferAttribute(new Float32Array(this.side), 1),
          width: new THREE.BufferAttribute(new Float32Array(this.width), 1),
          uv: new THREE.BufferAttribute(new Float32Array(this.uvs), 2),
          index: new THREE.BufferAttribute(new Uint16Array(this.indices_array), 1),
          counters: new THREE.BufferAttribute(new Float32Array(this.counters), 1)
        };
      } else {
        this._attributes.position.copyArray(new Float32Array(this.positions));

        this._attributes.position.needsUpdate = true;

        this._attributes.previous.copyArray(new Float32Array(this.previous));

        this._attributes.previous.needsUpdate = true;

        this._attributes.next.copyArray(new Float32Array(this.next));

        this._attributes.next.needsUpdate = true;

        this._attributes.side.copyArray(new Float32Array(this.side));

        this._attributes.side.needsUpdate = true;

        this._attributes.width.copyArray(new Float32Array(this.width));

        this._attributes.width.needsUpdate = true;

        this._attributes.uv.copyArray(new Float32Array(this.uvs));

        this._attributes.uv.needsUpdate = true;

        this._attributes.index.copyArray(new Uint16Array(this.indices_array));

        this._attributes.index.needsUpdate = true;
      }

      this.setAttribute('position', this._attributes.position);
      this.setAttribute('previous', this._attributes.previous);
      this.setAttribute('next', this._attributes.next);
      this.setAttribute('side', this._attributes.side);
      this.setAttribute('width', this._attributes.width);
      this.setAttribute('uv', this._attributes.uv);
      this.setAttribute('counters', this._attributes.counters);
      this.setIndex(this._attributes.index);
      this.computeBoundingSphere();
      this.computeBoundingBox();
    }
    /**
     * Fast method to advance the line by one position.  The oldest position is removed.
     * @param position
     */

  }, {
    key: "advance",
    value: function advance(_ref) {
      var x = _ref.x,
          y = _ref.y,
          z = _ref.z;
      var positions = this._attributes.position.array;
      var previous = this._attributes.previous.array;
      var next = this._attributes.next.array;
      var l = positions.length; // PREVIOUS

      (0, _utils.memcpy)(positions, 0, previous, 0, l); // POSITIONS

      (0, _utils.memcpy)(positions, 6, positions, 0, l - 6);
      positions[l - 6] = x;
      positions[l - 5] = y;
      positions[l - 4] = z;
      positions[l - 3] = x;
      positions[l - 2] = y;
      positions[l - 1] = z; // NEXT

      (0, _utils.memcpy)(positions, 6, next, 0, l - 6);
      next[l - 6] = x;
      next[l - 5] = y;
      next[l - 4] = z;
      next[l - 3] = x;
      next[l - 2] = y;
      next[l - 1] = z;
      this._attributes.position.needsUpdate = true;
      this._attributes.previous.needsUpdate = true;
      this._attributes.next.needsUpdate = true;
    }
  }]);

  return MeshLine;
}(THREE.BufferGeometry);

exports.MeshLine = MeshLine;