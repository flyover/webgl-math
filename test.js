/**
 * Copyright (c) Flyover Games, LLC
 */

var epsilon = 1e-3;

var assert = function (c)
{
	if (!c)
	{
		throw new Error();
	}
}

var vec2 = require('webgl-math/vec2');

var count = 1024*128;

var out = vec2.array.make(count);
var pos = vec2.array.make(count, vec2.random);
var vel = vec2.array.make(count, vec2.random);
var dt = 1 / 60;

var t1 = process.hrtime();
vec2.array.forEach(out, function (value, index, array)
{
	// value : vec2.array.valueAt(array, index)
	// array : out
	vec2.muls_add(value, vec2.array.valueAt(pos, index), vec2.array.valueAt(vel, index), dt);
});
t1 = process.hrtime(t1);
console.log("vec2.array.forEach(vec2.muls_add)", t1);

var tmp = vec2.array.clone(out);
assert(vec2.array.eq(tmp, out));

var t2 = process.hrtime();
vec2.array.muls_add(out, pos, vel, dt);
t2 = process.hrtime(t2);
console.log("vec2.array.muls_add", t2, (t1[1]/t2[1]).toFixed(2), "times faster");

assert(vec2.array.eq(tmp, out, epsilon));

var node_vec2 = require('./build/Release/vec2');
var t3 = process.hrtime();
node_vec2.array.muls_add(out, pos, vel, dt);
t3 = process.hrtime(t3);
console.log("node_vec2.array.muls_add", t3, (t1[1]/t3[1]).toFixed(2), "times faster");

assert(vec2.array.eq(tmp, out, epsilon));

//vec2.array.forEach(out, function (value, index) { console.log(index, value[0], value[1]); });

out = vec2.array.remake(out, count * 2, function (value, index)
{
	if (index === count) { value[0] = 42.0; }
});

//vec2.array.forEach(out, function (value, index) { console.log(index, value[0], value[1]); });

assert(vec2.array.count(out) == count * 2);
assert(vec2.array.valueAt(out, count)[0] === 42.0);

out = vec2.array.remake(out, count / 2);

assert(vec2.eq(vec2.array.valueAt(tmp, 0), vec2.array.valueAt(out, 0)));

vec2.array.forEach(out, function (value, index, array)
{
	assert(vec2.array.indexOf(array, value) === index);
});

/// vec2

var vec2 = require('webgl-math/vec2');

for (var i = 0; i < 100; ++i)
{
	var a = vec2.random(vec2.make());
	var b = vec2.random(vec2.make());
	var c = vec2.random(vec2.make());

	var ab = vec2.combine(vec2.make(), a, b);
	var bc = vec2.combine(vec2.make(), b, c);
	var abc = vec2.combine(vec2.make(), ab, c);

	var tb = vec2.extract(vec2.make(), ab, a);
	assert(vec2.eq(b, tb, epsilon));

	var tc = vec2.extract(vec2.make(), abc, ab);
	assert(vec2.eq(c, tc, epsilon));

	var tbc = vec2.extract(vec2.make(), abc, a);
	assert(vec2.eq(bc, tbc, epsilon));
}

/// vec3

var vec3 = require('webgl-math/vec3');

for (var i = 0; i < 100; ++i)
{
	var a = vec3.random(vec3.make());
	var b = vec3.random(vec3.make());
	var c = vec3.random(vec3.make());

	var ab = vec3.combine(vec3.make(), a, b);
	var bc = vec3.combine(vec3.make(), b, c);
	var abc = vec3.combine(vec3.make(), ab, c);

	var tb = vec3.extract(vec3.make(), ab, a);
	assert(vec3.eq(b, tb, epsilon));

	var tc = vec3.extract(vec3.make(), abc, ab);
	assert(vec3.eq(c, tc, epsilon));

	var tbc = vec3.extract(vec3.make(), abc, a);
	assert(vec3.eq(bc, tbc, epsilon));
}

/// vec4

var vec4 = require('webgl-math/vec4');

for (var i = 0; i < 100; ++i)
{
	var a = vec4.random(vec4.make());
	var b = vec4.random(vec4.make());
	var c = vec4.random(vec4.make());

	var ab = vec4.combine(vec4.make(), a, b);
	var bc = vec4.combine(vec4.make(), b, c);
	var abc = vec4.combine(vec4.make(), ab, c);

	var tb = vec4.extract(vec4.make(), ab, a);
	assert(vec4.eq(b, tb, epsilon));

	var tc = vec4.extract(vec4.make(), abc, ab);
	assert(vec4.eq(c, tc, epsilon));

	var tbc = vec4.extract(vec4.make(), abc, a);
	assert(vec4.eq(bc, tbc, epsilon));
}

/// quat

var quat = require('webgl-math/quat');

for (var i = 0; i < 100; ++i)
{
	var a = quat.random(quat.make());
	var b = quat.random(quat.make());
	var c = quat.random(quat.make());

	var ab = quat.combine(quat.make(), a, b);
	var bc = quat.combine(quat.make(), b, c);
	var abc = quat.combine(quat.make(), ab, c);

	var tb = quat.extract(quat.make(), ab, a);
	assert(quat.eq(b, tb, epsilon));

	var tc = quat.extract(quat.make(), abc, ab);
	assert(quat.eq(c, tc, epsilon));

	var tbc = quat.extract(quat.make(), abc, a);
	assert(quat.eq(bc, tbc, epsilon));
}

/// mat2

var mat2 = require('webgl-math/mat2');

for (var i = 0; i < 100; ++i)
{
	var a = mat2.random(mat2.make());
	var b = mat2.random(mat2.make());
	var c = mat2.random(mat2.make());

	var ab = mat2.combine(mat2.make(), a, b);
	var bc = mat2.combine(mat2.make(), b, c);
	var abc = mat2.combine(mat2.make(), ab, c);

	var tb = mat2.extract(mat2.make(), ab, a);
	assert(mat2.eq(b, tb, epsilon));

	var tc = mat2.extract(mat2.make(), abc, ab);
	assert(mat2.eq(c, tc, epsilon));

	var tbc = mat2.extract(mat2.make(), abc, a);
	assert(mat2.eq(bc, tbc, epsilon));
}

/// mat3

var mat3 = require('webgl-math/mat3');

for (var i = 0; i < 100; ++i)
{
	var a = mat3.random_space(mat3.make());
	var b = mat3.random_space(mat3.make());
	var c = mat3.random_space(mat3.make());

	var ab = mat3.combine(mat3.make(), a, b);
	var bc = mat3.combine(mat3.make(), b, c);
	var abc = mat3.combine(mat3.make(), ab, c);

	var tb = mat3.extract(mat3.make(), ab, a);
	assert(mat3.eq(b, tb, epsilon));

	var tc = mat3.extract(mat3.make(), abc, ab);
	assert(mat3.eq(c, tc, epsilon));

	var tbc = mat3.extract(mat3.make(), abc, a);
	assert(mat3.eq(bc, tbc, epsilon));
}

/// mat4

var mat4 = require('webgl-math/mat4');

for (var i = 0; i < 100; ++i)
{
	var a = mat4.random_space(mat4.make());
	var b = mat4.random_space(mat4.make());
	var c = mat4.random_space(mat4.make());

	var ab = mat4.combine(mat4.make(), a, b);
	var bc = mat4.combine(mat4.make(), b, c);
	var abc = mat4.combine(mat4.make(), ab, c);

	var tb = mat4.extract(mat4.make(), ab, a);
	assert(mat4.eq(b, tb, epsilon));

	var tc = mat4.extract(mat4.make(), abc, ab);
	assert(mat4.eq(c, tc, epsilon));

	var tbc = mat4.extract(mat4.make(), abc, a);
	assert(mat4.eq(bc, tbc, epsilon));
}

