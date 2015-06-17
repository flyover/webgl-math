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
})("mat2", function definition() {

/**
 * Copyright (c) Flyover Games, LLC
 */

/**
 * @export 
 * @typedef {Float32Array}
 */
var mat2 = {};

/**
 * @const 
 * @type {number} 
 */
mat2.ELEMENTS_PER_OBJECT = 4;

/**
 * @export 
 * @return {mat2} 
 * @param {number=} init 
 */
mat2.make = function (init)
{
	var m = new Float32Array(mat2.ELEMENTS_PER_OBJECT);
	if (typeof(init) === 'number')
	{
		m[0] = m[3] = init;
	}
	return m;
}

/**
 * @const 
 * @type {mat2} 
 */
mat2.IDENTITY = mat2.make(1.0);

/**
 * @export 
 * @return {mat2} 
 * @param {number} c 
 * @param {number} s 
 */
mat2.make_rot_cs = function (c, s)
{
	var m = new Float32Array(mat2.ELEMENTS_PER_OBJECT);
	m[0] =  c; m[1] = s;
	m[1] = -s; m[2] = c;
	return m;
}

/**
 * @export 
 * @return {mat2} 
 * @param {number} angle 
 */
mat2.make_rot_angle_xyz = function (angle)
{
	return mat2.make_cs(Math.cos(angle), Math.sin(angle));
}

/**
 * @export 
 * @return {mat2} 
 * @param {number} x 
 * @param {number} y 
 */
mat2.make_sca_xy = function (x, y)
{
	var m = new Float32Array(mat2.ELEMENTS_PER_OBJECT);
	m[0] = x;
	m[3] = y;
	return m;
}

/**
 * @export 
 * @return {mat2} 
 * @param {vec2} v 
 */
mat2.make_sca_vec2 = function (v)
{
	return mat2.make_sca_xy(v[0], v[1]);
}

/**
 * @export 
 * @return {mat2}
 * @param {mat2} m
 */
mat2.clone = function (m)
{
	return new Float32Array(m);
}

/**
 * @export 
 * @return {mat2}
 * @param {mat2} m
 */
mat2.identity = function (m)
{
	m.set(mat2.IDENTITY);
	return m;
}

/**
 * @export 
 * @return {mat2} 
 * @param {mat2} m 
 */
mat2.random = function (m)
{
	return mat2.random_rot(m); // default to random 2D rotation
}

/**
 * @export 
 * @return {mat2} 
 * @param {mat2} m 
 */
mat2.random_rot = function (m)
{
	var r = Math.PI * (2.0 * Math.random() - 1.0);
	var c = Math.cos(r);
	var s = Math.sin(r);
	m[0] =  c; m[1] = s;
	m[1] = -s; m[2] = c;
	return m;
}

/**
 * @export 
 * @return {mat2}
 * @param {mat2} out
 * @param {mat2} m
 */
mat2.copy = function (out, m)
{
	out.set(m);
	return out;
}

/**
 * @export 
 * @return {boolean} 
 * @param {mat2} a 
 * @param {mat2} b 
 * @param {number=} epsilon 
 */
mat2.eq = function (a, b, epsilon)
{
	if (typeof(epsilon) === 'number')
	{
		return (Math.abs(b[0] - a[0]) <= epsilon)
			&& (Math.abs(b[1] - a[1]) <= epsilon)
			&& (Math.abs(b[2] - a[2]) <= epsilon)
			&& (Math.abs(b[3] - a[3]) <= epsilon);
	}
	else
	{
		return a[0] === b[0] 
			&& a[1] === b[1]
			&& a[2] === b[2]
			&& a[3] === b[3];
	}
}

/**
 * @export 
 * @return {boolean} 
 * @param {mat2} a 
 * @param {mat2} b 
 * @param {number=} epsilon 
 */
mat2.neq = function (a, b, epsilon)
{
	return !mat2.eq(a, b, epsilon);
}

/**
 * @export 
 * @return {number}
 * @param {mat2} m
 */
mat2.det = function (m)
{
	var m00 = m[0], m01 = m[1],
		m10 = m[2], m11 = m[3];
	return m00 * m11 - m01 * m10;
}

/**
 * @export 
 * @return {mat2}
 * @param {mat2} out
 * @param {mat2} m
 */
mat2.inv = function (out, m)
{
	var m00 = m[0], m01 = m[1],
		m10 = m[2], m11 = m[3],
		det = m00 * m11 - m01 * m10;
	if (!det) { return mat2.copy(out, mat2.IDENTITY); }
	det = 1.0 / det;
	out[0] = det * m11;
	out[1] = det * -m01;
	out[2] = det * -m10;
	out[3] = det * m00;
	return out;
}

/**
 * @export 
 * @return {mat2}
 * @param {mat2} out
 * @param {mat2} a
 * @param {mat2} b
 */
mat2.add = function (out, a, b)
{
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	out[2] = a[2] + b[2];
	out[3] = a[3] + b[3];
}

/**
 * @export 
 * @return {mat2}
 * @param {mat2} out
 * @param {mat2} a
 * @param {mat2} b
 */
mat2.sub = function (out, a, b)
{
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	out[2] = a[2] - b[2];
	out[3] = a[3] - b[3];
}

/**
 * @export 
 * @return {mat2}
 * @param {mat2} out
 * @param {mat2} a
 * @param {mat2} b
 */
mat2.mul = function (out, a, b)
{
	var a00 = a[0], a01 = a[1],
		a10 = a[2], a11 = a[3];
	var b0 = b[0], b1 = b[1];
	out[0] = b0*a00 + b1*a10;
	out[1] = b0*a01 + b1*a11;
	b0 = b[2]; b1 = b[3];
	out[2] = b0*a00 + b1*a10
	out[3] = b0*a01 + b1*a11
	return out;
}

/**
 * @export 
 * @return {mat2}
 * @param {mat2} out
 * @param {mat2} a
 * @param {mat2} b
 */
mat2.combine = function (out, a, b)
{
	return mat2.mul(out, a, b);
}

/**
 * @export 
 * @return {mat2}
 * @param {mat2} out
 * @param {mat2} a
 * @param {mat2} b
 */
mat2.extract = function (out, a, b)
{
	if (out === a) { throw new Error(); }
	return mat2.mul(out, mat2.inv(out, b), a);
}

/**
 * @export 
 * @return {vec2} 
 * @param {vec2} out
 * @param {mat2} m 
 * @param {vec2} v 
 */
mat2.mul_vec2 = function (out, m, v)
{
	var v0 = v[0], v1 = v[1];
	out[0] = m[0] * v0 + m[2] * v1;
	out[1] = m[1] * v0 + m[3] * v1;
	return out;
}

/**
 * @export 
 * @return {vec3} 
 * @param {vec3} out
 * @param {mat2} m 
 * @param {vec3} v 
 */
mat2.mul_vec3 = function (out, m, v)
{
	var v0 = v[0], v1 = v[1];
	out[0] = m[0] * v0 + m[2] * v1;
	out[1] = m[1] * v0 + m[3] * v1;
	out[2] = v[2];
	return out;
}

/**
 * @export 
 * @return {vec4} 
 * @param {vec4} out
 * @param {mat2} m 
 * @param {vec4} v 
 */
mat2.mul_vec4 = function (out, m, v)
{
	var v0 = v[0], v1 = v[1];
	out[0] = m[0] * v0 + m[2] * v1;
	out[1] = m[1] * v0 + m[3] * v1;
	out[2] = v[2];
	out[3] = v[3];
	return out;
}

/**
 * @typedef {Float32Array}
 */
mat2.array = {};

/**
 * @export 
 * @return {mat2.array}
 * @param {number} count
 * @param {number|function(mat2,number,mat2.array):void=} init
 */
mat2.array.make = function (count, init)
{
	var array = new Float32Array(count * mat2.ELEMENTS_PER_OBJECT);
	if (typeof(init) === 'number')
	{
		mat2.array.forEach(array, function (value) { value[0] = value[3] = init; });
	}
	else if (typeof(init) === 'function')
	{
		mat2.array.forEach(array, init);
	}
	return array;
}

/**
 * @export 
 * @return {mat2.array}
 * @param {mat2.array} array
 */
mat2.array.clone = function (array)
{
	return new Float32Array(array);
}

/**
 * @export 
 * @return {mat2.array}
 * @param {mat2.array} array 
 * @param {number} count 
 * @param {number|function(mat2,number,mat2.array):void=} init
 */
mat2.array.remake = function (array, count, init)
{
	var start = mat2.array.count(array);
	if (start < count)
	{
		// more
		var out = new Float32Array(count * mat2.ELEMENTS_PER_OBJECT);
		out.set(array);
		if (typeof(init) === 'function')
		{
			mat2.array.forEach(out, init, start, count);
		}
		return out;
	}
	else if (start > count)
	{
		// less
		var out = new Float32Array(count * mat2.ELEMENTS_PER_OBJECT);
		out.set(array.subarray(0, count * mat2.ELEMENTS_PER_OBJECT));
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
 * @param {mat2.array} array 
 */
mat2.array.count = function (array)
{
	return array.length / mat2.ELEMENTS_PER_OBJECT;
}

/**
 * @export 
 * @return {mat2} 
 * @param {mat2.array} array 
 * @param {number} index 
 */
mat2.array.valueAt = function (array, index)
{
	//var offset = index * mat2.ELEMENTS_PER_OBJECT * array.BYTES_PER_ELEMENT; // in bytes
	//var length = mat2.ELEMENTS_PER_OBJECT; // in elements
	//return new Float32Array(array.buffer, offset, length);

	var begin = index * mat2.ELEMENTS_PER_OBJECT; // in elements
	var end = begin + mat2.ELEMENTS_PER_OBJECT; // in elements
	return array.subarray(begin, end);
}

/**
 * @export 
 * @return {number} 
 * @param {mat2.array} array 
 * @param {mat2} value 
 */
mat2.array.indexOf = function (array, value)
{
	if (array.buffer !== value.buffer)
	{
		return -1;
	}

	var index = (value.byteOffset - array.byteOffset) / (array.BYTES_PER_ELEMENT * mat2.ELEMENTS_PER_OBJECT);

	if (index >= mat2.array.count(array))
	{
		return -1;
	}

	return index;
}

/**
 * @export 
 * @return {void} 
 * @param {mat2.array} array 
 * @param {function(mat2,number,mat2.array):void} callback 
 * @param {number=} start 
 * @param {number=} count 
 */
mat2.array.forEach = function (array, callback, start, count)
{
	start = start || 0;
	count = count || mat2.array.count(array);
	for (var index = start; index < count; ++index)
	{
		callback(mat2.array.valueAt(array, index), index, array);
	}
}

return mat2; });
