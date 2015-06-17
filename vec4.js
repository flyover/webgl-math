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
})("vec4", function definition() {

/**
 * Copyright (c) Flyover Games, LLC
 */

var node_vec4 = null;
try { node_vec4 = node_vec4 || require('./build/Release/vec4'); } catch (err) {}
try { node_vec4 = node_vec4 || process._linkedBinding('node_vec4'); } catch (err) {}
try { node_vec4 = node_vec4 || process.binding('node_vec4'); } catch (err) {}
module.exports = node_vec4;

/**
 * @export 
 * @typedef {Float32Array}
 */
var vec4 = {};

/** 
 * @export 
 * @const 
 * @type {number}
 */
vec4.ELEMENTS_PER_OBJECT = 4;

/** 
 * @export 
 * @return {vec4}
 * @param {number=} x
 * @param {number=} y
 * @param {number=} z
 * @param {number=} w
 */
vec4.make = function (x, y, z, w)
{
	var out = new Float32Array(vec4.ELEMENTS_PER_OBJECT);
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
 * @type {vec4}
 */
vec4.ZERO = vec4.make(0.0, 0.0, 0.0, 0.0);

/** 
 * @export 
 * @const 
 * @type {vec4}
 */
vec4.UNIT = vec4.make(1.0, 1.0, 1.0, 1.0);

/** 
 * @export 
 * @const 
 * @type {vec4}
 */
vec4.UNITX = vec4.make(1.0, 0.0, 0.0, 0.0);

/** 
 * @export 
 * @const 
 * @type {vec4}
 */
vec4.UNITY = vec4.make(0.0, 1.0, 0.0, 0.0);

/** 
 * @export 
 * @const 
 * @type {vec4}
 */
vec4.UNITZ = vec4.make(0.0, 0.0, 1.0, 0.0);

/** 
 * @export 
 * @const 
 * @type {vec4}
 */
vec4.UNITW = vec4.make(0.0, 0.0, 0.0, 1.0);

/**
 * @export 
 * @return {vec4}
 * @param {vec4} v
 */
vec4.clone = function (v)
{
	return new Float32Array(v);
}

/**
 * @export 
 * @return {string}
 * @param {vec4} obj
 * @param {string=} out
 */
vec4.stringify = function (obj, out)
{
	out = out || "";
	return out += "vec4.make(" + obj[0].toString() + "," + obj[1].toString() + "," + obj[2].toString() + "," + obj[3].toString() + ")";
}

/**
 * @export 
 * @return {vec4}
 * @param {string} str
 * @param {vec4=} out
 */
vec4.objectify = function (str, out)
{
	out = out || vec4.make();
	var match = str.match(/vec4.make\((.*),(.*),(.*),(.*)\)/);
	return vec4.set(out, parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3]), parseFloat(match[4]));
}

/**
 * @export 
 * @return {vec4}
 * @param {vec4} v 
 */
vec4.zero = function (v)
{
	v[0] = 0.0;
	v[1] = 0.0;
	v[2] = 0.0;
	v[3] = 0.0;
	return v;
}

/**
 * @export 
 * @return {vec4}
 * @param {vec4} v 
 */
vec4.random = function (v)
{
	v[0] = Math.random();
	v[1] = Math.random();
	v[2] = Math.random();
	v[3] = Math.random();
	return v;
}

/**
 * @export 
 * @return {vec4}
 * @param {vec4} v 
 * @param {number} lo 
 * @param {number} hi 
 */
vec4.random_range = function (v, lo, hi)
{
	var range = hi - lo;
	v[0] = range * Math.random() + lo;
	v[1] = range * Math.random() + lo;
	v[2] = range * Math.random() + lo;
	v[3] = range * Math.random() + lo;
	return v;
}

/**
 * @export 
 * @return {vec4}
 * @param {vec4} v 
 */
vec4.random_axis = function (v)
{
	var r = Math.PI * (2.0 * Math.random() - 1.0);
	var z = 2.0 * Math.random() - 1.0;
	var s = Math.sqrt(1.0 - z*z);
	v[0] = s * Math.cos(r);
	v[1] = s * Math.sin(r);
	v[2] = z;
	v[3] = 0.0;
	return v;
}

/**
 * @export 
 * @return {vec4}
 * @param {vec4} v 
 */
vec4.drop = vec4.zero;

/**
 * @export 
 * @return {Array.<number>}
 * @param {vec4} v 
 * @param {Array.<number>} json 
 */
vec4.save = function (v, json)
{
	json[0] = v[0];
	json[1] = v[1];
	json[2] = v[2];
	json[3] = v[3];
	return json;
}

/**
 * @export 
 * @return {vec4}
 * @param {vec4} v 
 * @param {Array.<number>} json 
 */
vec4.load = function (v, json)
{
	v[0] = json[0];
	v[1] = json[1];
	v[2] = json[2];
	v[3] = json[3];
	return v;
}

/**
 * @export 
 * @return {vec4}
 * @param {vec4} v
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} w
 */
vec4.set = function (v, x, y, z, w)
{
	v[0] = x;
	v[1] = y;
	v[2] = z;
	v[3] = w;
	return v;
}

/**
 * @export 
 * @return {vec4}
 * @param {vec4} out
 * @param {vec4} v
 */
vec4.copy = function (out, v)
{
	out.set(v);
	return out;
}

/**
 * @export 
 * @return {boolean} 
 * @param {vec4} a 
 * @param {vec4} b 
 * @param {number=} epsilon 
 */
vec4.eq = function (a, b, epsilon)
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
 * @param {vec4} a 
 * @param {vec4} b 
 * @param {number=} epsilon 
 */
vec4.neq = function (a, b, epsilon)
{
	return !vec4.eq(a, b, epsilon);
}

/**
 * @export 
 * @return {number}
 * @param {vec4} a
 * @param {vec4} b
 */
vec4.dot = function (a, b)
{
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

/**
 * @export 
 * @return {number}
 * @param {vec4} v
 */
vec4.len = function (v)
{
	return Math.sqrt(vec4.dot(v, v));
}

/**
 * @export 
 * @return {number}
 * @param {vec4} v
 */
vec4.invlen = function (v)
{
	return 1.0 / Math.sqrt(vec4.dot(v, v));
}

/**
 * @export 
 * @return {number}
 * @param {vec4} v
 */
vec4.sqrlen = function (v)
{
	return vec4.dot(v, v);
}

/**
 * @export 
 * @return {vec4}
 * @param {vec4} out
 * @param {vec4} v
 */
vec4.norm = function (out, v)
{
	return vec4.muls(out, v, vec4.invlen(v));
}

/**
 * out = -v
 * @export 
 * @return {vec4}
 * @param {vec4} out
 * @param {vec4} v
 */
vec4.neg = function (out, v)
{
	out[0] = -v[0];
	out[1] = -v[1];
	out[2] = -v[2];
	out[3] = -v[3];
	return out;
}

/**
 * out = 1.0 / v
 * @export 
 * @return {vec4}
 * @param {vec4} out
 * @param {vec4} v
 */
vec4.inv = function (out, v)
{
	out[0] = 1.0 / v[0];
	out[1] = 1.0 / v[1];
	out[2] = 1.0 / v[2];
	out[3] = 1.0 / v[3];
	return out;
}

/**
 * out = min(a, b)
 * @export 
 * @return {vec4}
 * @param {vec4} out
 * @param {vec4} a
 * @param {vec4} b
 */
vec4.min = function (out, a, b)
{
	out[0] = Math.min(a[0], b[0]);
	out[1] = Math.min(a[1], b[1]);
	out[2] = Math.min(a[2], b[2]);
	out[3] = Math.min(a[3], b[3]);
	return out;
}

/**
 * out = max(a, b)
 * @export 
 * @return {vec4}
 * @param {vec4} out
 * @param {vec4} a
 * @param {vec4} b
 */
vec4.max = function (out, a, b)
{
	out[0] = Math.max(a[0], b[0]);
	out[1] = Math.max(a[1], b[1]);
	out[2] = Math.max(a[2], b[2]);
	out[3] = Math.max(a[3], b[3]);
	return out;
}

/**
 * out = a + b
 * @export 
 * @return {vec4}
 * @param {vec4} out
 * @param {vec4} a
 * @param {vec4} b
 */
vec4.add = function (out, a, b)
{
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	out[2] = a[2] + b[2];
	out[3] = a[3] + b[3];
	return out;
}

/**
 * out = v + s
 * @export 
 * @return {vec4}
 * @param {vec4} out
 * @param {vec4} v
 * @param {number} s
 */
vec4.adds = function (out, v, s)
{
	out[0] = v[0] + s;
	out[1] = v[1] + s;
	out[2] = v[2] + s;
	out[3] = v[3] + s;
	return out;
}

/**
 * out = a - b
 * @export 
 * @return {vec4}
 * @param {vec4} out
 * @param {vec4} a
 * @param {vec4} b
 */
vec4.sub = function (out, a, b)
{
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	out[2] = a[2] - b[2];
	out[3] = a[3] - b[3];
	return out;
}

/**
 * out = v - s
 * @export 
 * @return {vec4}
 * @param {vec4} out
 * @param {vec4} v
 * @param {number} s
 */
vec4.subs = function (out, v, s)
{
	out[0] = v[0] - s;
	out[1] = v[1] - s;
	out[2] = v[2] - s;
	out[3] = v[3] - s;
	return out;
}

/**
 * out = a * b
 * @export 
 * @return {vec4}
 * @param {vec4} out
 * @param {vec4} a
 * @param {vec4} b
 */
vec4.mul = function (out, a, b)
{
	out[0] = a[0] * b[0];
	out[1] = a[1] * b[1];
	out[2] = a[2] * b[2];
	out[3] = a[3] * b[3];
	return out;
}

/**
 * out = v * s
 * @export 
 * @return {vec4}
 * @param {vec4} out
 * @param {vec4} v
 * @param {number} s
 */
vec4.muls = function (out, v, s)
{
	out[0] = v[0] * s;
	out[1] = v[1] * s;
	out[2] = v[2] * s;
	out[3] = v[3] * s;
	return out;
}

/**
 * out = a / b
 * @export 
 * @return {vec4}
 * @param {vec4} out
 * @param {vec4} a
 * @param {vec4} b
 */
vec4.div = function (out, a, b)
{
	out[0] = a[0] / b[0];
	out[1] = a[1] / b[1];
	out[2] = a[2] / b[2];
	out[3] = a[3] / b[3];
	return out;
}

/**
 * @export 
 * @return {vec4}
 * @param {vec4} out
 * @param {vec4} a
 * @param {vec4} b
 */
vec4.combine = function (out, a, b)
{
	return vec4.add(out, a, b);
}

/**
 * @export 
 * @return {vec4}
 * @param {vec4} out
 * @param {vec4} a
 * @param {vec4} b
 */
vec4.extract = function (out, a, b)
{
	return vec4.sub(out, a, b);
}

/**
 * out = a + (b * s)
 * @export 
 * @return {vec4}
 * @param {vec4} out
 * @param {vec4} a
 * @param {vec4} b
 * @param {number} s
 */
vec4.muls_add = function (out, a, b, s)
{
	out[0] = a[0] + (s * b[0]);
	out[1] = a[1] + (s * b[1]);
	out[2] = a[2] + (s * b[2]);
	out[3] = a[3] + (s * b[3]);
	return out;
}

/** 
 * out = a + ((b - a) * t) 
 * @export 
 * @return {vec4}
 * @param {vec4} out
 * @param {vec4} a
 * @param {vec4} b
 * @param {number} t
 */
vec4.lerp = function (out, a, b, t)
{
	out[0] = a[0] + (t * (b[0] - a[0]));
	out[1] = a[1] + (t * (b[1] - a[1]));
	out[2] = a[2] + (t * (b[2] - a[2]));
	out[3] = a[3] + (t * (b[3] - a[3]));
	return out;
}

/**
 * @typedef {Float32Array}
 */
vec4.array = {};

/**
 * @export 
 * @return {vec4.array}
 * @param {number} count
 * @param {function(vec4,number,vec4.array):void=} init
 */
vec4.array.make = function (count, init)
{
	var out = new Float32Array(count * vec4.ELEMENTS_PER_OBJECT);
	if (typeof(init) === 'function')
	{
		vec4.array.forEach(out, init);
	}
	return out;
}

/**
 * @export 
 * @return {vec4.array}
 * @param {vec4.array} array
 */
vec4.array.clone = function (array)
{
	return new Float32Array(array);
}

/**
 * @export 
 * @return {vec4.array}
 * @param {vec4.array} array 
 * @param {number} count 
 * @param {function(vec4,number,vec4.array):void=} init
 */
vec4.array.remake = function (array, count, init)
{
	var start = vec4.array.count(array);
	if (start < count)
	{
		// more
		var out = new Float32Array(count * vec4.ELEMENTS_PER_OBJECT);
		out.set(array);
		if (typeof(init) === 'function')
		{
			vec4.array.forEach(out, init, start, count);
		}
		return out;
	}
	else if (start > count)
	{
		// less
		var out = new Float32Array(count * vec4.ELEMENTS_PER_OBJECT);
		out.set(array.subarray(0, count * vec4.ELEMENTS_PER_OBJECT));
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
 * @param {vec4.array} array 
 */
vec4.array.count = function (array)
{
	return array.length / vec4.ELEMENTS_PER_OBJECT;
}

/**
 * @export 
 * @return {vec4} 
 * @param {vec4.array} array 
 * @param {number} index 
 */
vec4.array.valueAt = function (array, index)
{
	//var offset = index * vec4.ELEMENTS_PER_OBJECT * array.BYTES_PER_ELEMENT; // in bytes
	//var length = vec4.ELEMENTS_PER_OBJECT; // in elements
	//return new Float32Array(array.buffer, offset, length);

	var begin = index * vec4.ELEMENTS_PER_OBJECT; // in elements
	var end = begin + vec4.ELEMENTS_PER_OBJECT; // in elements
	return array.subarray(begin, end);
}

/**
 * @export 
 * @return {number} 
 * @param {vec4.array} array 
 * @param {vec4} value 
 */
vec4.array.indexOf = function (array, value)
{
	if (array.buffer !== value.buffer)
	{
		return -1;
	}

	var index = (value.byteOffset - array.byteOffset) / (array.BYTES_PER_ELEMENT * vec4.ELEMENTS_PER_OBJECT);

	if (index >= vec4.array.count(array))
	{
		return -1;
	}

	return index;
}

/**
 * @export 
 * @return {void} 
 * @param {vec4.array} array 
 * @param {function(vec4,number,vec4.array):void} callback
 * @param {number=} start 
 * @param {number=} count 
 */
vec4.array.forEach = function (array, callback, start, count)
{
	start = start || 0;
	count = count || vec4.array.count(array);
	for (var index = start; index < count; ++index)
	{
		callback(vec4.array.valueAt(array, index), index, array);
	}
}

/**
 * @export 
 * @return {boolean} 
 * @param {vec4.array} a 
 * @param {vec4.array} b 
 * @param {number=} epsilon 
 */
vec4.array.eq = function (a, b, epsilon)
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

/**
 * @export 
 * @return {boolean} 
 * @param {vec4.array} a 
 * @param {vec4.array} b 
 * @param {number=} epsilon 
 */
vec4.array.neq = function (a, b, epsilon)
{
	return !vec4.array.eq(a, b, epsilon);
}

/**
 * out = a + (b * s)
 * @export 
 * @return {vec4.array}
 * @param {vec4.array} out
 * @param {vec4.array} a
 * @param {vec4.array} b
 * @param {number} s
 */
vec4.array.muls_add = function (out, a, b, s)
{
//	if (node_vec4)
//	{
//		return node_vec4.array.muls_add(out, a, b, s);
//	}

	for (var i = 0, n = out.length; i < n; ++i)
	{
		out[i] = a[i] + (s * b[i]);
	}
	return out;

//	vec4.array.forEach(out, function (value, index, array)
//	{
//		// value : vec4.array.valueAt(array, index)
//		// array : out
//		vec4.muls_add(value, vec4.array.valueAt(a, index), vec4.array.valueAt(b, index), s);
//	});
//	return out;
}

/** 
 * out = a + ((b - a) * t) 
 * @export 
 * @return {vec4}
 * @param {vec4} out
 * @param {vec4} a
 * @param {vec4} b
 * @param {number} t
 */
vec4.array.lerp = function (out, a, b, t)
{
	for (var i = 0, n = out.length; i < n; ++i)
	{
		out[i] = a[i] + (t * (b[i] - a[i]));
	}
	return out;
}

return vec4; });

/// bvec4.js

/**
 * @typedef {Int8Array}
 */
var bvec4 = {};

/** 
 * @const 
 * @type {number}
 */
bvec4.ELEMENTS_PER_OBJECT = 4;

/**
 * @export 
 * @return {bvec4}
 * @param {boolean=} x
 * @param {boolean=} y
 * @param {boolean=} z
 * @param {boolean=} w
 */
bvec4.make = function (x, y, z, w)
{
	var out = new Int8Array(bvec4.ELEMENTS_PER_OBJECT);
	out[0] = x || false;
	out[1] = y || false;
	out[2] = z || false;
	out[3] = w || false;
	return out;
}

/// ivec4.js

/**
 * @typedef {Int32Array}
 */
var ivec4 = {};

/** 
 * @const 
 * @type {number}
 */
ivec4.ELEMENTS_PER_OBJECT = 4;

/**
 * @export 
 * @return {ivec4}
 * @param {number=} x
 * @param {number=} y
 * @param {number=} z
 * @param {number=} w
 */
ivec4.make = function (x, y, z, w)
{
	var out = new Int32Array(ivec4.ELEMENTS_PER_OBJECT);
	out[0] = x || 0;
	out[1] = y || 0;
	out[2] = z || 0;
	out[3] = w || 0;
	return out;
}

