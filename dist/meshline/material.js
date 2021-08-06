"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshLineMaterial = void 0;

var THREE = _interopRequireWildcard(require("three"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

THREE.ShaderChunk['meshline_vert'] = ['', '#include <common>', '', THREE.ShaderChunk.logdepthbuf_pars_vertex, THREE.ShaderChunk.fog_pars_vertex, '', 'attribute vec3 previous;', 'attribute vec3 next;', 'attribute float side;', 'attribute float width;', 'attribute float counters;', '', 'uniform vec2 resolution;', 'uniform float lineWidth;', 'uniform vec3 color;', 'uniform float opacity;', 'uniform float sizeAttenuation;', '', 'varying vec2 vUV;', 'varying vec4 vColor;', 'varying float vCounters;', '', 'vec2 fix( vec4 i, float aspect ) {', '', '    vec2 res = i.xy / i.w;', '    res.x *= aspect;', '	 vCounters = counters;', '    return res;', '', '}', '', 'void main() {', '', '    float aspect = resolution.x / resolution.y;', '', '    vColor = vec4( color, opacity );', '    vUV = uv;', '', '    mat4 m = projectionMatrix * modelViewMatrix;', '    vec4 finalPosition = m * vec4( position, 1.0 );', '    vec4 prevPos = m * vec4( previous, 1.0 );', '    vec4 nextPos = m * vec4( next, 1.0 );', '', '    vec2 currentP = fix( finalPosition, aspect );', '    vec2 prevP = fix( prevPos, aspect );', '    vec2 nextP = fix( nextPos, aspect );', '', '    float w = lineWidth * width;', '', '    vec2 dir;', '    if( nextP == currentP ) dir = normalize( currentP - prevP );', '    else if( prevP == currentP ) dir = normalize( nextP - currentP );', '    else {', '        vec2 dir1 = normalize( currentP - prevP );', '        vec2 dir2 = normalize( nextP - currentP );', '        dir = normalize( dir1 + dir2 );', '', '        vec2 perp = vec2( -dir1.y, dir1.x );', '        vec2 miter = vec2( -dir.y, dir.x );', '        //w = clamp( w / dot( miter, perp ), 0., 4. * lineWidth * width );', '', '    }', '', '    //vec2 normal = ( cross( vec3( dir, 0. ), vec3( 0., 0., 1. ) ) ).xy;', '    vec4 normal = vec4( -dir.y, dir.x, 0., 1. );', '    normal.xy *= .5 * w;', '    normal *= projectionMatrix;', '    if( sizeAttenuation == 0. ) {', '        normal.xy *= finalPosition.w;', '        normal.xy /= ( vec4( resolution, 0., 1. ) * projectionMatrix ).xy;', '    }', '', '    finalPosition.xy += normal.xy * side;', '', '    gl_Position = finalPosition;', '', THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.fog_vertex && '    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );', THREE.ShaderChunk.fog_vertex, '}'].join('\n');
THREE.ShaderChunk['meshline_frag'] = ['', THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, '', 'uniform sampler2D map;', 'uniform sampler2D alphaMap;', 'uniform float useMap;', 'uniform float useAlphaMap;', 'uniform float useDash;', 'uniform float dashArray;', 'uniform float dashOffset;', 'uniform float dashRatio;', 'uniform float visibility;', 'uniform float alphaTest;', 'uniform vec2 repeat;', '', 'varying vec2 vUV;', 'varying vec4 vColor;', 'varying float vCounters;', '', 'void main() {', '', THREE.ShaderChunk.logdepthbuf_fragment, '', '    vec4 c = vColor;', '    if( useMap == 1. ) c *= texture2D( map, vUV * repeat );', '    if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUV * repeat ).a;', '    if( c.a < alphaTest ) discard;', '    if( useDash == 1. ){', '        c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));', '    }', '    gl_FragColor = c;', '    gl_FragColor.a *= step(vCounters, visibility);', '', THREE.ShaderChunk.fog_fragment, '}'].join('\n');

var MeshLineMaterial = /*#__PURE__*/function (_THREE$ShaderMaterial) {
  _inherits(MeshLineMaterial, _THREE$ShaderMaterial);

  var _super = _createSuper(MeshLineMaterial);

  function MeshLineMaterial(parameters) {
    var _this;

    _classCallCheck(this, MeshLineMaterial);

    _this = _super.call(this, {
      uniforms: Object.assign({}, THREE.UniformsLib.fog, {
        lineWidth: {
          value: 1
        },
        map: {
          value: null
        },
        useMap: {
          value: 0
        },
        alphaMap: {
          value: null
        },
        useAlphaMap: {
          value: 0
        },
        color: {
          value: new THREE.Color(0xffffff)
        },
        opacity: {
          value: 1
        },
        resolution: {
          value: new THREE.Vector2(1, 1)
        },
        sizeAttenuation: {
          value: 1
        },
        dashArray: {
          value: 0
        },
        dashOffset: {
          value: 0
        },
        dashRatio: {
          value: 0.5
        },
        useDash: {
          value: 0
        },
        visibility: {
          value: 1
        },
        alphaTest: {
          value: 0
        },
        repeat: {
          value: new THREE.Vector2(1, 1)
        }
      }),
      vertexShader: THREE.ShaderChunk.meshline_vert,
      fragmentShader: THREE.ShaderChunk.meshline_frag
    });
    _this.type = 'MeshLineMaterial';
    Object.defineProperties(_assertThisInitialized(_this), {
      lineWidth: {
        enumerable: true,
        get: function get() {
          return this.uniforms.lineWidth.value;
        },
        set: function set(value) {
          this.uniforms.lineWidth.value = value;
        }
      },
      map: {
        enumerable: true,
        get: function get() {
          return this.uniforms.map.value;
        },
        set: function set(value) {
          this.uniforms.map.value = value;
        }
      },
      useMap: {
        enumerable: true,
        get: function get() {
          return this.uniforms.useMap.value;
        },
        set: function set(value) {
          this.uniforms.useMap.value = value;
        }
      },
      alphaMap: {
        enumerable: true,
        get: function get() {
          return this.uniforms.alphaMap.value;
        },
        set: function set(value) {
          this.uniforms.alphaMap.value = value;
        }
      },
      useAlphaMap: {
        enumerable: true,
        get: function get() {
          return this.uniforms.useAlphaMap.value;
        },
        set: function set(value) {
          this.uniforms.useAlphaMap.value = value;
        }
      },
      color: {
        enumerable: true,
        get: function get() {
          return this.uniforms.color.value;
        },
        set: function set(value) {
          this.uniforms.color.value = value;
        }
      },
      opacity: {
        enumerable: true,
        get: function get() {
          return this.uniforms.opacity.value;
        },
        set: function set(value) {
          this.uniforms.opacity.value = value;
        }
      },
      resolution: {
        enumerable: true,
        get: function get() {
          return this.uniforms.resolution.value;
        },
        set: function set(value) {
          this.uniforms.resolution.value.copy(value);
        }
      },
      sizeAttenuation: {
        enumerable: true,
        get: function get() {
          return this.uniforms.sizeAttenuation.value;
        },
        set: function set(value) {
          this.uniforms.sizeAttenuation.value = value;
        }
      },
      dashArray: {
        enumerable: true,
        get: function get() {
          return this.uniforms.dashArray.value;
        },
        set: function set(value) {
          this.uniforms.dashArray.value = value;
          this.useDash = value !== 0 ? 1 : 0;
        }
      },
      dashOffset: {
        enumerable: true,
        get: function get() {
          return this.uniforms.dashOffset.value;
        },
        set: function set(value) {
          this.uniforms.dashOffset.value = value;
        }
      },
      dashRatio: {
        enumerable: true,
        get: function get() {
          return this.uniforms.dashRatio.value;
        },
        set: function set(value) {
          this.uniforms.dashRatio.value = value;
        }
      },
      useDash: {
        enumerable: true,
        get: function get() {
          return this.uniforms.useDash.value;
        },
        set: function set(value) {
          this.uniforms.useDash.value = value;
        }
      },
      visibility: {
        enumerable: true,
        get: function get() {
          return this.uniforms.visibility.value;
        },
        set: function set(value) {
          this.uniforms.visibility.value = value;
        }
      },
      alphaTest: {
        enumerable: true,
        get: function get() {
          return this.uniforms.alphaTest.value;
        },
        set: function set(value) {
          this.uniforms.alphaTest.value = value;
        }
      },
      repeat: {
        enumerable: true,
        get: function get() {
          return this.uniforms.repeat.value;
        },
        set: function set(value) {
          this.uniforms.repeat.value.copy(value);
        }
      }
    });

    _this.setValues(parameters);

    return _this;
  }

  _createClass(MeshLineMaterial, [{
    key: "copy",
    value: function copy(source) {
      _get(_getPrototypeOf(MeshLineMaterial.prototype), "copy", this).call(this, source);

      this.lineWidth = source.lineWidth;
      this.map = source.map;
      this.useMap = source.useMap;
      this.alphaMap = source.alphaMap;
      this.useAlphaMap = source.useAlphaMap;
      this.color.copy(source.color);
      this.opacity = source.opacity;
      this.resolution.copy(source.resolution);
      this.sizeAttenuation = source.sizeAttenuation;
      this.dashArray.copy(source.dashArray);
      this.dashOffset.copy(source.dashOffset);
      this.dashRatio.copy(source.dashRatio);
      this.useDash = source.useDash;
      this.visibility = source.visibility;
      this.alphaTest = source.alphaTest;
      this.repeat.copy(source.repeat);
      return this;
    }
  }]);

  return MeshLineMaterial;
}(THREE.ShaderMaterial);

exports.MeshLineMaterial = MeshLineMaterial;