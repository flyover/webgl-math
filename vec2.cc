#include <nan.h>
#include <node.h>
#include <v8.h>

#if defined(IOJS_3_0_MODULE_VERSION) && (NODE_MODULE_VERSION >= IOJS_3_0_MODULE_VERSION)

#define IS_VEC2(value) (value->IsFloat32Array() && (value.As<v8::Float32Array>()->Length() == 2))

#define IS_VEC2_ARRAY(value) (value->IsFloat32Array() && (value.As<v8::Float32Array>()->Length() % 2 == 0))

#else

#define IS_VEC2(value) (value->IsObject() \
	&& (value.As<v8::Object>()->GetIndexedPropertiesExternalArrayDataType() == v8::kExternalFloatArray) \
	&& (value.As<v8::Object>()->GetIndexedPropertiesExternalArrayDataLength() == (2 * sizeof(float))))

#define IS_VEC2_ARRAY(value) (value->IsObject() \
	&& (value.As<v8::Object>()->GetIndexedPropertiesExternalArrayDataType() == v8::kExternalFloatArray) \
	&& (value.As<v8::Object>()->GetIndexedPropertiesExternalArrayDataLength() % (2 * sizeof(float)) == 0))

#endif

namespace node_vec2 {

NAN_METHOD(muls_add)
{
	if (!IS_VEC2(info[0])) return Nan::ThrowError("out not a vec2");
	if (!IS_VEC2(info[1])) return Nan::ThrowError("a not a vec2");
	if (!IS_VEC2(info[2])) return Nan::ThrowError("b not a vec2");
	if (!(info[3]->IsNumber())) return Nan::ThrowError("s not a number");
	#if defined(IOJS_3_0_MODULE_VERSION) && (NODE_MODULE_VERSION >= IOJS_3_0_MODULE_VERSION)
	float* out = (float*) info[0].As<v8::Float32Array>()->Buffer()->GetContents().Data();
	const float* a = (const float*) info[1].As<v8::Float32Array>()->Buffer()->GetContents().Data();
	const float* b = (const float*) info[2].As<v8::Float32Array>()->Buffer()->GetContents().Data();
	const float s = (const float) info[3]->NumberValue();
	#else
	float* out = (float*) info[0].As<v8::Object>()->GetIndexedPropertiesExternalArrayData();
	const float* a = (float*) info[1].As<v8::Object>()->GetIndexedPropertiesExternalArrayData();
	const float* b = (float*) info[2].As<v8::Object>()->GetIndexedPropertiesExternalArrayData();
	const float s = (const float) info[3]->NumberValue();
	#endif
	out[0] = a[0] + (s * b[0]);
	out[1] = a[1] + (s * b[1]);
	info.GetReturnValue().Set(info[0]);
}

NAN_METHOD(lerp)
{
	if (!IS_VEC2(info[0])) return Nan::ThrowError("out not a vec2");
	if (!IS_VEC2(info[1])) return Nan::ThrowError("a not a vec2");
	if (!IS_VEC2(info[2])) return Nan::ThrowError("b not a vec2");
	if (!(info[3]->IsNumber())) return Nan::ThrowError("t not a number");
	#if defined(IOJS_3_0_MODULE_VERSION) && (NODE_MODULE_VERSION >= IOJS_3_0_MODULE_VERSION)
	float* out = (float*) info[0].As<v8::Float32Array>()->Buffer()->GetContents().Data();
	const float* a = (const float*) info[1].As<v8::Float32Array>()->Buffer()->GetContents().Data();
	const float* b = (const float*) info[2].As<v8::Float32Array>()->Buffer()->GetContents().Data();
	const float t = (const float) info[3]->NumberValue();
	#else
	float* out = (float*) info[0].As<v8::Object>()->GetIndexedPropertiesExternalArrayData();
	const float* a = (float*) info[1].As<v8::Object>()->GetIndexedPropertiesExternalArrayData();
	const float* b = (float*) info[2].As<v8::Object>()->GetIndexedPropertiesExternalArrayData();
	const float t = (const float) info[3]->NumberValue();
	#endif
	out[0] = a[0] + (t * (b[0] - a[0]));
	out[1] = a[1] + (t * (b[1] - a[1]));
	info.GetReturnValue().Set(info[0]);
}

namespace array {

NAN_METHOD(muls_add)
{
	if (!IS_VEC2_ARRAY(info[0])) return Nan::ThrowError("out not a vec2.array");
	if (!IS_VEC2_ARRAY(info[1])) return Nan::ThrowError("a not a vec2.array");
	if (!IS_VEC2_ARRAY(info[2])) return Nan::ThrowError("b not a vec2.array");
	if (!(info[3]->IsNumber())) return Nan::ThrowError("s not a number");
	#if defined(IOJS_3_0_MODULE_VERSION) && (NODE_MODULE_VERSION >= IOJS_3_0_MODULE_VERSION)
	float* out = (float*) info[0].As<v8::Float32Array>()->Buffer()->GetContents().Data();
	const float* a = (const float*) info[1].As<v8::Float32Array>()->Buffer()->GetContents().Data();
	const float* b = (const float*) info[2].As<v8::Float32Array>()->Buffer()->GetContents().Data();
	const float s = (const float) info[3]->NumberValue();
	const size_t n = info[0].As<v8::Float32Array>()->Length();
	#else
	float* out = (float*) info[0].As<v8::Object>()->GetIndexedPropertiesExternalArrayData();
	const float* a = (float*) info[1].As<v8::Object>()->GetIndexedPropertiesExternalArrayData();
	const float* b = (float*) info[2].As<v8::Object>()->GetIndexedPropertiesExternalArrayData();
	const float s = (const float) info[3]->NumberValue();
	const int n = info[0].As<v8::Object>()->GetIndexedPropertiesExternalArrayDataLength() / sizeof(float);
	#endif
	for (int i = 0; i < n; ++i)
	{
		out[i] = a[i] + (s * b[i]);
	}
	info.GetReturnValue().Set(info[0]);
}

NAN_METHOD(lerp)
{
	if (!IS_VEC2_ARRAY(info[0])) return Nan::ThrowError("out not a vec2.array");
	if (!IS_VEC2_ARRAY(info[1])) return Nan::ThrowError("a not a vec2.array");
	if (!IS_VEC2_ARRAY(info[2])) return Nan::ThrowError("b not a vec2.array");
	if (!(info[3]->IsNumber())) return Nan::ThrowError("t not a number");
	#if defined(IOJS_3_0_MODULE_VERSION) && (NODE_MODULE_VERSION >= IOJS_3_0_MODULE_VERSION)
	float* out = (float*) info[0].As<v8::Float32Array>()->Buffer()->GetContents().Data();
	const float* a = (const float*) info[1].As<v8::Float32Array>()->Buffer()->GetContents().Data();
	const float* b = (const float*) info[2].As<v8::Float32Array>()->Buffer()->GetContents().Data();
	const float t = (const float) info[3]->NumberValue();
	const size_t n = info[0].As<v8::Float32Array>()->Length();
	#else
	float* out = (float*) info[0].As<v8::Object>()->GetIndexedPropertiesExternalArrayData();
	const float* a = (float*) info[1].As<v8::Object>()->GetIndexedPropertiesExternalArrayData();
	const float* b = (float*) info[2].As<v8::Object>()->GetIndexedPropertiesExternalArrayData();
	const float t = (const float) info[3]->NumberValue();
	const int n = info[0].As<v8::Object>()->GetIndexedPropertiesExternalArrayDataLength() / sizeof(float);
	#endif
	for (int i = 0; i < n; ++i)
	{
		out[i] = a[i] + (t * (b[i] - a[i]));
	}
	info.GetReturnValue().Set(info[0]);
}

} // namespace array

NAN_MODULE_INIT(init)
{
	Nan::HandleScope scope;
	Nan::SetMethod(target, "muls_add", muls_add);
	Nan::SetMethod(target, "lerp", lerp);
	v8::Local<v8::Object> array = Nan::New<v8::Object>();
	Nan::Set(target, Nan::New<v8::String>("array").ToLocalChecked(), array);
	Nan::SetMethod(array, "muls_add", array::muls_add);
	Nan::SetMethod(array, "lerp", array::lerp);
}

} // namespace node_vec2

#if NODE_VERSION_AT_LEAST(0,11,0)
NODE_MODULE_CONTEXT_AWARE_BUILTIN(node_vec2, node_vec2::init)
#else
NODE_MODULE(node_vec2, node_vec2::init)
#endif
