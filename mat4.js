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
})("mat4", function definition() {

  /**
   * Copyright (c) Flyover Games, LLC
   */

  /**
   * @export
   * @typedef {Float32Array}
   */
  var mat4 = {};

  /**
   * @const
   * @type {number}
   */
  mat4.ELEMENTS_PER_OBJECT = 16;

  /**
   * @export
   * @return {mat4}
   * @param {number=} init
   */
  mat4.make = function(init) {
    var m = new Float32Array(mat4.ELEMENTS_PER_OBJECT);
    if (typeof(init) === 'number') {
      m[0] = m[5] = m[10] = m[15] = init;
    }
    return m;
  }

  /**
   * @const
   * @type {mat4}
   */
  mat4.IDENTITY = mat4.make(1.0);

  /**
   * @export
   * @return {mat4}
   * @param {number} x
   * @param {number} y
   */
  mat4.make_pos_xy = function(x, y) {
    return mat4.from_pos_xyz(mat4.make(), x, y, 0.0);
  }

  /**
   * @export
   * @return {mat4}
   * @param {vec2} v
   */
  mat4.make_pos_vec2 = function(v) {
    return mat4.from_pos_xyz(mat4.make(), v[0], v[1], 0.0);
  }

  /**
   * @export
   * @return {mat4}
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  mat4.make_pos_xyz = function(x, y, z) {
    return mat4.from_pos_xyz(mat4.make(), x, y, z);
  }

  /**
   * @export
   * @return {mat4}
   * @param {vec3} v
   */
  mat4.make_pos_vec3 = function(v) {
    return mat4.from_pos_xyz(mat4.make(), v[0], v[1], v[2]);
  }

  /**
   * @export
   * @return {mat4}
   * @param {number} c
   * @param {number} s
   */
  mat4.make_rot_cs = function(c, s) {
    return mat4.from_rot_cs(mat4.make(), c, s);
  }

  /**
   * @export
   * @return {mat4}
   * @param {number} angle
   */
  mat4.make_rot_angle = function(angle) {
    return mat4.from_rot_cs(mat4.make(), Math.cos(angle), Math.sin(angle));
  }

  /**
   * @export
   * @return {mat4}
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} c
   * @param {number} s
   */
  mat4.make_rot_xyzcs = function(x, y, z, c, s) {
    return mat4.from_rot_xyzcs(mat4.make(), x, y, z, c, s);
  }

  /**
   * @export
   * @return {mat4}
   * @param {number} angle
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  mat4.make_rot_angle_xyz = function(angle, x, y, z) {
    return mat4.from_rot_xyzcs(mat4.make(), x, y, z, Math.cos(angle), Math.sin(angle));
  }

  /**
   * @export
   * @return {mat4}
   * @param {vec3} axis
   * @param {number} angle
   */
  mat4.make_rot_axis_angle = function(axis, angle) {
    return mat4.deom_rot_xyzcs(angle, axis[0], axis[1], axis[2], Math.cos(angle), Math.sin(angle));
  }

  /**
   * @return {mat4}
   * @param {quat} q
   */
  mat4.make_rot_quat = function(q) {
    return mat4.from_rot_quat(mat4.make(), q);
  }

  /**
   * @export
   * @return {mat4}
   * @param {number} x
   * @param {number} y
   */
  mat4.make_sca_xy = function(x, y) {
    return mat4.from_sca_xyz(mat4.make(), x, y, 1.0);
  }

  /**
   * @export
   * @return {mat4}
   * @param {vec2} v
   */
  mat4.make_sca_vec2 = function(v) {
    return mat4.from_sca_xyz(mat4.make(), v[0], v[1], 1.0);
  }

  /**
   * @export
   * @return {mat4}
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  mat4.make_sca_xyz = function(x, y, z) {
    return mat4.from_sca_xyz(mat4.make(), x, y, z);
  }

  /**
   * @export
   * @return {mat4}
   * @param {vec3} v
   */
  mat4.make_sca_vec3 = function(v) {
    return mat4.from_sca_xyz(mat4.make(), v[0], v[1], v[2]);
  }

  /**
   * @export
   * @param {number} l
   * @param {number} r
   * @param {number} b
   * @param {number} t
   * @param {number} n
   * @param {number} f
   */
  mat4.make_ortho = function(l, r, b, t, n, f) {
    return mat4.from_ortho(mat4.make(), l, r, b, t, n, f);
  }

  /**
   * @export
   * @param {number} l
   * @param {number} r
   * @param {number} b
   * @param {number} t
   * @param {number} n
   * @param {number} f
   */
  mat4.make_frustum = function(m, l, r, b, t, n, f) {
    return mat4.from_frustum(mat4.make(), l, r, b, t, n, f);
  }

  /**
   * @return {mat4}
   * @param {number} fovy
   * @param {number} aspect
   * @param {number} near
   * @param {number} far
   */
  mat4.make_perspective = function(fovy, aspect, near, far) {
    return mat4.from_perspective(mat4.make(), fovy, aspect, near, far);
  }

  /**
   * @export
   * @return {string}
   * @param {mat4} obj
   * @param {string=} str
   */
  mat4.stringify = function(obj, str) {
    str = str || "";
    str += "mat4.make(";
    str += "\n\t| " + obj[0].toString() + " " + obj[4].toString() + " " + obj[8].toString() + " " + obj[12].toString() + " |";
    str += "\n\t| " + obj[1].toString() + " " + obj[5].toString() + " " + obj[9].toString() + " " + obj[13].toString() + " |";
    str += "\n\t| " + obj[2].toString() + " " + obj[6].toString() + " " + obj[10].toString() + " " + obj[14].toString() + " |";
    str += "\n\t| " + obj[3].toString() + " " + obj[7].toString() + " " + obj[11].toString() + " " + obj[15].toString() + " |";
    str += "\n)";
    return str;
  }

  /**
   * @export
   * @return {mat4}
   * @param {string} str
   * @param {mat4=} obj
   */
  mat4.objectify = function(str, obj) {
    obj = obj || mat4.make();
    var match = str.match(/mat4.make\(\n\t\| (.*) (.*) (.*) (.*) \|\n\t\| (.*) (.*) (.*) (.*) \|\n\t\| (.*) (.*) (.*) (.*) \|\n\t\| (.*) (.*) (.*) (.*) \|\n\)/);
    obj[0] = parseFloat(match[1]);
    obj[4] = parseFloat(match[2]);
    obj[8] = parseFloat(match[3]);
    obj[12] = parseFloat(match[4]);
    obj[1] = parseFloat(match[5]);
    obj[5] = parseFloat(match[6]);
    obj[9] = parseFloat(match[7]);
    obj[13] = parseFloat(match[8]);
    obj[2] = parseFloat(match[9]);
    obj[6] = parseFloat(match[10]);
    obj[10] = parseFloat(match[11]);
    obj[14] = parseFloat(match[12]);
    obj[3] = parseFloat(match[13]);
    obj[7] = parseFloat(match[14]);
    obj[11] = parseFloat(match[15]);
    obj[15] = parseFloat(match[16]);
    return obj;
  }

  /**
   * @export
   * @return {mat4}
   * @param {mat4} m
   */
  mat4.clone = function(m) {
    return new Float32Array(m);
  }

  /**
   * @export
   * @return {mat4}
   * @param {mat4} m
   */
  mat4.random = function(m) {
    return mat4.random_space(m); // default to random 3D space
  }

  /**
   * @export
   * @return {mat4}
   * @param {mat4} m
   */
  mat4.random_rot = function(m) {
    var r = Math.PI * (2.0 * Math.random() - 1.0);
    var z = 2.0 * Math.random() - 1.0;
    var l = Math.sqrt(1.0 - z * z);
    var x = l * Math.cos(r);
    var y = l * Math.sin(r);
    var a = Math.PI * (2.0 * Math.random() - 1.0);
    var c = Math.cos(a);
    var s = Math.sin(a);
    m[0] = x * x * t + c;
    m[1] = y * x * t + z * s;
    m[2] = z * x * t - y * s;
    m[3] = 0.0;
    m[4] = x * y * t - z * s;
    m[5] = y * y * t + c;
    m[6] = z * y * t + x * s;
    m[7] = 0.0;
    m[8] = x * z * t + y * s;
    m[9] = y * z * t - x * s;
    m[10] = z * z * t + c;
    m[11] = 0.0;
    m[12] = 0.0;
    m[13] = 0.0;
    m[14] = 0.0;
    m[15] = 1.0;
    return m;
  }

  /**
   * @export
   * @return {mat4}
   * @param {mat4} m
   * @param {number=} pos_lo
   * @param {number=} pos_hi
   * @param {number=} sca_lo
   * @param {number=} sca_hi
   */
  mat4.random_space = function(m, pos_lo, pos_hi, sca_lo, sca_hi) {
    var r = Math.PI * (2.0 * Math.random() - 1.0);
    var z = 2.0 * Math.random() - 1.0;
    var l = Math.sqrt(1.0 - z * z);
    var x = l * Math.cos(r);
    var y = l * Math.sin(r);
    var a = Math.PI * (2.0 * Math.random() - 1.0);
    var c = Math.cos(a);
    var s = Math.sin(a);
    var t = 1.0 - c;
    m[0] = x * x * t + c;
    m[1] = y * x * t + z * s;
    m[2] = z * x * t - y * s;
    m[3] = 0.0;
    m[4] = x * y * t - z * s;
    m[5] = y * y * t + c;
    m[6] = z * y * t + x * s;
    m[7] = 0.0;
    m[8] = x * z * t + y * s;
    m[9] = y * z * t - x * s;
    m[10] = z * z * t + c;
    m[11] = 0.0;
    m[12] = 0.0;
    m[13] = 0.0;
    m[14] = 0.0;
    m[15] = 1.0;
    if (pos_lo && pos_hi) {
      var pos_range = (pos_hi - pos_lo);
      m[12] = pos_range * Math.random() + pos_lo;
      m[13] = pos_range * Math.random() + pos_lo;
      m[14] = pos_range * Math.random() + pos_lo;
    }
    if (sca_lo && sca_hi) {
      var sca_range = (sca_hi - sca_lo);
      m[0] *= sca_range * Math.random() + sca_lo;
      m[5] *= sca_range * Math.random() + sca_lo;
      m[10] *= sca_range * Math.random() + sca_lo;
    }
    return m;
  }

  /**
   * @export
   * @return {mat4}
   * @param {mat4} out
   * @param {mat4} m
   */
  mat4.copy = function(out, m) {
    out.set(m);
    return out;
  }

  /**
   * @export
   * @return {mat4}
   * @param {mat4} m
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  mat4.from_pos_xyz = function(m, x, y, z) {
    mat4.identity(m);
    m[12] = x;
    m[13] = y;
    m[14] = z;
    return m;
  }

  /**
   * @return {mat4}
   * @param {mat4} m
   * @param {vec3} p
   */
  mat4.from_pos_vec3 = function(m, p) {
    return mat4.from_pos_xyz(m, p[0], p[1], p[2]);
  }

  /**
   * @export
   * @return {mat4}
   * @param {number} c
   * @param {number} s
   */
  mat4.from_rot_cs = function(m, c, s) {
    mat4.identity(m);
    var t = 1.0 - c;
    m[0] = c;
    m[1] = s;
    m[4] = -s;
    m[5] = c;
    m[10] = m[15] = 1.0;
    return m;
  }

  /**
   * @export
   * @return {mat4}
   * @param {mat4} m
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} c
   * @param {number} s
   */
  mat4.from_rot_xyzcs = function(m, x, y, z, c, s) {
    var t = 1.0 - c;
    m[0] = x * x * t + c;
    m[1] = y * x * t + z * s;
    m[2] = z * x * t - y * s;
    m[4] = x * y * t - z * s;
    m[5] = y * y * t + c;
    m[6] = z * y * t + x * s;
    m[8] = x * z * t + y * s;
    m[9] = y * z * t - x * s;
    m[10] = z * z * t + c;
    m[15] = 1.0;
    return m;
  }

  /**
   * @return {mat4}
   * @param {mat4} m
   * @param {quat} q
   */
  mat4.from_rot_quat = function(m, q) {
    var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
    var x2 = x + x,
      y2 = y + y,
      z2 = z + z;
    var xx = x * x2,
      xy = x * y2,
      xz = x * z2;
    var yy = y * y2,
      yz = y * z2,
      zz = z * z2;
    var wx = w * x2,
      wy = w * y2,
      wz = w * z2;
    m[0] = 1.0 - (yy + zz);
    m[1] = xy + wz;
    m[2] = xz - wy;
    m[4] = xy - wz;
    m[5] = 1.0 - (xx + zz);
    m[6] = yz + wx;
    m[8] = xz + wy;
    m[9] = yz - wx;
    m[10] = 1.0 - (xx + yy);
    m[15] = 1.0;
    return m;
  }

  /**
   * @return {mat4}
   * @param {mat4} m
   * @param {vec3} r
   */
  mat4.from_rot_mat3 = function(m, r) {
    mat4.identity(m);
    m[0] = r[0];
    m[1] = r[1];
    m[2] = r[2];
    m[4] = r[3];
    m[5] = r[4];
    m[6] = r[5];
    m[8] = r[6];
    m[9] = r[7];
    m[10] = r[8];
    return m;
  }

  /**
   * @return {mat4}
   * @param {mat4} m
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  mat4.from_sca_xyz = function(m, x, y, z) {
    mat4.identity(m);
    m[0] = x;
    m[5] = y;
    m[10] = z;
    return m;
  }

  /**
   * @return {mat4}
   * @param {mat4} m
   * @param {vec3} s
   */
  mat4.from_sca_vec3 = function(m, s) {
    return mat4.from_sca_xyz(s[0], s[1], s[2]);
  }

  /**
   * @export
   * @param {mat4} m
   * @param {number} l
   * @param {number} r
   * @param {number} b
   * @param {number} t
   * @param {number} n
   * @param {number} f
   */
  mat4.from_ortho = function(m, l, r, b, t, n, f) {
    var lr = 1.0 / (l - r),
      bt = 1.0 / (b - t),
      nf = 1.0 / (n - f);
    m[0] = -2.0 * lr;
    m[1] = 0.0;
    m[2] = 0.0;
    m[3] = 0.0;
    m[4] = 0.0;
    m[5] = -2.0 * bt;
    m[6] = 0.0;
    m[7] = 0.0;
    m[8] = 0.0;
    m[9] = 0.0;
    m[10] = 2.0 * nf;
    m[11] = 0.0;
    m[12] = (l + r) * lr;
    m[13] = (t + b) * bt;
    m[14] = (f + n) * nf;
    m[15] = 1.0;
    return m;
  }

  /**
   * @export
   * @param {mat4} m
   * @param {number} l
   * @param {number} r
   * @param {number} b
   * @param {number} t
   * @param {number} n
   * @param {number} f
   */
  mat4.from_frustum = function(m, l, r, b, t, n, f) {
    var rl = 1.0 / (r - l),
      tb = 1.0 / (t - b),
      nf = 1.0 / (n - f);
    m[0] = (2.0 * n) * rl;
    m[1] = 0.0;
    m[2] = 0.0;
    m[3] = 0.0;
    m[4] = 0.0;
    m[5] = (2.0 * n) * tb;
    m[6] = 0.0;
    m[7] = 0.0;
    m[8] = (r + l) * rl;
    m[9] = (t + b) * tb;
    m[10] = (f + n) * nf;
    m[11] = -1.0;
    m[12] = 0.0;
    m[13] = 0.0;
    m[14] = (2.0 * f * n) * nf;
    m[15] = 0.0;
    return m;
  }

  /**
   * @return {mat4}
   * @param {mat4} m
   * @param {number} fovy
   * @param {number} aspect
   * @param {number} near
   * @param {number} far
   */
  mat4.from_perspective = function(m, fovy, aspect, near, far) {
    //var t = near * Math.tan(0.5 * fovy * Math.PI / 180.0);
    //var b = -t;
    //var r = t * aspect;
    //var l = b * aspect;
    //return mat4.from_frustum(m, l, r, b, t, near, far);
    var f = 1.0 / Math.tan(0.5 * fovy * Math.PI / 180.0);
    var nf = 1.0 / (near - far);
    m[0] = f / aspect;
    m[1] = 0.0;
    m[2] = 0.0;
    m[3] = 0.0;
    m[4] = 0.0;
    m[5] = f;
    m[6] = 0.0;
    m[7] = 0.0;
    m[8] = 0.0;
    m[9] = 0.0;
    m[10] = (far + near) * nf;
    m[11] = -1.0;
    m[12] = 0.0;
    m[13] = 0.0;
    m[14] = (2.0 * far * near) * nf;
    m[15] = 0.0;
    return m;
  }

  /**
   * @export
   * @return {mat4}
   * @param {mat4} m
   * @param {vec3} p
   * @param {mat3} r
   * @param {vec3} s
   */
  mat4.import_space = function(m, p, r, s) {
    m[0] = r[0] * s[0];
    m[1] = r[1] * s[0];
    m[2] = r[2] * s[0];
    m[3] = 0.0; // col 0
    m[4] = r[3] * s[1];
    m[5] = r[4] * s[1];
    m[6] = r[5] * s[1];
    m[7] = 0.0; // col 1
    m[8] = r[6] * s[2];
    m[9] = r[7] * s[2];
    m[10] = r[8] * s[2];
    m[11] = 0.0; // col 2
    m[12] = p[0];
    m[13] = p[1];
    m[14] = p[2];
    m[15] = 1.0; // col 3
    return m;
  }

  /**
   * @export
   * @return {mat4}
   * @param {mat4} m
   * @param {vec3} p
   * @param {mat3} r
   * @param {vec3} s
   */
  mat4.export_space = function(m, p, r, s) {
    var a = m[0],
      b = m[1],
      c = m[2]; //, p = m[ 3]; // col 0
    var d = m[4],
      e = m[5],
      f = m[6]; //, q = m[ 7]; // col 1
    var g = m[8],
      h = m[9],
      i = m[10]; //, r = m[11]; // col 2
    var x = m[12],
      y = m[13],
      z = m[14]; //, w = m[15]; // col 3

    var sx = Math.sqrt(a * a + b * b + c * c);
    var sy = Math.sqrt(d * d + e * e + f * f);
    var sz = Math.sqrt(g * g + h * h + i * i);

    // if determinite is negative, invert one scale
    if (mat4.det(m) < 0.0) {
      sx = -sx;
    }

    p[0] = x;
    p[1] = y;
    p[2] = z;

    r[0] = a / sx;
    r[1] = b / sx;
    r[2] = c / sx; // col 0
    r[3] = d / sy;
    r[4] = e / sy;
    r[5] = f / sy; // col 1
    r[6] = g / sz;
    r[7] = h / sz;
    r[8] = i / sz; // col 2

    s[0] = sx;
    s[1] = sy;
    s[2] = sz;

    return m;
  }

  /**
   * @export
   * @return {boolean}
   * @param {mat4} a
   * @param {mat4} b
   * @param {number=} epsilon
   */
  mat4.eq = function(a, b, epsilon) {
    if (typeof(epsilon) === 'number') {
      return (Math.abs(b[0] - a[0]) <= epsilon) && (Math.abs(b[1] - a[1]) <= epsilon) && (Math.abs(b[2] - a[2]) <= epsilon) && (Math.abs(b[3] - a[3]) <= epsilon) && (Math.abs(b[4] - a[4]) <= epsilon) && (Math.abs(b[5] - a[5]) <= epsilon) && (Math.abs(b[6] - a[6]) <= epsilon) && (Math.abs(b[7] - a[7]) <= epsilon) && (Math.abs(b[8] - a[8]) <= epsilon) && (Math.abs(b[9] - a[9]) <= epsilon) && (Math.abs(b[10] - a[10]) <= epsilon) && (Math.abs(b[11] - a[11]) <= epsilon) && (Math.abs(b[12] - a[12]) <= epsilon) && (Math.abs(b[13] - a[13]) <= epsilon) && (Math.abs(b[14] - a[14]) <= epsilon) && (Math.abs(b[15] - a[15]) <= epsilon);
    } else {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
    }
  }

  /**
   * @export
   * @return {boolean}
   * @param {mat4} a
   * @param {mat4} b
   * @param {number=} epsilon
   */
  mat4.neq = function(a, b, epsilon) {
    return !mat4.eq(a, b, epsilon);
  }

  /**
   * @export
   * @return {number}
   * @param {mat4} m
   */
  mat4.det = function(m) {
    var a00 = m[0],
      a01 = m[1],
      a02 = m[2],
      a03 = m[3],
      a10 = m[4],
      a11 = m[5],
      a12 = m[6],
      a13 = m[7],
      a20 = m[8],
      a21 = m[9],
      a22 = m[10],
      a23 = m[11],
      a30 = m[12],
      a31 = m[13],
      a32 = m[14],
      a33 = m[15],

      b00 = a00 * a11 - a01 * a10,
      b01 = a00 * a12 - a02 * a10,
      b02 = a00 * a13 - a03 * a10,
      b03 = a01 * a12 - a02 * a11,
      b04 = a01 * a13 - a03 * a11,
      b05 = a02 * a13 - a03 * a12,
      b06 = a20 * a31 - a21 * a30,
      b07 = a20 * a32 - a22 * a30,
      b08 = a20 * a33 - a23 * a30,
      b09 = a21 * a32 - a22 * a31,
      b10 = a21 * a33 - a23 * a31,
      b11 = a22 * a33 - a23 * a32;

    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  }

  /**
   * @export
   * @return {mat4}
   * @param {mat4} out
   * @param {mat4} m
   */
  mat4.inv = function(out, m) {
    var a00 = m[0],
      a01 = m[1],
      a02 = m[2],
      a03 = m[3],
      a10 = m[4],
      a11 = m[5],
      a12 = m[6],
      a13 = m[7],
      a20 = m[8],
      a21 = m[9],
      a22 = m[10],
      a23 = m[11],
      a30 = m[12],
      a31 = m[13],
      a32 = m[14],
      a33 = m[15],

      b00 = a00 * a11 - a01 * a10,
      b01 = a00 * a12 - a02 * a10,
      b02 = a00 * a13 - a03 * a10,
      b03 = a01 * a12 - a02 * a11,
      b04 = a01 * a13 - a03 * a11,
      b05 = a02 * a13 - a03 * a12,
      b06 = a20 * a31 - a21 * a30,
      b07 = a20 * a32 - a22 * a30,
      b08 = a20 * a33 - a23 * a30,
      b09 = a21 * a32 - a22 * a31,
      b10 = a21 * a33 - a23 * a31,
      b11 = a22 * a33 - a23 * a32,

      det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return mat4.copy(out, mat4.IDENTITY);
    }
    det = 1.0 / det;

    out[0] = det * (a11 * b11 - a12 * b10 + a13 * b09);
    out[1] = det * (a02 * b10 - a01 * b11 - a03 * b09);
    out[2] = det * (a31 * b05 - a32 * b04 + a33 * b03);
    out[3] = det * (a22 * b04 - a21 * b05 - a23 * b03);
    out[4] = det * (a12 * b08 - a10 * b11 - a13 * b07);
    out[5] = det * (a00 * b11 - a02 * b08 + a03 * b07);
    out[6] = det * (a32 * b02 - a30 * b05 - a33 * b01);
    out[7] = det * (a20 * b05 - a22 * b02 + a23 * b01);
    out[8] = det * (a10 * b10 - a11 * b08 + a13 * b06);
    out[9] = det * (a01 * b08 - a00 * b10 - a03 * b06);
    out[10] = det * (a30 * b04 - a31 * b02 + a33 * b00);
    out[11] = det * (a21 * b02 - a20 * b04 - a23 * b00);
    out[12] = det * (a11 * b07 - a10 * b09 - a12 * b06);
    out[13] = det * (a00 * b09 - a01 * b07 + a02 * b06);
    out[14] = det * (a31 * b01 - a30 * b03 - a32 * b00);
    out[15] = det * (a20 * b03 - a21 * b01 + a22 * b00);

    return out;
  }

  /**
   * @export
   * @return {mat4}
   * @param {mat4} out
   * @param {mat4} a
   * @param {mat4} b
   */
  mat4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
  }

  /**
   * @export
   * @return {mat4}
   * @param {mat4} out
   * @param {mat4} a
   * @param {mat4} b
   */
  mat4.sub = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
  }

  /**
   * @export
   * @return {mat4}
   * @param {mat4} out
   * @param {mat4} a
   * @param {mat4} b
   */
  mat4.mul = function(out, a, b) {
    var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3],
      a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7],
      a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11],
      a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

    var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    return out;
  }

  /**
   * @export
   * @return {mat4}
   * @param {mat4} out
   * @param {mat4} a
   * @param {mat4} b
   */
  mat4.combine = function(out, a, b) {
    return mat4.mul(out, a, b);
  }

  /**
   * @export
   * @return {mat4}
   * @param {mat4} out
   * @param {mat4} a
   * @param {mat4} b
   */
  mat4.extract = function(out, a, b) {
    if (out === a) {
      throw new Error();
    }
    return mat4.mul(out, mat4.inv(out, b), a);
  }

  /**
   * @export
   * @return {vec2}
   * @param {vec2} out
   * @param {mat4} m
   * @param {vec2} v
   */
  mat4.mul_vec2 = function(out, m, v) {
    var v0 = v[0],
      v1 = v[1];
    out[0] = m[0] * v0 + m[4] * v1 + m[12];
    out[1] = m[1] * v0 + m[5] * v1 + m[13];
    return out;
  }

  /**
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {mat4} m
   * @param {vec3} v
   */
  mat4.mul_vec3 = function(out, m, v) {
    var v0 = v[0],
      v1 = v[1],
      v2 = v[2];
    out[0] = m[0] * v0 + m[4] * v1 + m[8] * v2 + m[12];
    out[1] = m[1] * v0 + m[5] * v1 + m[9] * v2 + m[13];
    out[2] = m[2] * v0 + m[6] * v1 + m[10] * v2 + m[14];
    return out;
  }

  /**
   * @export
   * @return {vec4}
   * @param {vec4} out
   * @param {mat4} m
   * @param {vec4} v
   */
  mat4.mul_vec4 = function(out, m, v) {
    var v0 = v[0],
      v1 = v[1],
      v2 = v[2],
      v3 = v[3];
    out[0] = m[0] * v0 + m[4] * v1 + m[8] * v2 + m[12] * v3;
    out[1] = m[1] * v0 + m[5] * v1 + m[9] * v2 + m[13] * v3;
    out[2] = m[2] * v0 + m[6] * v1 + m[10] * v2 + m[14] * v3;
    out[3] = m[3] * v0 + m[7] * v1 + m[11] * v2 + m[15] * v3;
    return out;
  }

  /**
   * @export
   * @return {vec2}
   * @param {vec2} out
   * @param {mat4} m
   * @param {vec2} v
   */
  mat4.transform_vec2 = function(out, m, v) {
    var v0 = v[0],
      v1 = v[1];
    var s = 1.0 / (m[3] * v0 + m[7] * v1 + m[15]);
    out[0] = s * (m[0] * v0 + m[4] * v1 + m[12]);
    out[1] = s * (m[1] * v0 + m[5] * v1 + m[13]);
    return out;
  }

  /**
   * @export
   * @return {vec3}
   * @param {vec3} out
   * @param {mat4} m
   * @param {vec3} v
   */
  mat4.transform_vec3 = function(out, m, v) {
    var v0 = v[0],
      v1 = v[1],
      v2 = v[2];
    var s = 1.0 / (m[3] * v0 + m[7] * v1 + m[11] * v2 + m[15]);
    out[0] = s * (m[0] * v0 + m[4] * v1 + m[8] * v2 + m[12]);
    out[1] = s * (m[1] * v0 + m[5] * v1 + m[9] * v2 + m[13]);
    out[2] = s * (m[2] * v0 + m[6] * v1 + m[10] * v2 + m[14]);
    return out;
  }

  /**
   * @export
   * @return {vec4}
   * @param {vec4} out
   * @param {mat4} m
   * @param {vec4} v
   */
  mat4.transform_vec4 = function(out, m, v) {
    var v0 = v[0],
      v1 = v[1],
      v2 = v[2],
      v3 = v[3];
    var s = v3 / (m[3] * v0 + m[7] * v1 + m[11] * v2 + m[15] * v3);
    out[0] = s * (m[0] * v0 + m[4] * v1 + m[8] * v2 + m[12] * v3);
    out[1] = s * (m[1] * v0 + m[5] * v1 + m[9] * v2 + m[13] * v3);
    out[2] = s * (m[2] * v0 + m[6] * v1 + m[10] * v2 + m[14] * v3);
    out[3] = 1.0;
    return out;
  }

  /**
   * @export
   * @return {vec4.array}
   * @param {vec4.array} out
   * @param {mat4} m
   * @param {vec4.array} v
   * @param {number=} start
   * @param {number=} count
   */
  mat4.transform_vec4_array = function(out, m, v, start, count) {
    start = start || 0;
    count = count || vec4.array.count(v);
    var m00 = m[0],
      m01 = m[1],
      m02 = m[2],
      m03 = m[3];
    var m10 = m[4],
      m11 = m[5],
      m12 = m[6],
      m13 = m[7];
    var m20 = m[8],
      m21 = m[9],
      m22 = m[10],
      m23 = m[11];
    var m30 = m[12],
      m31 = m[13],
      m32 = m[14],
      m33 = m[15];
    for (var index = start; index < count; ++index) {
      var offset = index * vec4.ELEMENTS_PER_OBJECT;
      var v0 = v[offset + 0],
        v1 = v[offset + 1],
        v2 = v[offset + 2],
        v3 = v[offset + 3];
      var s = v3 / (m03 * v0 + m13 * v1 + m23 * v2 + m33 * v3);
      out[offset + 0] = s * (m00 * v0 + m10 * v1 + m20 * v2 + m30 * v3);
      out[offset + 1] = s * (m01 * v0 + m11 * v1 + m21 * v2 + m31 * v3);
      out[offset + 2] = s * (m02 * v0 + m12 * v1 + m22 * v2 + m32 * v3);
      out[offset + 3] = 1.0;
    }
    return out;
  }

  /**
   * @typedef {Float32Array}
   */
  mat4.array = {};

  /**
   * @export
   * @return {mat4.array}
   * @param {number} count
   * @param {number|function(mat4,number,mat4.array):void=} init
   */
  mat4.array.make = function(count, init) {
    var array = new Float32Array(count * mat4.ELEMENTS_PER_OBJECT);
    if (typeof(init) === 'number') {
      mat4.array.forEach(array, function(value) {
        value[0] = value[5] = value[10] = value[15] = init;
      });
    } else if (typeof(init) === 'function') {
      mat4.array.forEach(array, init);
    }
    return array;
  }

  /**
   * @export
   * @return {mat4.array}
   * @param {mat4.array} array
   */
  mat4.array.clone = function(array) {
    return new Float32Array(array);
  }

  /**
   * @export
   * @return {mat4.array}
   * @param {mat4.array} array
   * @param {number} count
   * @param {number|function(mat4,number,mat4.array):void=} init
   */
  mat4.array.remake = function(array, count, init) {
    var start = mat4.array.count(array);
    if (start < count) {
      // more
      var out = new Float32Array(count * mat4.ELEMENTS_PER_OBJECT);
      out.set(array);
      if (typeof(init) === 'function') {
        mat4.array.forEach(out, init, start, count);
      }
      return out;
    } else if (start > count) {
      // less
      var out = new Float32Array(count * mat4.ELEMENTS_PER_OBJECT);
      out.set(array.subarray(0, count * mat4.ELEMENTS_PER_OBJECT));
      return out;
    } else {
      // same
      return new Float32Array(array);
    }
  }

  /**
   * @export
   * @return {number}
   * @param {mat4.array} array
   */
  mat4.array.count = function(array) {
    return array.length / mat4.ELEMENTS_PER_OBJECT;
  }

  /**
   * @export
   * @return {mat4}
   * @param {mat4.array} array
   * @param {number} index
   */
  mat4.array.valueAt = function(array, index) {
    //var offset = index * mat4.ELEMENTS_PER_OBJECT * array.BYTES_PER_ELEMENT; // in bytes
    //var length = mat4.ELEMENTS_PER_OBJECT; // in elements
    //return new Float32Array(array.buffer, offset, length);

    var begin = index * mat4.ELEMENTS_PER_OBJECT; // in elements
    var end = begin + mat4.ELEMENTS_PER_OBJECT; // in elements
    return array.subarray(begin, end);
  }

  /**
   * @export
   * @return {number}
   * @param {mat4.array} array
   * @param {mat4} value
   */
  mat4.array.indexOf = function(array, value) {
    if (array.buffer !== value.buffer) {
      return -1;
    }

    var index = (value.byteOffset - array.byteOffset) / (array.BYTES_PER_ELEMENT * mat4.ELEMENTS_PER_OBJECT);

    if (index >= mat4.array.count(array)) {
      return -1;
    }

    return index;
  }

  /**
   * @export
   * @return {void}
   * @param {mat4.array} array
   * @param {function(mat4,number,mat4.array):void} callback
   * @param {number=} start
   * @param {number=} count
   */
  mat4.array.forEach = function(array, callback, start, count) {
    start = start || 0;
    count = count || mat4.array.count(array);
    for (var index = start; index < count; ++index) {
      callback(mat4.array.valueAt(array, index), index, array);
    }
  }

  return mat4;
});
