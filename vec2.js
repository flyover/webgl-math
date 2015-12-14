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
})("vec2", function definition() {

/**
 * Copyright (c) Flyover Games, LLC
 */

/**
 * @export 
 * @typedef {Float32Array}
 */
var vec2 = {};

vec2.script = {};

try { vec2.native = vec2.native || require('./build/Release/vec2'); } catch (err) {}
try { vec2.native = vec2.native || process._linkedBinding('node_vec2'); } catch (err) {}
try { vec2.native = vec2.native || process.binding('node_vec2'); } catch (err) {}

/** 
 * @export 
 * @const 
 * @type {number}
 */
vec2.ELEMENTS_PER_OBJECT = 2;

/** 
 * @export 
 * @return {vec2}
 * @param {number=} x
 * @param {number=} y
 */
vec2.make = function (x, y)
{
	var out = new Float32Array(vec2.ELEMENTS_PER_OBJECT);
	if (arguments.length > 0)
	{
		out[0] = x || 0.0;
		out[1] = y || 0.0;
	}
	return out;
}

/** 
 * @export 
 * @const 
 * @type {vec2}
 */
vec2.ZERO = vec2.make(0.0, 0.0);

/** 
 * @export 
 * @const 
 * @type {vec2}
 */
vec2.UNIT = vec2.make(1.0, 1.0);

/** 
 * @export 
 * @const 
 * @type {vec2}
 */
vec2.UNITX = vec2.make(1.0, 0.0);

/** 
 * @export 
 * @const 
 * @type {vec2}
 */
vec2.UNITY = vec2.make(0.0, 1.0);

/**
 * @export 
 * @return {vec2}
 * @param {vec2} v
 */
vec2.clone = function (v)
{
	return new Float32Array(v);
}

/**
 * @export 
 * @return {string}
 * @param {vec2} obj
 * @param {string=} out
 */
vec2.stringify = function (obj, out)
{
	out = out || "";
	return out += "vec2.make(" + obj[0].toString() + "," + obj[1].toString() + ")";
}

/**
 * @export 
 * @return {vec2}
 * @param {string} str
 * @param {vec2=} out
 */
vec2.objectify = function (str, out)
{
	out = out || vec2.make();
	var match = str.match(/vec2.make\((.*),(.*)\)/);
	return vec2.set(out, parseFloat(match[1]), parseFloat(match[2]));
}

/**
 * @export 
 * @return {vec2}
 * @param {vec2} v 
 */
vec2.zero = function (v)
{
	v[0] = 0.0;
	v[1] = 0.0;
	return v;
}

/**
 * @export 
 * @return {vec2}
 * @param {vec2} v 
 */
vec2.random = function (v)
{
	v[0] = Math.random();
	v[1] = Math.random();
	return v;
}

/**
 * @export 
 * @return {vec2}
 * @param {vec2} v 
 * @param {number} lo 
 * @param {number} hi 
 */
vec2.random_range = function (v, lo, hi)
{
	var range = hi - lo;
	v[0] = range * Math.random() + lo;
	v[1] = range * Math.random() + lo;
	return v;
}

/**
 * @export 
 * @return {vec2}
 * @param {vec2} v 
 */
vec2.random_axis = function (v)
{
	var r = Math.PI * (2.0 * Math.random() - 1.0);
	v[0] = Math.cos(r);
	v[1] = Math.sin(r);
	return v;
}

/**
 * @export 
 * @return {vec2}
 * @param {vec2} v 
 */
vec2.drop = vec2.zero;

/**
 * @export 
 * @return {Array.<number>}
 * @param {vec2} v 
 * @param {Array.<number>} json 
 */
vec2.save = function (v, json)
{
	json[0] = v[0];
	json[1] = v[1];
	return json;
}

/**
 * @export 
 * @return {vec2}
 * @param {vec2} v 
 * @param {Array.<number>} json 
 */
vec2.load = function (v, json)
{
	v[0] = json[0];
	v[1] = json[1];
	return v;
}

/**
 * @export 
 * @return {vec2}
 * @param {vec2} v
 * @param {number} x
 * @param {number} y
 */
vec2.set = function (v, x, y)
{
	v[0] = x;
	v[1] = y;
	return v;
}

/**
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} v
 */
vec2.copy = function (out, v)
{
	out.set(v);
	return out;
}

/**
 * @export 
 * @return {boolean} 
 * @param {vec2} a 
 * @param {vec2} b 
 * @param {number=} epsilon 
 */
vec2.eq = function (a, b, epsilon)
{
	if (typeof(epsilon) === 'number')
	{
		return (Math.abs(b[0] - a[0]) <= epsilon)
			&& (Math.abs(b[1] - a[1]) <= epsilon);
	}
	else
	{
		return a[0] === b[0] 
			&& a[1] === b[1];
	}
}

/**
 * @export 
 * @return {boolean} 
 * @param {vec2} a 
 * @param {vec2} b 
 * @param {number=} epsilon 
 */
vec2.neq = function (a, b, epsilon)
{
	return !vec2.eq(a, b, epsilon);
}

/**
 * @export 
 * @return {number}
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.distance = function (a, b)
{
	return vec2.len(vec2.sub(vec2.distance.tmp, b, a));
}
vec2.distance.tmp = vec2.make();

/**
 * @export 
 * @return {number}
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.dot = function (a, b)
{
	return a[0] * b[0] + a[1] * b[1];
}

/** 
 * [ a.x, a.y, 0 ] x [ b.x, b.y, 0 ] : z 
 * @export 
 * @return {number}
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.cross = function (a, b)
{
	return a[0] * b[1] - a[1] * b[0];
}

/** 
 * out = [ v.x, v.y, 0 ] x [ 0, 0, 1 ] : [ x, y ]
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} v
 * @param {number} s
 */
vec2.perp = function (out, v)
{
	var v0 = v[0];
	out[0] = v[1];
	out[1] = -v0;
	return out;
}

/**
 * @export 
 * @return {number}
 * @param {vec2} v
 */
vec2.len = function (v)
{
	return Math.sqrt(vec2.dot(v, v));
}

/**
 * @export 
 * @return {number}
 * @param {vec2} v
 */
vec2.invlen = function (v)
{
	return 1.0 / Math.sqrt(vec2.dot(v, v));
}

/**
 * @export 
 * @return {number}
 * @param {vec2} v
 */
vec2.sqrlen = function (v)
{
	return vec2.dot(v, v);
}

/**
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} v
 */
vec2.norm = function (out, v)
{
	return vec2.muls(out, v, vec2.invlen(v));
}

/**
 * out = -v
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} v
 */
vec2.neg = function (out, v)
{
	out[0] = -v[0];
	out[1] = -v[1];
	return out;
}

/**
 * out = 1.0 / v
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} v
 */
vec2.inv = function (out, v)
{
	out[0] = 1.0 / v[0];
	out[1] = 1.0 / v[1];
	return out;
}

/**
 * out = min(a, b)
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.min = function (out, a, b)
{
	out[0] = Math.min(a[0], b[0]);
	out[1] = Math.min(a[1], b[1]);
	return out;
}

/**
 * out = max(a, b)
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.max = function (out, a, b)
{
	out[0] = Math.max(a[0], b[0]);
	out[1] = Math.max(a[1], b[1]);
	return out;
}

/**
 * out = a + b
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.add = function (out, a, b)
{
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	return out;
}

/**
 * out = v + s
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} v
 * @param {number} s
 */
vec2.adds = function (out, v, s)
{
	out[0] = v[0] + s;
	out[1] = v[1] + s;
	return out;
}

/**
 * out = a - b
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.sub = function (out, a, b)
{
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	return out;
}

/**
 * out = v - s
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} v
 * @param {number} s
 */
vec2.subs = function (out, v, s)
{
	out[0] = v[0] - s;
	out[1] = v[1] - s;
	return out;
}

/**
 * out = a * b
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.mul = function (out, a, b)
{
	out[0] = a[0] * b[0];
	out[1] = a[1] * b[1];
	return out;
}

/**
 * out = v * s
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} v
 * @param {number} s
 */
vec2.muls = function (out, v, s)
{
	out[0] = v[0] * s;
	out[1] = v[1] * s;
	return out;
}

/**
 * out = a / b
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.div = function (out, a, b)
{
	out[0] = a[0] / b[0];
	out[1] = a[1] / b[1];
	return out;
}

/**
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.combine = function (out, a, b)
{
	return vec2.add(out, a, b);
}

/**
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.extract = function (out, a, b)
{
	return vec2.sub(out, a, b);
}

/**
 * out = a + (b * s)
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 * @param {number} s
 */
vec2.muls_add = function (out, a, b, s)
{
	out[0] = a[0] + (s * b[0]);
	out[1] = a[1] + (s * b[1]);
	return out;
}

if (vec2.native)
{
	vec2.script.muls_add = vec2.muls_add;
	vec2.muls_add = vec2.native.muls_add;
}

/**
 * @typedef {Float32Array}
 */
vec2.array = {};

vec2.script.array = {};

/**
 * @export 
 * @return {vec2.array}
 * @param {number} count
 * @param {function(vec2,number,vec2.array):void=} init
 */
vec2.array.make = function (count, init)
{
	var out = new Float32Array(count * vec2.ELEMENTS_PER_OBJECT);
	if (typeof(init) === 'function')
	{
		vec2.array.forEach(out, init);
	}
	return out;
}

/**
 * @export 
 * @return {vec2.array}
 * @param {vec2.array} array
 */
vec2.array.clone = function (array)
{
	return new Float32Array(array);
}

/**
 * @export 
 * @return {number}
 * @param {vec2.array} array 
 */
vec2.array.count = function (array)
{
	return array.length / vec2.ELEMENTS_PER_OBJECT;
}

/**
 * @export 
 * @return {vec2.array}
 * @param {vec2.array} array 
 * @param {number} count 
 * @param {function(vec2,number,vec2.array):void=} init
 */
vec2.array.remake = function (array, count, init)
{
	var start = vec2.array.count(array);
	if (start < count)
	{
		// more
		var out = new Float32Array(count * vec2.ELEMENTS_PER_OBJECT);
		out.set(array);
		if (typeof(init) === 'function')
		{
			vec2.array.forEach(out, init, start, count);
		}
		return out;
	}
	else if (start > count)
	{
		// less
		var out = new Float32Array(count * vec2.ELEMENTS_PER_OBJECT);
		out.set(array.subarray(0, count * vec2.ELEMENTS_PER_OBJECT));
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
 * @return {vec2.array} 
 * @param {vec2.array} array 
 * @param {number=} start 
 * @param {number=} count 
 */
vec2.array.view = function (array, start, count)
{
	if (typeof(start) === 'number')
	{
		if (typeof(count) === 'number')
		{
			return new Float32Array(array.subarray(start * vec2.ELEMENTS_PER_OBJECT, (start + count) * vec2.ELEMENTS_PER_OBJECT));
		}
		else
		{
			return new Float32Array(array.subarray(start * vec2.ELEMENTS_PER_OBJECT));
		}
	}
	else
	{
		return new Float32Array(array);
	}
}

/**
 * @export 
 * @return {vec2} 
 * @param {vec2.array} array 
 * @param {number} index 
 */
vec2.array.valueAt = function (array, index)
{
	//var offset = index * vec2.ELEMENTS_PER_OBJECT * array.BYTES_PER_ELEMENT; // in bytes
	//var length = vec2.ELEMENTS_PER_OBJECT; // in elements
	//return new Float32Array(array.buffer, offset, length);

	var begin = index * vec2.ELEMENTS_PER_OBJECT; // in elements
	var end = begin + vec2.ELEMENTS_PER_OBJECT; // in elements
	return array.subarray(begin, end);
}

/**
 * @export 
 * @return {number} 
 * @param {vec2.array} array 
 * @param {vec2} value 
 */
vec2.array.indexOf = function (array, value)
{
	if (array.buffer !== value.buffer)
	{
		return -1;
	}

	var index = (value.byteOffset - array.byteOffset) / (array.BYTES_PER_ELEMENT * vec2.ELEMENTS_PER_OBJECT);

	if (index >= vec2.array.count(array))
	{
		return -1;
	}

	return index;
}

/**
 * @export 
 * @return {void} 
 * @param {vec2.array} array 
 * @param {function(vec2,number,vec2.array):void} callback
 * @param {number=} start 
 * @param {number=} count 
 */
vec2.array.forEach = function (array, callback, start, count)
{
	start = start || 0;
	count = count || vec2.array.count(array);
	for (var index = start; index < count; ++index)
	{
		callback(vec2.array.valueAt(array, index), index, array);
	}
}

/**
 * @export 
 * @return {boolean} 
 * @param {vec2.array} a 
 * @param {vec2.array} b 
 * @param {number=} epsilon 
 */
vec2.array.eq = function (a, b, epsilon)
{
	if (a.length !== b.length)
	{
		return false;
	}
	if (typeof(epsilon) === 'number')
	{
		for (var i = 0, n = a.length; i < n; ++i)
		{
			if (Math.abs(b[i] - a[i]) > epsilon)
			{
				return false;
			}
		}
	}
	else
	{
		for (var i = 0, n = a.length; i < n; ++i)
		{
			if (a[i] !== b[i])
			{
				return false;
			}
		}
	}
	return true;
}

if (vec2.native)
{
	vec2.script.array.eq = vec2.array.eq;
	vec2.array.eq = vec2.native.array.eq;
}

/**
 * @export 
 * @return {boolean} 
 * @param {vec2.array} a 
 * @param {vec2.array} b 
 * @param {number=} epsilon 
 */
vec2.array.neq = function (a, b, epsilon)
{
	return !vec2.array.eq(a, b, epsilon);
}

/**
 * out = a + (b * s)
 * @export 
 * @return {vec2.array}
 * @param {vec2.array} out
 * @param {vec2.array} a
 * @param {vec2.array} b
 * @param {number} s
 */
vec2.array.muls_add = function (out, a, b, s)
{
	for (var i = 0, n = out.length; i < n; ++i)
	{
		out[i] = a[i] + (s * b[i]);
	}
	return out;
}

if (vec2.native)
{
	vec2.script.array.muls_add = vec2.array.muls_add;
	vec2.array.muls_add = vec2.native.array.muls_add;
}

return vec2; });
