/**
 * Copyright (c) Flyover Games, LLC
 */

/**
 * @export 
 * @typedef {Float32Array}
 */
var vec2;

/** 
 * @export 
 * @const 
 * @type {number}
 */
vec2.ELEMENTS_PER_OBJECT;

/** 
 * @export 
 * @return {vec2}
 * @param {number=} x
 * @param {number=} y
 */
vec2.make;

/** 
 * @export 
 * @const 
 * @type {vec2}
 */
vec2.ZERO;

/** 
 * @export 
 * @const 
 * @type {vec2}
 */
vec2.UNIT;

/** 
 * @export 
 * @const 
 * @type {vec2}
 */
vec2.UNITX;

/** 
 * @export 
 * @const 
 * @type {vec2}
 */
vec2.UNITY;

/**
 * @export 
 * @return {vec2}
 * @param {vec2} v
 */
vec2.clone;

/**
 * @export 
 * @return {string}
 * @param {vec2} obj
 * @param {string=} out
 */
vec2.stringify;

/**
 * @export 
 * @return {vec2}
 * @param {string} str
 * @param {vec2=} out
 */
vec2.objectify;

/**
 * @export 
 * @return {vec2}
 * @param {vec2} v 
 */
vec2.zero;

/**
 * @export 
 * @return {vec2}
 * @param {vec2} v 
 */
vec2.random;

/**
 * @export 
 * @return {vec2}
 * @param {vec2} v 
 * @param {number} lo 
 * @param {number} hi 
 */
vec2.random_range;

/**
 * @export 
 * @return {vec2}
 * @param {vec2} v 
 */
vec2.random_axis;

/**
 * @export 
 * @return {vec2}
 * @param {vec2} v 
 */
vec2.drop;

/**
 * @export 
 * @return {Array.<number>}
 * @param {vec2} v 
 * @param {Array.<number>} json 
 */
vec2.save;

/**
 * @export 
 * @return {vec2}
 * @param {vec2} v 
 * @param {Array.<number>} json 
 */
vec2.load;

/**
 * @export 
 * @return {vec2}
 * @param {vec2} v
 * @param {number} x
 * @param {number} y
 */
vec2.set;

/**
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} v
 */
vec2.copy;

/**
 * @export 
 * @return {boolean} 
 * @param {vec2} a 
 * @param {vec2} b 
 * @param {number=} epsilon 
 */
vec2.eq;

/**
 * @export 
 * @return {boolean} 
 * @param {vec2} a 
 * @param {vec2} b 
 * @param {number=} epsilon 
 */
vec2.neq;

/**
 * @export 
 * @return {number}
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.distance;

/**
 * @export 
 * @return {number}
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.dot;

/** 
 * [ a.x, a.y, 0 ] x [ b.x, b.y, 0 ] : z 
 * @export 
 * @return {number}
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.cross;

/** 
 * out = [ v.x, v.y, 0 ] x [ 0, 0, 1 ] : [ x, y ]
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} v
 * @param {number} s
 */
vec2.perp;

/**
 * @export 
 * @return {number}
 * @param {vec2} v
 */
vec2.len;

/**
 * @export 
 * @return {number}
 * @param {vec2} v
 */
vec2.invlen;

/**
 * @export 
 * @return {number}
 * @param {vec2} v
 */
vec2.sqrlen;

/**
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} v
 */
vec2.norm;

/**
 * out = -v
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} v
 */
vec2.neg;

/**
 * out = 1.0 / v
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} v
 */
vec2.inv;

/**
 * out = min(a, b)
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.min;

/**
 * out = max(a, b)
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.max;

/**
 * out = a + b
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.add;

/**
 * out = v + s
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} v
 * @param {number} s
 */
vec2.adds;

/**
 * out = a - b
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.sub;

/**
 * out = v - s
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} v
 * @param {number} s
 */
vec2.subs;

/**
 * out = a * b
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.mul;

/**
 * out = v * s
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} v
 * @param {number} s
 */
vec2.muls;

/**
 * out = a / b
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.div;

/**
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.combine;

/**
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 */
vec2.extract;

/**
 * out = a + (b * s)
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 * @param {number} s
 */
vec2.muls_add;

/** 
 * out = a + ((b - a) * t) 
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 * @param {number} t
 */
vec2.lerp;

/**
 * @typedef {Float32Array}
 */
vec2.array;

/**
 * @export 
 * @return {vec2.array}
 * @param {number} count
 * @param {function(vec2,number,vec2.array):void=} init
 */
vec2.array.make;

/**
 * @export 
 * @return {vec2.array}
 * @param {vec2.array} array
 */
vec2.array.clone;

/**
 * @export 
 * @return {vec2.array}
 * @param {vec2.array} array 
 * @param {number} count 
 * @param {function(vec2,number,vec2.array):void=} init
 */
vec2.array.remake;

/**
 * @export 
 * @return {number}
 * @param {vec2.array} array 
 */
vec2.array.count;

/**
 * @export 
 * @return {vec2} 
 * @param {vec2.array} array 
 * @param {number} index 
 */
vec2.array.valueAt;

/**
 * @export 
 * @return {number} 
 * @param {vec2.array} array 
 * @param {vec2} value 
 */
vec2.array.indexOf;

/**
 * @export 
 * @return {void} 
 * @param {vec2.array} array 
 * @param {function(vec2,number,vec2.array):void} callback
 * @param {number=} start 
 * @param {number=} count 
 */
vec2.array.forEach;

/**
 * @export 
 * @return {boolean} 
 * @param {vec2.array} a 
 * @param {vec2.array} b 
 * @param {number=} epsilon 
 */
vec2.array.eq;

/**
 * @export 
 * @return {boolean} 
 * @param {vec2.array} a 
 * @param {vec2.array} b 
 * @param {number=} epsilon 
 */
vec2.array.neq;

/**
 * out = a + (b * s)
 * @export 
 * @return {vec2.array}
 * @param {vec2.array} out
 * @param {vec2.array} a
 * @param {vec2.array} b
 * @param {number} s
 */
vec2.array.muls_add;

/** 
 * out = a + ((b - a) * t) 
 * @export 
 * @return {vec2}
 * @param {vec2} out
 * @param {vec2} a
 * @param {vec2} b
 * @param {number} t
 */
vec2.array.lerp;

/// bvec2.js

/**
 * @typedef {Int8Array}
 */
var bvec2;

/** 
 * @const 
 * @type {number}
 */
bvec2.ELEMENTS_PER_OBJECT;

/**
 * @export 
 * @return {bvec2}
 * @param {boolean=} x
 * @param {boolean=} y
 */
bvec2.make;

/// ivec2.js

/**
 * @typedef {Int32Array}
 */
var ivec2;

/** 
 * @const 
 * @type {number}
 */
ivec2.ELEMENTS_PER_OBJECT;

/**
 * @export 
 * @return {ivec2}
 * @param {number=} x
 * @param {number=} y
 */
ivec2.make;
