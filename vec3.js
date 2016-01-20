(function(label, definition) {
  "use strict";
  // Montage Require
  if (typeof bootstrap === "function") {
    bootstrap(label, definition);
    // CommonJS
  } else if (typeof exports === "object" && typeof module === "object") {
    module.exports = definition();
    // RequireJS
  } else if (typeof define === "function" && define.amd) {
    define(definition);
    // SES (Secure EcmaScript)
  } else if (typeof ses !== "undefined") {
    if (ses.ok()) {
      ses[label] = definition;
    }
    // <script>
  } else if (typeof self !== "undefined") {
    self[label] = definition();
  } else {
    throw new Error();
  }
})("vec3", function definition() {

  /**
   * Copyright (c) Flyover Games, LLC
   */

  var node_vec3 = null;
  try {
    node_vec3 = node_vec3 || require('./build/Release/vec3');
  } catch (err) {}
  try {
    node_vec3 = node_vec3 || process._linkedBinding('node_vec3');
  } catch (err) {}
  try {
    node_vec3 = node_vec3 || process.binding('node_vec3');
  } catch (err) {}
  module.exports = node_vec3;

  /**
   * @export
   * @typedef {Float32Array}
   */
  var vec3 = {};

  /**
   * @export
   * @const
   * @type {number}
   */
  vec3.ELEMENTS_PER_OBJECT = 3;

  /**
   * @export
   * @return {vec3}
   * @param {number=} x
   * @param {number=} y
   * @param {number=} z
   */
  vec3.make = function(x, y, z) {
    var out = new Float32Array(vec3.ELEMENTS_PER_OBJECT);
    if (arguments.length > 0) {
      out[0] = x || 0.0;
      out[1] = y || 0.0;
      out[2] = z || 0.0;
    }
    return out;
  }

  /**
   * @export
   * @const
   * @type {vec3}
   */
  vec3.ZERO = vec3.make(0.0, 0.0, 0.0);

  /**
   * @export
   * @const
   * @type {vec3}
   */
  vec3.UNIT = vec3.make(1.0, 1.0, 1.0);

  /**
   * @export
   * @const
   * @type {vec3}
   */
  vec3.UNITX = vec3.make(1.0, 0.0, 0.0);

  /**
   * @export
   * @const
   * @type {vec3}
   */
  vec3.UNITY = vec3.make(0.0, 1.0, 0.0);

  /**
   * @export
   * @const
   * @type {vec3}
   */
  vec3.UNITZ = vec3.make(0.0, 0.0, 1.0);

  /**
   * @export
   * @return {vec3}
   * @param {vec3} v
   */
  vec3.clone = function(v) {
    return new Float32Array(v);
  }

  /**
   * @export
   * @return {string}
   * @param {vec3} obj
   * @param {string=} out
   */
  vec3.stringify = function(obj, out) {
    out = out || "";
    return out += "vec3.make(" + obj[0].toString() + "," + obj[1].toString() + "," + obj[2].toString() + ")";
  }

  /**
   * @export
   * @return {vec3}
   * @param {string} str
   * @param {vec3=} out
   */
  vec3.objectify = function(str, out) {
    out = out || vec3.make();
    var match = str.match(/vec3.make\((.*),(.*),(.*)\)/);
    return vec3.set(out, parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3]));
  }

  /**
   * @export
   * @return {vec3}
   * @param {vec3} v
   */
  vec3.zero = function(v) {
    v[0] = 0.0;
    v[1] = 0.0;
    v[2] = 0.0;
    return v;
  }

  /**
   * @export
   * @return {vec3}
   * @param {vec3} v
   */
  vec3.random = function(v) {
    v[0] = Math.random();
    v[1] = Math.random();
    v[2] = Math.random();
    return v;
  }

  /**
   * @export
   * @return {vec3}
   * @param {vec3} v
   * @param {number=} lo
   * @param {number=} hi
   */
  vec3.random_range = function(v, lo, hi) {
    var range = hi - lo;
    v[0] = range * Math.random() + lo;
    v[1] = range * Math.random() + lo;
    v[2] = range * Math.random() + lo;
    return v;
  }

  /**
   * @export
   * @return {vec3}
   * @param {vec3} v
   */
  vec3.random_axis = function(v) {
    var r = Math.PI * (2.0 * Math.random() - 1.0);
    var z = 2.0 * Math.random() - 1.0;
    var s = Math.sqrt(1.0 - z * z);
    v[0] = s * Math.cos(r);
    v[1] = s * Math.sin(r);
    v[2] = z;
    return v;
  }

  /**
   * @export
   * @return {vec3}
   * @param {vec3} v
   */
  vec3.drop = vec3.zero;

  /**
   * @export
   * @return {Array.<number>}
   * @param {vec3} v
   * @param {Array.<number>} json
   */
  vec3.save = function(v, json) {
    json[0] = v[0];
    json[1] = v[1];
    json[2] = v[2];
    return json;
  }

  /**
   * @export
   * @return {vec3}
   * @param {vec3} v
   * @param {Array.<number>} json
   */
  vec3.load = function(v, json) {
    v[0] = json[0];
    v[1] = json[1];
    v[2] = json[2];
    return v;
  }

  /**
   * @export
   * @return {vec3}
   * @param {vec3} v
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  vec3.set = function(v, x, y, z) {
    v[0] = x;
    v[1] = y;
    v[2] = z;
    return v;
  }

  /**
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} v
   */
  vec3.copy = function(out, v) {
    out.set(v);
    return out;
  }

  /**
   * @export
   * @return {boolean}
   * @param {vec3} a
   * @param {vec3} b
   * @param {number=} epsilon
   */
  vec3.eq = function(a, b, epsilon) {
    if (typeof(epsilon) === 'number') {
      return (Math.abs(b[0] - a[0]) <= epsilon) && (Math.abs(b[1] - a[1]) <= epsilon) && (Math.abs(b[2] - a[2]) <= epsilon);
    } else {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    }
  }

  /**
   * @export
   * @return {boolean}
   * @param {vec3} a
   * @param {vec3} b
   * @param {number=} epsilon
   */
  vec3.neq = function(a, b, epsilon) {
    return !vec3.eq(a, b, epsilon);
  }

  /**
   * @export
   * @return {number}
   * @param {vec3} a
   * @param {vec3} b
   */
  vec3.dot = function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  /**
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} a
   * @param {vec3} b
   */
  vec3.cross = function(out, a, b) {
    var ax = a[0],
      ay = a[1],
      az = a[2],
      bx = b[0],
      by = b[1],
      bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  };

  /**
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} v
   */
  vec3.perpx = function(out, v) {
    var v1 = v[1];
    out[0] = 0;
    out[1] = v[2];
    out[2] = -v1;
    return out;
  }

  /**
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} v
   */
  vec3.perpy = function(out, v) {
    var v2 = v[2];
    out[1] = 0;
    out[2] = v[0];
    out[0] = -v2;
    return out;
  }

  /**
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} v
   */
  vec3.perpz = function(out, v) {
    var v0 = v[0];
    out[2] = 0;
    out[0] = v[1];
    out[1] = -v0;
    return out;
  }

  /**
   * @export
   * @return {number}
   * @param {vec3} v
   */
  vec3.len = function(v) {
    return Math.sqrt(vec3.dot(v, v));
  }

  /**
   * @export
   * @return {number}
   * @param {vec3} v
   */
  vec3.invlen = function(v) {
    return 1.0 / Math.sqrt(vec3.dot(v, v));
  }

  /**
   * @export
   * @return {number}
   * @param {vec3} v
   */
  vec3.sqrlen = function(v) {
    return vec3.dot(v, v);
  }

  /**
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} v
   */
  vec3.norm = function(out, v) {
    return vec3.muls(out, v, vec3.invlen(v));
  }

  /**
   * out = -v
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} v
   */
  vec3.neg = function(out, v) {
    out[0] = -v[0];
    out[1] = -v[1];
    out[2] = -v[2];
    return out;
  }

  /**
   * out = 1.0 / v
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} v
   */
  vec3.inv = function(out, v) {
    out[0] = 1.0 / v[0];
    out[1] = 1.0 / v[1];
    out[2] = 1.0 / v[2];
    return out;
  }

  /**
   * out = min(a, b)
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} a
   * @param {vec3} b
   */
  vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
  }

  /**
   * out = max(a, b)
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} a
   * @param {vec3} b
   */
  vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
  }

  /**
   * out = a + b
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} a
   * @param {vec3} b
   */
  vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }

  /**
   * out = v + s
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} v
   * @param {number} s
   */
  vec3.adds = function(out, v, s) {
    out[0] = v[0] + s;
    out[1] = v[1] + s;
    out[2] = v[2] + s;
    return out;
  }

  /**
   * out = a - b
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} a
   * @param {vec3} b
   */
  vec3.sub = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }

  /**
   * out = v - s
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} v
   * @param {number} s
   */
  vec3.subs = function(out, v, s) {
    out[0] = v[0] - s;
    out[1] = v[1] - s;
    out[2] = v[2] - s;
    return out;
  }

  /**
   * out = a * b
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} a
   * @param {vec3} b
   */
  vec3.mul = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
  }

  /**
   * out = v * s
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} v
   * @param {number} s
   */
  vec3.muls = function(out, v, s) {
    out[0] = v[0] * s;
    out[1] = v[1] * s;
    out[2] = v[2] * s;
    return out;
  }

  /**
   * out = a / b
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} a
   * @param {vec3} b
   */
  vec3.div = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
  }

  /**
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} a
   * @param {vec3} b
   */
  vec3.combine = function(out, a, b) {
    return vec3.add(out, a, b);
  }

  /**
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} a
   * @param {vec3} b
   */
  vec3.extract = function(out, a, b) {
    return vec3.sub(out, a, b);
  }

  /**
   * out = a + (b * s)
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} a
   * @param {vec3} b
   * @param {number} s
   */
  vec3.muls_add = function(out, a, b, s) {
    out[0] = a[0] + (s * b[0]);
    out[1] = a[1] + (s * b[1]);
    out[2] = a[2] + (s * b[2]);
    return out;
  }

  /**
   * out = a + ((b - a) * t)
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} a
   * @param {vec3} b
   * @param {number} t
   */
  vec3.lerp = function(out, a, b, t) {
    out[0] = a[0] + (t * (b[0] - a[0]));
    out[1] = a[1] + (t * (b[1] - a[1]));
    out[2] = a[2] + (t * (b[2] - a[2]));
    return out;
  }

  /**
   * @typedef {Float32Array}
   */
  vec3.array = {};

  /**
   * @export
   * @return {vec3.array}
   * @param {number} count
   * @param {function(vec3,number,vec3.array):void=} init
   */
  vec3.array.make = function(count, init) {
    var out = new Float32Array(count * vec3.ELEMENTS_PER_OBJECT);
    if (typeof(init) === 'function') {
      vec3.array.forEach(out, init);
    }
    return out;
  }

  /**
   * @export
   * @return {vec3.array}
   * @param {vec3.array} array
   */
  vec3.array.clone = function(array) {
    return new Float32Array(array);
  }

  /**
   * @export
   * @return {vec3.array}
   * @param {vec3.array} array
   * @param {number} count
   * @param {function(vec3,number,vec3.array):void=} init
   */
  vec3.array.remake = function(array, count, init) {
    var start = vec3.array.count(array);
    if (start < count) {
      // more
      var out = new Float32Array(count * vec3.ELEMENTS_PER_OBJECT);
      out.set(array);
      if (typeof(init) === 'function') {
        vec3.array.forEach(out, init, start, count);
      }
      return out;
    } else if (start > count) {
      // less
      var out = new Float32Array(count * vec3.ELEMENTS_PER_OBJECT);
      out.set(array.subarray(0, count));
      return out;
    } else {
      // same
      return new Float32Array(array);
    }
  }

  /**
   * @export
   * @return {number}
   * @param {vec3.array} array
   */
  vec3.array.count = function(array) {
    return array.length / vec3.ELEMENTS_PER_OBJECT;
  }

  /**
   * @export
   * @return {vec3}
   * @param {vec3.array} array
   * @param {number} index
   */
  vec3.array.valueAt = function(array, index) {
    //var offset = index * vec3.ELEMENTS_PER_OBJECT * array.BYTES_PER_ELEMENT; // in bytes
    //var length = vec3.ELEMENTS_PER_OBJECT; // in elements
    //return new Float32Array(array.buffer, offset, length);

    var begin = index * vec3.ELEMENTS_PER_OBJECT; // in elements
    var end = begin + vec3.ELEMENTS_PER_OBJECT; // in elements
    return array.subarray(begin, end);
  }

  /**
   * @export
   * @return {number}
   * @param {vec3.array} array
   * @param {vec3} value
   */
  vec3.array.indexOf = function(array, value) {
    if (array.buffer !== value.buffer) {
      return -1;
    }

    var index = (value.byteOffset - array.byteOffset) / (array.BYTES_PER_ELEMENT * vec3.ELEMENTS_PER_OBJECT);

    if (index >= vec3.array.count(array)) {
      return -1;
    }

    return index;
  }

  /**
   * @export
   * @return {void}
   * @param {vec3.array} array
   * @param {function(vec3,number,vec3.array):void} callback
   * @param {number=} start
   * @param {number=} count
   */
  vec3.array.forEach = function(array, callback, start, count) {
    start = start || 0;
    count = count || vec3.array.count(array);
    for (var index = start; index < count; ++index) {
      callback(vec3.array.valueAt(array, index), index, array);
    }
  }

  /**
   * @export
   * @return {boolean}
   * @param {vec3.array} a
   * @param {vec3.array} b
   * @param {number=} epsilon
   */
  vec3.array.eq = function(a, b, epsilon) {
    if (a.length !== b.length) {
      return false;
    }
    if (typeof(epsilon) === 'number') {
      for (var i = 0, n = a.length; i < n; ++i) {
        if (Math.abs(b[i] - a[i]) > epsilon) {
          return false;
        }
      }
    } else {
      for (var i = 0, n = a.length; i < n; ++i) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * @export
   * @return {boolean}
   * @param {vec3.array} a
   * @param {vec3.array} b
   * @param {number=} epsilon
   */
  vec3.array.neq = function(a, b, epsilon) {
    return !vec3.array.eq(a, b, epsilon);
  }

  /**
   * out = a + (b * s)
   * @export
   * @return {vec3.array}
   * @param {vec3.array} out
   * @param {vec3.array} a
   * @param {vec3.array} b
   * @param {number} s
   */
  vec3.array.muls_add = function(out, a, b, s) {
    //	if (node_vec3)
    //	{
    //		return node_vec3.array.muls_add(out, a, b, s);
    //	}

    for (var i = 0, n = out.length; i < n; ++i) {
      out[i] = a[i] + (s * b[i]);
    }
    return out;

    //	vec3.array.forEach(out, function (value, index, array)
    //	{
    //		// value : vec3.array.valueAt(array, index)
    //		// array : out
    //		vec3.muls_add(value, vec3.array.valueAt(a, index), vec3.array.valueAt(b, index), s);
    //	});
    //	return out;
  }

  /**
   * out = a + ((b - a) * t)
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {vec3} a
   * @param {vec3} b
   * @param {number} t
   */
  vec3.array.lerp = function(out, a, b, t) {
    for (var i = 0, n = out.length; i < n; ++i) {
      out[i] = a[i] + (t * (b[i] - a[i]));
    }
    return out;
  }

  return vec3;
});

/// bvec3.js

/**
 * @typedef {Int8Array}
 */
var bvec3 = {};

/**
 * @const
 * @type {number}
 */
bvec3.ELEMENTS_PER_OBJECT = 3;

/**
 * @export
 * @return {bvec3}
 * @param {boolean=} x
 * @param {boolean=} y
 * @param {boolean=} z
 */
bvec3.make = function(x, y, z) {
  var out = new Int8Array(bvec3.ELEMENTS_PER_OBJECT);
  out[0] = x || false;
  out[1] = y || false;
  out[2] = z || false;
  return out;
}

/// ivec3.js

/**
 * @typedef {Int32Array}
 */
var ivec3 = {};

/**
 * @const
 * @type {number}
 */
ivec3.ELEMENTS_PER_OBJECT = 3;

/**
 * @export
 * @return {ivec3}
 * @param {number=} x
 * @param {number=} y
 * @param {number=} z
 */
ivec3.make = function(x, y, z) {
  var out = new Int32Array(ivec3.ELEMENTS_PER_OBJECT);
  out[0] = x || 0;
  out[1] = y || 0;
  out[2] = z || 0;
  return out;
}
