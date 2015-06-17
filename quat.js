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
})("quat", function definition() {

/**
 * Copyright (c) Flyover Games, LLC
 */

/**
 * @export 
 * @typedef {Float32Array}
 */
var quat = {};

/** 
 * @const 
 * @type {number}
 */
quat.ELEMENTS_PER_OBJECT = 4;

/**
 * @export 
 * @return {quat}
 * @param {number=} init 
 */
quat.make = function (init)
{
	var out = new Float32Array(quat.ELEMENTS_PER_OBJECT);
	if (typeof(init) === 'number')
	{
		out[3] = init;
	}
	return out;
}

/** 
 * @const 
 * @type {quat}
 */
quat.IDENTITY = quat.make(1.0);

/**
 * @export 
 * @return {quat} 
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 * @param {number} c 
 * @param {number} s 
 */
quat.make_xyzcs = function (x, y, z, c, s)
{
	return quat.make_angle_xyz(Math.atan2(s, c), x, y, z);
}

/**
 * @export 
 * @return {quat} 
 * @param {number} angle 
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 */
quat.make_angle_xyz = function (angle, x, y, z)
{
	var out = new Float32Array(quat.ELEMENTS_PER_OBJECT);
	var hr = 0.5 * angle;
	var hc = Math.cos(hr);
	var hs = Math.sin(hr);
	out[0] = hs * x;
	out[1] = hs * y;
	out[2] = hs * z;
	out[3] = hc;
	return out;
}

/**
 * @export 
 * @return {quat} 
 * @param {vec3} axis 
 * @param {number} angle 
 */
quat.make_axis_angle = function (axis, angle)
{
	return quat.make_angle_xyz(angle, axis[0], axis[1], axis[2]);
}

/**
 * @export 
 * @return {quat}
 * @param {quat} q
 */
quat.clone = function (q)
{
	return new Float32Array(q);
}

/**
 * @export 
 * @return {string}
 * @param {quat} obj
 */
quat.stringify = function (obj)
{
	return "quat.make(" + obj[0].toString() + "," + obj[1].toString() + "," + obj[2].toString() + "," + obj[3].toString() + ")";
}

/**
 * @export 
 * @return {quat}
 * @param {string} str
 */
quat.objectify = function (str)
{
	var match = str.match(/quat.make\((.*),(.*),(.*),(.*)\)/);
	var out = quat.make();
	out[0] = parseFloat(match[1]);
	out[1] = parseFloat(match[2]);
	out[2] = parseFloat(match[3]);
	out[3] = parseFloat(match[4]);
	return out;
}

/**
 * @export 
 * @return {quat}
 * @param {quat} q 
 */
quat.identity = function (q)
{
	q.set(quat.IDENTITY);
	return q;
}

/**
 * @export 
 * @return {quat}
 * @param {quat} q 
 */
quat.random = function (q)
{
	var r = Math.PI * (2.0 * Math.random() - 1.0);
	var z = 2.0 * Math.random() - 1.0;
	var l = Math.sqrt(1.0 - z*z);
	var x = l * Math.cos(r);
	var y = l * Math.sin(r);
	var hr = Math.PI * (Math.random() - 0.5);
	var hc = Math.cos(hr);
	var hs = Math.sin(hr);
	q[0] = hs * x;
	q[1] = hs * y;
	q[2] = hs * z;
	q[3] = hc;
	return q;
}

/**
 * @export 
 * @return {quat}
 * @param {quat} q 
 */
quat.drop = quat.identity;

/**
 * @export 
 * @return {Array.<number>}
 * @param {quat} q 
 * @param {Array.<number>} json 
 */
quat.save = function (q, json)
{
	json[0] = q[0];
	json[1] = q[1];
	json[2] = q[2];
	json[3] = q[3];
	return json;
}

/**
 * @export 
 * @return {quat}
 * @param {quat} q 
 * @param {Array.<number>} json 
 */
quat.load = function (q, json)
{
	q[0] = json[0];
	q[1] = json[1];
	q[2] = json[2];
	q[3] = json[3];
	return q;
}

/**
 * @export 
 * @return {quat}
 * @param {quat} q
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} w
 */
quat.set = function (q, x, y, z, w)
{
	q[0] = x;
	q[1] = y;
	q[2] = z;
	q[3] = w;
	return q;
}

/**
 * @export 
 * @return {quat}
 * @param {quat} out
 * @param {quat} q
 */
quat.copy = function (out, q)
{
	out.set(q);
	return out;
}

/**
 * @export 
 * @return {quat} 
 * @param {quat} q 
 * @param {vec3} euler 
 * @param {string} order 
 */
quat.import_euler = function (q, euler, order)
{
	// euler to quaternion

	if (euler[0] === 0.0 && euler[1] === 0.0)
	{
		// optimize for 2D rotation
		var hz = 0.5 * euler[2];
		var cz = Math.cos(hz), sz = Math.sin(hz);
		q[0] = 0.0;
		q[1] = 0.0;
		q[2] = sz;
		q[3] = cz;
	}
	else
	{
		var hx = 0.5 * euler[0];
		var hy = 0.5 * euler[1];
		var hz = 0.5 * euler[2];
		var cx = Math.cos(hx), sx = Math.sin(hx);
		var cy = Math.cos(hy), sy = Math.sin(hy);
		var cz = Math.cos(hz), sz = Math.sin(hz);
		switch (order)
		{
		case 'xyz':
			q[0] = sx*cy*cz + cx*sy*sz;
			q[1] = cx*sy*cz - sx*cy*sz;
			q[2] = cx*cy*sz + sx*sy*cz;
			q[3] = cx*cy*cz - sx*sy*sz;
			break;
		case 'zxy':
			q[0] = sx*cy*cz - cx*sy*sz;
			q[1] = cx*sy*cz + sx*cy*sz;
			q[2] = cx*cy*sz + sx*sy*cz;
			q[3] = cx*cy*cz - sx*sy*sz;
			break;
		case 'yzx':
			q[0] = sx*cy*cz + cx*sy*sz;
			q[1] = cx*sy*cz + sx*cy*sz;
			q[2] = cx*cy*sz - sx*sy*cz;
			q[3] = cx*cy*cz - sx*sy*sz;
			break;
		case 'zyx':
			q[0] = sx*cy*cz - cx*sy*sz;
			q[1] = cx*sy*cz + sx*cy*sz;
			q[2] = cx*cy*sz - sx*sy*cz;
			q[3] = cx*cy*cz + sx*sy*sz;
			break;
		case 'xzy':
			q[0] = sx*cy*cz - cx*sy*sz;
			q[1] = cx*sy*cz - sx*cy*sz;
			q[2] = cx*cy*sz + sx*sy*cz;
			q[3] = cx*cy*cz + sx*sy*sz;
			break;
		case 'yxz':
			q[0] = sx*cy*cz + cx*sy*sz;
			q[1] = cx*sy*cz - sx*cy*sz;
			q[2] = cx*cy*sz - sx*sy*cz;
			q[3] = cx*cy*cz + sx*sy*sz;
			break;
		default:
			throw new Error();
			break;
		}
	}

	return quat.normalize(q, q);
}

/**
 * @export 
 * @return {quat} 
 * @param {quat} q 
 * @param {vec3} euler 
 * @param {string} order 
 */
quat.export_euler = function (q, euler, order)
{
	// quaternion to euler

	if ((q[0] === 0.0) && (q[1] === 0.0))
	{
		// optimize for 2D rotation
		var qz = q[2];
		var qw = q[3];
		var sqz = qz*qz;
		var sqw = qw*qw;
		euler[0] = 0.0;
		euler[1] = 0.0;
		euler[2] = Math.atan2(2*qz*qw, sqw - sqz);
	}
	else
	{
		var qx = q[0];
		var qy = q[1];
		var qz = q[2];
		var qw = q[3];
		var sqx = qx*qx;
		var sqy = qy*qy;
		var sqz = qz*qz;
		var sqw = qw*qw;
		switch (order)
		{
		case 'xyz':
			euler[0] = Math.atan2(2*(qw*qx - qy*qz), sqw - sqx - sqy + sqz);
			euler[1] = Math.asin( 2*(qw*qy + qz*qx));
			euler[2] = Math.atan2(2*(qw*qz - qx*qy), sqw + sqx - sqy - sqz);
			break;
		case 'zxy':
			euler[0] = Math.asin( 2*(qw*qx + qy*qz));
			euler[1] = Math.atan2(2*(qw*qy - qz*qx), sqw - sqx - sqy + sqz);
			euler[2] = Math.atan2(2*(qw*qz - qx*qy), sqw - sqx + sqy - sqz);
			break;                                                        
		case 'yzx':                                                       
			euler[0] = Math.atan2(2*(qw*qx - qz*qy), sqw - sqx + sqy - sqz);
			euler[1] = Math.atan2(2*(qw*qy - qx*qz), sqw + sqx - sqy - sqz);
			euler[2] = Math.asin( 2*(qw*qz + qy*qx));
			break;                                                        
		case 'zyx':                                                       
			euler[0] = Math.atan2(2*(qw*qx + qz*qy), sqw - sqx - sqy + sqz);
			euler[1] = Math.asin( 2*(qw*qy - qx*qz));
			euler[2] = Math.atan2(2*(qw*qz + qy*qx), sqw + sqx - sqy - sqz);
			break;                                                        
		case 'xzy':                                                       
			euler[0] = Math.atan2(2*(qw*qx + qy*qz), sqw - sqx + sqy - sqz);
			euler[1] = Math.atan2(2*(qw*qy + qz*qx), sqw + sqx - sqy - sqz);
			euler[2] = Math.asin( 2*(qw*qz - qx*qy));
			break;                                                        
		case 'yxz':                                                       
			euler[0] = Math.asin( 2*(qw*qx - qy*qz));
			euler[1] = Math.atan2(2*(qw*qy + qz*qx), sqw - sqx - sqy + sqz);
			euler[2] = Math.atan2(2*(qw*qz + qx*qy), sqw - sqx + sqy - sqz);
			break;
		default:
			throw new Error();
			break;
		}
	}

	return q;
}

/**
 * @export 
 * @return {quat} 
 * @param {quat} q 
 * @param {vec4} axis_angle 
 */
quat.import_axis_angle = function (q, axis_angle)
{
	var hr = 0.5 * axis_angle[3];
	var hc = Math.cos(hr);
	var hs = Math.sin(hr);
	q[0] = hs * axis_angle[0];
	q[1] = hs * axis_angle[1];
	q[2] = hs * axis_angle[2];
	q[3] = hc;
	return q;
}

/**
 * @export 
 * @return {quat} 
 * @param {quat} q 
 * @param {vec4} axis_angle 
 */
quat.export_axis_angle = function (q, axis_angle)
{
	var qw = q[3];
	var s = 1.0 / (1.0 - Math.sqrt(qw * qw));
	axis_angle[0] = s * q[0];
	axis_angle[1] = s * q[1];
	axis_angle[2] = s * q[2];
	axis_angle[3] = 2.0 * Math.acos(qw);
	return q;
}

/**
 * @export 
 * @return {boolean} 
 * @param {quat} a 
 * @param {quat} b 
 * @param {number=} epsilon 
 */
quat.eq = function (a, b, epsilon)
{
	if (typeof(epsilon) === 'number')
	{
//		return (Math.abs(b[0] - a[0]) <= epsilon)
//			&& (Math.abs(b[1] - a[1]) <= epsilon)
//			&& (Math.abs(b[2] - a[2]) <= epsilon)
//			&& (Math.abs(b[3] - a[3]) <= epsilon);
		return (Math.abs(b[3] - a[3]) <= epsilon) && 
			(((Math.abs(b[0] - a[0]) <= epsilon) && 
			  (Math.abs(b[1] - a[1]) <= epsilon) && 
			  (Math.abs(b[2] - a[2]) <= epsilon)) || 
			 ((Math.abs(b[0] + a[0]) <= epsilon) && 
			  (Math.abs(b[1] + a[1]) <= epsilon) && 
			  (Math.abs(b[2] + a[2]) <= epsilon)));
	}
	else
	{
//		return a[0] === b[0] 
//			&& a[1] === b[1]
//			&& a[2] === b[2]
//			&& a[3] === b[3];
		return (a[3] === b[3]) && 
			((a[0] === b[0] && 
			  a[1] === b[1] && 
			  a[2] === b[2]) || 
			 (a[0] === -(b[0]) && 
			  a[1] === -(b[1]) && 
			  a[2] === -(b[2])));
	}
}

/**
 * @export 
 * @return {boolean} 
 * @param {quat} a 
 * @param {quat} b 
 * @param {number=} epsilon 
 */
quat.neq = function (a, b, epsilon)
{
	return !quat.eq(a, b, epsilon);
}

/**
 * @export 
 * @return {number}
 * @param {quat} a
 * @param {quat} b
 */
quat.dot = function (a, b)
{
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

/**
 * @export 
 * @return {number}
 * @param {quat} q
 */
quat.len = function (q)
{
	return Math.sqrt(quat.dot(q, q));
}

/**
 * @export 
 * @return {number}
 * @param {quat} q
 */
quat.invlen = function (q)
{
	return 1.0 / Math.sqrt(quat.dot(q, q));
}

/**
 * @export 
 * @return {number}
 * @param {quat} q
 */
quat.sqrlen = function (q)
{
	return quat.dot(q, q);
}

/**
 * @export 
 * @return {quat}
 * @param {quat} out
 * @param {quat} q
 */
quat.normalize = function (out, q)
{
	return quat.muls(out, q, quat.invlen(q));
}

/**
 * out = -q
 * @export 
 * @return {quat}
 * @param {quat} out
 * @param {quat} q
 */
quat.conjugate = function (out, q)
{
	out[0] = -q[0];
	out[1] = -q[1];
	out[2] = -q[2];
	out[3] =  q[3];
	return out;
}

/**
 * out = a + b
 * @export 
 * @return {quat}
 * @param {quat} out
 * @param {quat} a
 * @param {quat} b
 */
quat.add = function (out, a, b)
{
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	out[2] = a[2] + b[2];
	out[3] = a[3] + b[3];
	return out;
}

/**
 * out = q + s
 * @export 
 * @return {quat}
 * @param {quat} out
 * @param {quat} q
 * @param {number} s
 */
quat.adds = function (out, q, s)
{
	out[0] = q[0] + s;
	out[1] = q[1] + s;
	out[2] = q[2] + s;
	out[3] = q[3] + s;
	return out;
}

/**
 * out = a - b
 * @export 
 * @return {quat}
 * @param {quat} out
 * @param {quat} a
 * @param {quat} b
 */
quat.sub = function (out, a, b)
{
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	out[2] = a[2] - b[2];
	out[3] = a[3] - b[3];
	return out;
}

/**
 * out = q - s
 * @export 
 * @return {quat}
 * @param {quat} out
 * @param {quat} q
 * @param {number} s
 */
quat.subs = function (out, q, s)
{
	out[0] = q[0] - s;
	out[1] = q[1] - s;
	out[2] = q[2] - s;
	out[3] = q[3] - s;
	return out;
}

/**
 * out = a * b
 * @export 
 * @return {quat}
 * @param {quat} out
 * @param {quat} a
 * @param {quat} b
 */
quat.mul = function (out, a, b)
{
	out[0] = a[0] * b[0];
	out[1] = a[1] * b[1];
	out[2] = a[2] * b[2];
	out[3] = a[3] * b[3];
	return out;
}

/**
 * out = q * s
 * @export 
 * @return {quat}
 * @param {quat} out
 * @param {quat} q
 * @param {number} s
 */
quat.muls = function (out, q, s)
{
	out[0] = q[0] * s;
	out[1] = q[1] * s;
	out[2] = q[2] * s;
	out[3] = q[3] * s;
	return out;
}

/**
 * out = a / b
 * @export 
 * @return {quat}
 * @param {quat} out
 * @param {quat} a
 * @param {quat} b
 */
quat.div = function (out, a, b)
{
	out[0] = a[0] / b[0];
	out[1] = a[1] / b[1];
	out[2] = a[2] / b[2];
	out[3] = a[3] / b[3];
	return out;
}

/** 
 * combine b into a 
 * @export 
 * @return {quat}
 * @param {quat} out
 * @param {quat} a
 * @param {quat} b
 */
quat.combine = function (out, a, b)
{
	var ax = a[0], ay = a[1], az = a[2], aw = a[3];
	var bx = b[0], by = b[1], bz = b[2], bw = b[3];
	out[0] = aw*bx + ay*bz - az*by + ax*bw;
	out[1] = aw*by + az*bx - ax*bz + ay*bw;
	out[2] = aw*bz + ax*by - ay*bx + az*bw;
	out[3] = aw*bw - ax*bx - ay*by - az*bz;
	return out;
}

/** 
 * extract b from a 
 * @export 
 * @return {quat}
 * @param {quat} out
 * @param {quat} a
 * @param {quat} b
 */
quat.extract = function (out, a, b)
{
	// q1q2 == combine(q1, q2)
	// extract(q1q2, q1) == q2
	// q1q2q3 == combine(q1q2, q3)
	// extract(q1q2q3, q1q2) == q3
	// extract(q1q2q3, q1) == q2q3 ?
	var ax = a[0], ay = a[1], az = a[2], aw = a[3];
	var bx = b[0], by = b[1], bz = b[2], bw = b[3];
	out[0] = aw*bx - ay*bz + az*by - ax*bw;
	out[1] = aw*by - az*bx + ax*bz - ay*bw;
	out[2] = aw*bz - ax*by + ay*bx - az*bw;
	out[3] = aw*bw + ax*bx + ay*by + az*bz;
	return out;
}

/**
 * out = a + t * (b - a) 
 * @export 
 * @return {quat}
 * @param {quat} out
 * @param {quat} a
 * @param {quat} b
 * @param {number} t
 */
quat.lerp = function (out, a, b, t)
{
	out[0] = a[0] + (t * (b[0] - a[0]));
	out[1] = a[1] + (t * (b[1] - a[1]));
	out[2] = a[2] + (t * (b[2] - a[2]));
	out[3] = a[3] + (t * (b[3] - a[3]));
	return out;
}

/**
 * out = a + t * (b - a) 
 * @export 
 * @return {quat}
 * @param {quat} out
 * @param {quat} a
 * @param {quat} b
 * @param {number} t
 */
quat.slerp = function (out, a, b, t)
{
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
	var bx = b[0], by = b[1], bz = b[2], bw = b[3];
	var cos_half_theta = ax*ax + ay*ay + az*az + aw*aw;
	if (Math.abs(cos_half_theta) < 1.0)
	{
		if (cos_half_theta < 0)
		{
			bx = -bx; by = -by; bz = -bz;
			cos_half_theta = -cos_half_theta;
		}
		var half_theta = Math.acos(cos_half_theta);
		var sin_half_theta = Math.sqrt(1.0 - cos_half_theta*cos_half_theta);
		var ratio_a = 0.5;
		var ratio_b = 0.5;
		if (Math.abs(sin_half_theta) > 0.0)
		{
			ratio_a = Math.sin((1.0 - t) / half_theta) / sin_half_theta;
			ratio_b = Math.sin(       t  / half_theta) / sin_half_theta;
		}
		out[0] = ax*ratio_a + bx*ratio_b;
		out[1] = ay*ratio_a + by*ratio_b;
		out[2] = az*ratio_a + bz*ratio_b;
		out[3] = aw*ratio_a + bw*ratio_b;
	}
	return out;
}

/**
 * @export 
 * @return {quat} 
 * @param {quat} out 
 * @param {quat} q 
 * @param {number} rad 
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 */
quat.rotate_xyz = function (out, q, rad, x, y, z)
{
	var ax = q[0], ay = q[1], az = q[2], aw = q[3];
	var hr = rad * 0.5;
	var hc = Math.cos(hr);
	var hs = Math.sin(hr);
	var bx = hs * x, by = hs * y, bz = hs * z, bw = hc;
	out[0] = aw*bx + ay*bz - az*by + ax*bw;
	out[1] = aw*by + az*bx - ax*bz + ay*bw;
	out[2] = aw*bz + ax*by - ay*bx + az*bw;
	out[3] = aw*bw - ax*bx - ay*by - az*bz;
	return out;
}

/**
 * @export 
 * @return {quat} 
 * @param {quat} out 
 * @param {quat} q 
 * @param {number} rad 
 */
quat.rotate_x = function (out, q, rad)
{
	var ax = q[0], ay = q[1], az = q[2], aw = q[3];
	var hr = rad * 0.5;
	var hc = Math.cos(hr);
	var hs = Math.sin(hr);
	out[0] = ax*hc + aw*hs;
	out[1] = ay*hc + az*hs;
	out[2] = az*hc - ay*hs;
	out[3] = aw*hc - ax*hs;
	return out;
}

/**
 * @export 
 * @return {quat} 
 * @param {quat} out 
 * @param {quat} q 
 * @param {number} rad 
 */
quat.rotate_y = function (out, q, rad)
{
	var ax = q[0], ay = q[1], az = q[2], aw = q[3];
	var hr = rad * 0.5;
	var hc = Math.cos(hr);
	var hs = Math.sin(hr);
	out[0] = ax*hc - az*hs;
	out[1] = ay*hc + aw*hs;
	out[2] = az*hc + ax*hs;
	out[3] = aw*hc - ay*hs;
	return out;
}

/**
 * @export 
 * @return {quat} 
 * @param {quat} out 
 * @param {quat} q 
 * @param {number} rad 
 */
quat.rotate_z = function (out, q, rad)
{
	var ax = q[0], ay = q[1], az = q[2], aw = q[3];
	var hr = rad * 0.5;
	var hc = Math.cos(hr);
	var hs = Math.sin(hr);
	out[0] = ax*hc + ay*hs;
	out[1] = ay*hc - ax*hs;
	out[2] = az*hc + aw*hs;
	out[3] = aw*hc - az*hs;
	return out;
}

/**
 * @export 
 * @return {vec3} 
 * @param {vec3} out 
 * @param {quat} q 
 * @param {vec3} v 
 */
quat.transform_vec3 = function (out, q, v)
{
	// http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToMatrix/
	// | 1 - 2*y*y - 2*z*z,     2*x*y - 2*z*w,     2*x*z + 2*y*w; |
	// |     2*x*y + 2*z*w, 1 - 2*x*x - 2*z*z,     2*y*z - 2*x*w; |
	// |     2*x*z - 2*y*w,     2*y*z + 2*x*w, 1 - 2*x*x - 2*y*y; |
	var x = q[0], y = q[1], z = q[2], w = q[3];
	var xx = x*x, yy = y*y, zz = z*z;
	var x2 = x+x, y2 = y+y, z2 = z+z;
	var xx2 = x*x2, yy2 = y*y2, zz2 = z*z2;
	var xy2 = x2*y, xz2 = x2*z, xw2 = x2*w;
	var yz2 = y2*z, yw2 = y2*w;
	var zw2 = z2*w;
	var v0 = v[0], v1 = v[1], v2 = v[2];
	out[0] = (1 - (yy2 + zz2)) * v0 + (xy2 - zw2) * v1 + (xz2 + yw2) * v2; // col 0
	out[1] = (xy2 + zw2) * v0 + (1 - (xx2 + zz2)) * v1 + (yz2 - xw2) * v2; // col 1
	out[2] = (xz2 - yw2) * v0 + (yz2 + xw2) * v1 + (1 - (xx2 + yy2)) * v2; // col 2
	return out;
}

/**
 * @export 
 * @return {vec3.array} 
 * @param {vec3.array} out
 * @param {quat} q 
 * @param {vec3.array} v 
 * @param {number=} start
 * @param {number=} count
 */
quat.transform_vec3_array = function (out, q, v, start, count)
{
	start = start || 0;
	count = count || vec3.array.count(v);
	var x = q[0], y = q[1], z = q[2], w = q[3];
	var xx = x*x, yy = y*y, zz = z*z;
	var x2 = x+x, y2 = y+y, z2 = z+z;
	var xx2 = x*x2, yy2 = y*y2, zz2 = z*z2;
	var xy2 = x2*y, xz2 = x2*z, xw2 = x2*w;
	var yz2 = y2*z, yw2 = y2*w;
	var zw2 = z2*w;
	for (var index = start; index < count; ++index)
	{
		var offset = index * vec4.ELEMENTS_PER_OBJECT;
		var v0 = v[offset + 0], v1 = v[offset + 1], v2 = v[offset + 2];
		out[offset + 0] = (1 - (yy2 + zz2)) * v0 + (xy2 - zw2) * v1 + (xz2 + yw2) * v2; // col 0
		out[offset + 1] = (xy2 + zw2) * v0 + (1 - (xx2 + zz2)) * v1 + (yz2 - xw2) * v2; // col 1
		out[offset + 2] = (xz2 - yw2) * v0 + (yz2 + xw2) * v1 + (1 - (xx2 + yy2)) * v2; // col 2
	}
	return out;
}

/**
 * @typedef {Float32Array}
 */
quat.array = {};

/**
 * @export 
 * @return {quat.array}
 * @param {number} count
 * @param {number|function(quat,number,quat.array):void=} init
 */
quat.array.make = function (count, init)
{
	var array = new Float32Array(count * quat.ELEMENTS_PER_OBJECT);
	if (typeof(init) === 'number')
	{
		quat.array.forEach(array, function (q) { q[3] = init; });
	}
	else if (typeof(init) === 'function')
	{
		quat.array.forEach(array, init);
	}
	return array;
}

/**
 * @export 
 * @return {quat.array}
 * @param {quat.array} array 
 * @param {number} count 
 * @param {number|function(quat,number,quat.array):void=} init
 */
quat.array.remake = function (array, count, init)
{
	var start = quat.array.count(array);
	if (start < count)
	{
		// more
		var out = new Float32Array(count * quat.ELEMENTS_PER_OBJECT);
		out.set(array);
		if (typeof(init) === 'function')
		{
			quat.array.forEach(out, init, start, count);
		}
		return out;
	}
	else if (start > count)
	{
		// less
		var out = new Float32Array(count * quat.ELEMENTS_PER_OBJECT);
		out.set(array.subarray(0, count * quat.ELEMENTS_PER_OBJECT));
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
 * @param {quat.array} array 
 */
quat.array.count = function (array)
{
	return array.length / quat.ELEMENTS_PER_OBJECT;
}

/**
 * @export 
 * @return {quat} 
 * @param {quat.array} array 
 * @param {number} index 
 */
quat.array.valueAt = function (array, index)
{
	//var offset = index * quat.ELEMENTS_PER_OBJECT * array.BYTES_PER_ELEMENT; // in bytes
	//var length = quat.ELEMENTS_PER_OBJECT; // in elements
	//return new Float32Array(array.buffer, offset, length);

	var begin = index * quat.ELEMENTS_PER_OBJECT; // in elements
	var end = begin + quat.ELEMENTS_PER_OBJECT; // in elements
	return array.subarray(begin, end);
}

/**
 * @export 
 * @return {number} 
 * @param {quat.array} array 
 * @param {quat} value 
 */
quat.array.indexOf = function (array, value)
{
	if (array.buffer !== value.buffer)
	{
		return -1;
	}

	var index = (value.byteOffset - array.byteOffset) / (array.BYTES_PER_ELEMENT * quat.ELEMENTS_PER_OBJECT);

	if (index >= quat.array.count(array))
	{
		return -1;
	}

	return index;
}

/**
 * @export 
 * @return {void} 
 * @param {quat.array} array 
 * @param {function(quat,number,quat.array):void} callback 
 * @param {number=} start 
 * @param {number=} count 
 */
quat.array.forEach = function (array, callback, start, count)
{
	start = start || 0;
	count = count || vec2.array.count(array);
	for (var index = 0, count = quat.array.count(array); index < count; ++index)
	{
		callback(quat.array.valueAt(array, index), index, array);
	}
}

return quat; });
