(function (label, definition) {
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
		if (ses.ok()) { ses[label] = definition; }
	// <script>
	} else if (typeof self !== "undefined") {
		self[label] = definition();
	} else {
		throw new Error();
	}
})("mat3", function definition() {

/**
 * Copyright (c) Flyover Games, LLC
 */

/**
 * @export 
 * @typedef {Float32Array}
 */
var mat3 = {};

/**
 * @const 
 * @type {number} 
 */
mat3.ELEMENTS_PER_OBJECT = 9;

/**
 * @export 
 * @return {mat3} 
 * @param {number=} init 
 */
mat3.make = function (init)
{
	var m = new Float32Array(mat3.ELEMENTS_PER_OBJECT);
	if (typeof(init) === 'number')
	{
		m[0] = m[4] = m[8] = init;
	}
	return m;
}

/**
 * @const 
 * @type {mat3} 
 */
mat3.IDENTITY = mat3.make(1.0);

/**
 * @export 
 * @return {mat3} 
 * @param {number} x 
 * @param {number} y 
 */
mat3.make_pos_xy = function (x, y)
{
	return mat3.from_pos_xy(mat3.make(), x, y);
}

/**
 * @export 
 * @return {mat3} 
 * @param {vec2} v 
 */
mat3.make_pos_vec2 = function (v)
{
	return mat3.from_pos_xy(mat3.make(), v[0], v[1]);
}

/**
 * @export 
 * @return {mat3} 
 * @param {number} c 
 * @param {number} s 
 */
mat3.make_rot_cs = function (c, s)
{
	return mat3.from_rot_cs(mat2.make(), c, s);
}

/**
 * @export 
 * @return {mat3} 
 * @param {number} angle 
 */
mat3.make_rot_angle = function (angle)
{
	return mat3.from_rot_cs(mat3.make(), Math.cos(angle), Math.sin(angle));
}

/**
 * @export 
 * @return {mat3} 
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 * @param {number} c 
 * @param {number} s 
 */
mat3.make_rot_xyzcs = function (x, y, z, c, s)
{
	return mat3.from_rot_xyzcs(mat3.make(), x, y, z, c, s);
}

/**
 * @export 
 * @return {mat3} 
 * @param {number} angle 
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 */
mat3.make_rot_angle_xyz = function (angle, x, y, z)
{
	return mat3.from_rot_xyzcs(mat3.make(), x, y, z, Math.cos(angle), Math.sin(angle));
}

/**
 * @export 
 * @return {mat3} 
 * @param {vec3} axis 
 * @param {number} angle 
 */
mat3.make_rot_axis_angle = function (axis, angle)
{
	return mat3.from_rot_xyzcs(axis[0], axis[1], axis[2], Math.cos(angle), Math.sin(angle));
}

/**
 * @return {mat3} 
 * @param {quat} q 
 */
mat3.make_rot_quat = function (q)
{
	return mat3.from_rot_quat(quat.make(), q);
}

/**
 * @export 
 * @return {mat3} 
 * @param {number} x 
 * @param {number} y 
 */
mat3.make_sca_xy = function (x, y)
{
	return mat3.from_sca_xyz(mat3.make(), x, y, 1.0);
}

/**
 * @export 
 * @return {mat3} 
 * @param {vec2} v 
 */
mat3.make_sca_vec2 = function (v)
{
	return mat3.from_sca_xyz(mat3.make(), v[0], v[1], 1.0);
}

/**
 * @export 
 * @return {mat3} 
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 */
mat3.make_sca_xyz = function (x, y, z)
{
	return mat3.from_sca_xyz(mat3.make(), x, y, z);
}

/**
 * @export 
 * @return {mat3} 
 * @param {vec3} v 
 */
mat3.make_sca_vec3 = function (v)
{
	return mat3.from_sca_xyz(mat3.make(), v[0], v[1], v[2]);
}

/**
 * @export 
 * @return {mat3}
 * @param {mat3} m
 */
mat3.clone = function (m)
{
	return new Float32Array(m);
}

/**
 * @export 
 * @return {mat3} 
 * @param {mat3} m 
 */
mat3.random = function (m)
{
	return mat3.random_rot(m); // default to random 3D rotation
}

/**
 * @export 
 * @return {mat3} 
 * @param {mat3} m 
 */
mat3.random_rot = function (m)
{
	var r = Math.PI * (2.0 * Math.random() - 1.0);
	var z = 2.0 * Math.random() - 1.0;
	var l = Math.sqrt(1.0 - z*z);
	var x = l * Math.cos(r);
	var y = l * Math.sin(r);
	var a = Math.PI * (2.0 * Math.random() - 1.0);
	var c = Math.cos(a);
	var s = Math.sin(a);
	var t = 1.0 - c;
	m[0] = x*x*t + c;   m[1] = y*x*t + z*s; m[2] = z*x*t - y*s;
	m[3] = x*y*t - z*s; m[4] = y*y*t + c;   m[5] = z*y*t + x*s;
	m[6] = x*z*t + y*s; m[7] = y*z*t - x*s; m[8] = z*z*t + c;
	return m;
}

/**
 * @export 
 * @return {mat3} 
 * @param {mat3} m 
 * @param {number=} pos_lo 
 * @param {number=} pos_hi 
 * @param {number=} sca_lo 
 * @param {number=} sca_hi 
 */
mat3.random_space = function (m, pos_lo, pos_hi, sca_lo, sca_hi)
{
	var r = Math.PI * (2.0 * Math.random() - 1.0);
	var c = Math.cos(r);
	var s = Math.sin(r);
	m[0] =   c; m[1] =   s; m[2] = 0.0;
	m[3] =  -s; m[4] =   c; m[5] = 0.0;
	m[6] = 0.0; m[7] = 0.0; m[8] = 1.0;
	if (pos_lo && pos_hi)
	{
		var pos_range = (pos_hi - pos_lo);
		m[6] = pos_range * Math.random() + pos_lo;
		m[7] = pos_range * Math.random() + pos_lo;
	}
	if (sca_lo && sca_hi)
	{
		var sca_range = (sca_hi - sca_lo);
		m[0] *= sca_range * Math.random() + sca_lo;
		m[4] *= sca_range * Math.random() + sca_lo;
	}
	return m;
}

/**
 * @export 
 * @return {mat3}
 * @param {mat3} out
 * @param {mat3} m
 */
mat3.copy = function (out, m)
{
	out.set(m);
	return out;
}

/**
 * @export 
 * @return {mat3} 
 * @param {mat3} m
 * @param {number} x 
 * @param {number} y 
 */
mat3.from_pos_xy = function (m, x, y)
{
	mat3.identity(m);
	m[6] = x;
	m[7] = y;
	return m;
}

/**
 * @export 
 * @return {mat3} 
 * @param {mat3} m
 * @param {number} c 
 * @param {number} s 
 */
mat3.from_rot_cs = function (m, c, s)
{
	mat3.identity(m);
	m[0] = c;  m[1] = s;
	m[3] = -s; m[4] = c;
	return m;
}

/**
 * @export 
 * @return {mat3} 
 * @param {mat3} m
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 * @param {number} c 
 * @param {number} s 
 */
mat3.from_rot_xyzcs = function (m, x, y, z, c, s)
{
	var t = 1.0 - c;
	m[0] = x*x*t + c;   m[1] = y*x*t + z*s; m[2] = z*x*t - y*s;
	m[3] = x*y*t - z*s; m[4] = y*y*t + c;   m[5] = z*y*t + x*s;
	m[6] = x*z*t + y*s; m[7] = y*z*t - x*s; m[8] = z*z*t + c;
	return m;
}

/**
 * @export 
 * @return {mat3} 
 * @param {mat3} m
 * @param {quat} q 
 */
mat3.from_rot_quat = function (m, q)
{
	var x = q[0], y = q[1], z = q[2], w = q[3];
	var x2 = x + x, y2 = y + y, z2 = z + z;
	var xx = x*x2, xy = x*y2, xz = x*z2;
	var yy = y*y2, yz = y*z2, zz = z*z2;
	var wx = w*x2, wy = w*y2, wz = w*z2;
	m[0] = 1.0 - (yy + zz); m[1] = xy + wz;         m[2] = xz - wy;
	m[3] = xy - wz;         m[4] = 1.0 - (xx + zz); m[5] = yz + wx;
	m[6] = xz + wy;         m[7] = yz - wx;         m[8] = 1.0 - (xx + yy);
	return m;
}

/**
 * @export 
 * @return {mat3} 
 * @param {mat3} m
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 */
mat3.from_sca_xyz = function (m, x, y, z)
{
	mat3.identity(m);
	m[0] = x;
	m[4] = y;
	m[8] = z;
	return m;
}

/** 
 * @export 
 * @return {mat3} 
 * @param {mat3} m 
 * @param {vec2} p 
 * @param {mat2} r 
 * @param {vec2} s 
 */
mat3.import_space = function (m, p, r, s)
{
	m[0] = r[0]*s[0]; m[1] = r[1]*s[0]; m[2] = 0.0; // col 0
	m[3] = r[2]*s[1]; m[4] = r[3]*s[1]; m[5] = 0.0; // col 1
	m[6] = p[0];      m[7] = p[1];      m[8] = 1.0; // col 2
	return m;
}

/** 
 * @export 
 * @return {mat3} 
 * @param {mat3} m 
 * @param {vec3} p 
 * @param {mat3} r 
 * @param {vec3} s 
 */
mat3.export_space = function (m, p, r, s)
{
	var a = m[0], b = m[1];//, p = m[2]; // col 0
	var d = m[3], e = m[4];//, q = m[5]; // col 1
	var x = m[6], y = m[7];//, w = m[8]; // col 2

	var sx = Math.sqrt(a*a + b*b);
	var sy = Math.sqrt(d*d + e*e);

	// if determinite is negative, invert one scale
	if (mat3.det(m) < 0.0) { sx = -sx; }

	p[0] = x;
	p[1] = y;

	r[0] = a / sx; r[1] = b / sx; // col 0
	r[2] = d / sy; r[3] = e / sy; // col 1

	s[0] = sx;
	s[1] = sy;

	return m;
}

/**
 * @export 
 * @return {boolean} 
 * @param {mat3} a 
 * @param {mat3} b 
 * @param {number=} epsilon 
 */
mat3.eq = function (a, b, epsilon)
{
	if (typeof(epsilon) === 'number')
	{
		return (Math.abs(b[0] - a[0]) <= epsilon)
			&& (Math.abs(b[1] - a[1]) <= epsilon)
			&& (Math.abs(b[2] - a[2]) <= epsilon)
			&& (Math.abs(b[3] - a[3]) <= epsilon)
			&& (Math.abs(b[4] - a[4]) <= epsilon)
			&& (Math.abs(b[5] - a[5]) <= epsilon)
			&& (Math.abs(b[6] - a[6]) <= epsilon)
			&& (Math.abs(b[7] - a[7]) <= epsilon)
			&& (Math.abs(b[8] - a[8]) <= epsilon);
	}
	else
	{
		return a[0] === b[0] 
			&& a[1] === b[1]
			&& a[2] === b[2]
			&& a[3] === b[3]
			&& a[4] === b[4]
			&& a[5] === b[5]
			&& a[6] === b[6]
			&& a[7] === b[7]
			&& a[8] === b[8];
	}
}

/**
 * @export 
 * @return {boolean} 
 * @param {mat3} a 
 * @param {mat3} b 
 * @param {number=} epsilon 
 */
mat3.neq = function (a, b, epsilon)
{
	return !mat3.eq(a, b, epsilon);
}

/**
 * @export 
 * @return {number}
 * @param {mat3} m
 */
mat3.det = function (m)
{
	var a00 = a[0], a01 = a[1], a02 = a[2];
	var a10 = a[3], a11 = a[4], a12 = a[5];
	var a20 = a[6], a21 = a[7], a22 = a[8];

	var b01 = a22 * a11 - a12 * a21;
	var b11 = a20 * a12 - a10 * a22;
	var b21 = a21 * a10 - a11 * a20;

	return a00 * b01 + a01 * b11 + a02 * b21;
}

/**
 * @export 
 * @return {mat3}
 * @param {mat3} out
 * @param {mat3} m
 */
mat3.inv = function (out, m)
{
	var a00 = m[0], a01 = m[1], a02 = m[2];
	var a10 = m[3], a11 = m[4], a12 = m[5];
	var a20 = m[6], a21 = m[7], a22 = m[8];

	var b01 = a22 * a11 - a12 * a21;
	var b11 = a20 * a12 - a10 * a22;
	var b21 = a21 * a10 - a11 * a20;

	var det = a00 * b01 + a01 * b11 + a02 * b21;

	if (!det) { return mat3.copy(out, mat3.IDENTITY); }
	det = 1.0 / det

	out[0] = det * b01;
	out[1] = det * (a02 * a21 - a22 * a01);
	out[2] = det * (a12 * a01 - a02 * a11);
	out[3] = det * b11;
	out[4] = det * (a22 * a00 - a02 * a20);
	out[5] = det * (a02 * a10 - a12 * a00);
	out[6] = det * b21;
	out[7] = det * (a01 * a20 - a21 * a00);
	out[8] = det * (a11 * a00 - a01 * a10);

	return out
}

/**
 * @export 
 * @return {mat3}
 * @param {mat3} out
 * @param {mat3} a
 * @param {mat3} b
 */
mat3.add = function (out, a, b)
{
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	out[2] = a[2] + b[2];
	out[3] = a[3] + b[3];
	out[4] = a[4] + b[4];
	out[5] = a[5] + b[5];
	out[6] = a[6] + b[6];
	out[7] = a[7] + b[7];
	out[8] = a[8] + b[8];
}

/**
 * @export 
 * @return {mat3}
 * @param {mat3} out
 * @param {mat3} a
 * @param {mat3} b
 */
mat3.sub = function (out, a, b)
{
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	out[2] = a[2] - b[2];
	out[3] = a[3] - b[3];
	out[4] = a[4] - b[4];
	out[5] = a[5] - b[5];
	out[6] = a[6] - b[6];
	out[7] = a[7] - b[7];
	out[8] = a[8] - b[8];
}

/**
 * @export 
 * @return {mat3}
 * @param {mat3} out
 * @param {mat3} a
 * @param {mat3} b
 */
mat3.mul = function (out, a, b)
{
	var a00 = a[0], a01 = a[1], a02 = a[2],
		a10 = a[3], a11 = a[4], a12 = a[5],
		a20 = a[6], a21 = a[7], a22 = a[8];

	var b0 = b[0], b1 = b[1], b2 = b[2];
	out[0] = b0*a00 + b1*a10 + b2*a20;
	out[1] = b0*a01 + b1*a11 + b2*a21;
	out[2] = b0*a02 + b1*a12 + b2*a22;

	b0 = b[3]; b1 = b[4]; b2 = b[5];
	out[3] = b0*a00 + b1*a10 + b2*a20;
	out[4] = b0*a01 + b1*a11 + b2*a21;
	out[5] = b0*a02 + b1*a12 + b2*a22;

	b0 = b[6]; b1 = b[7]; b2 = b[8];
	out[6] = b0*a00 + b1*a10 + b2*a20;
	out[7] = b0*a01 + b1*a11 + b2*a21;
	out[8] = b0*a02 + b1*a12 + b2*a22;

	return out;
}

/**
 * @export 
 * @return {mat3}
 * @param {mat3} out
 * @param {mat3} a
 * @param {mat3} b
 */
mat3.combine = function (out, a, b)
{
	return mat3.mul(out, a, b);
}

/**
 * @export 
 * @return {mat3}
 * @param {mat3} out
 * @param {mat3} a
 * @param {mat3} b
 */
mat3.extract = function (out, a, b)
{
	if (out === a) { throw new Error(); }
	return mat3.mul(out, mat3.inv(out, b), a);
}

/**
 * @export 
 * @return {vec2} 
 * @param {vec2} out
 * @param {mat3} m 
 * @param {vec2} v 
 */
mat3.mul_vec2 = function (out, m, v)
{
	var v0 = v[0], v1 = v[1];
	out[0] = m[0] * v0 + m[3] * v1 + m[6];
	out[1] = m[1] * v0 + m[4] * v1 + m[7];
	return out;
}

/**
 * @export 
 * @return {vec3} 
 * @param {vec3} out
 * @param {mat3} m 
 * @param {vec3} v 
 */
mat3.mul_vec3 = function (out, m, v)
{
	var v0 = v[0], v1 = v[1], v2 = v[2];
	out[0] = m[0] * v0 + m[3] * v1 + m[6] * v2;
	out[1] = m[1] * v0 + m[4] * v1 + m[7] * v2;
	out[2] = m[2] * v0 + m[5] * v1 + m[8] * v2;
	return out;
}

/**
 * @export 
 * @return {vec4} 
 * @param {vec4} out
 * @param {mat3} m 
 * @param {vec4} v 
 */
mat3.mul_vec4 = function (out, m, v)
{
	var v0 = v[0], v1 = v[1], v2 = v[2];
	out[0] = m[0] * v0 + m[3] * v1 + m[6] * v2;
	out[1] = m[1] * v0 + m[4] * v1 + m[7] * v2;
	out[2] = m[2] * v0 + m[5] * v1 + m[8] * v2;
	out[3] = v[3];
	return out;
}

/**
 * @typedef {Float32Array}
 */
mat3.array = {};

/**
 * @export 
 * @return {mat3.array}
 * @param {number} count
 * @param {number|function(mat3,number,mat3.array):void=} init
 */
mat3.array.make = function (count, init)
{
	var array = new Float32Array(count * mat3.ELEMENTS_PER_OBJECT);
	if (typeof(init) === 'number')
	{
		mat3.array.forEach(array, function (value) { value[0] = value[4] = value[8] = init; });
	}
	else if (typeof(init) === 'function')
	{
		mat3.array.forEach(array, init);
	}
	return array;
}

/**
 * @export 
 * @return {mat3.array}
 * @param {mat3.array} array
 */
mat3.array.clone = function (array)
{
	return new Float32Array(array);
}

/**
 * @export 
 * @return {mat3.array}
 * @param {mat3.array} array 
 * @param {number} count 
 * @param {number|function(mat3,number,mat3.array):void=} init
 */
mat3.array.remake = function (array, count, init)
{
	var start = mat3.array.count(array);
	if (start < count)
	{
		// more
		var out = new Float32Array(count * mat3.ELEMENTS_PER_OBJECT);
		out.set(array);
		if (typeof(init) === 'function')
		{
			mat3.array.forEach(out, init, start, count);
		}
		return out;
	}
	else if (start > count)
	{
		// less
		var out = new Float32Array(count * mat3.ELEMENTS_PER_OBJECT);
		out.set(array.subarray(0, count * mat3.ELEMENTS_PER_OBJECT));
		return out;
	}
	else
	{
		// same
		return new Float32Array(array);
	}
}

/**
 * @export 
 * @return {number}
 * @param {mat3.array} array 
 */
mat3.array.count = function (array)
{
	return array.length / mat3.ELEMENTS_PER_OBJECT;
}

/**
 * @export 
 * @return {mat3} 
 * @param {mat3.array} array 
 * @param {number} index 
 */
mat3.array.valueAt = function (array, index)
{
	//var offset = index * mat3.ELEMENTS_PER_OBJECT * array.BYTES_PER_ELEMENT; // in bytes
	//var length = mat3.ELEMENTS_PER_OBJECT; // in elements
	//return new Float32Array(array.buffer, offset, length);

	var begin = index * mat3.ELEMENTS_PER_OBJECT; // in elements
	var end = begin + mat3.ELEMENTS_PER_OBJECT; // in elements
	return array.subarray(begin, end);
}

/**
 * @export 
 * @return {number} 
 * @param {mat3.array} array 
 * @param {mat3} value 
 */
mat3.array.indexOf = function (array, value)
{
	if (array.buffer !== value.buffer)
	{
		return -1;
	}

	var index = (value.byteOffset - array.byteOffset) / (array.BYTES_PER_ELEMENT * mat3.ELEMENTS_PER_OBJECT);

	if (index >= mat3.array.count(array))
	{
		return -1;
	}

	return index;
}

/**
 * @export 
 * @return {void} 
 * @param {mat3.array} array 
 * @param {function(mat3,number,mat3.array):void} callback 
 * @param {number=} start 
 * @param {number=} count 
 */
mat3.array.forEach = function (array, callback, start, count)
{
	start = start || 0;
	count = count || mat3.array.count(array);
	for (var index = start; index < count; ++index)
	{
		callback(mat3.array.valueAt(array, index), index, array);
	}
}

return mat3; });
