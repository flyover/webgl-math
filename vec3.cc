#include <nan.h>
#include <node.h>
#include <v8.h>

#if NODE_MODULE_VERSION <= NODE_0_12_MODULE_VERSION

#define IS_VEC3(value) (value->IsObject() \
	&& (value.As<v8::Object>()->GetIndexedPropertiesExternalArrayDataType() == v8::kExternalFloatArray) \
	&& (value.As<v8::Object>()->GetIndexedPropertiesExternalArrayDataLength() == 3))
#define GET_VEC3_DATA(value) ((float*) value.As<v8::Object>()->GetIndexedPropertiesExternalArrayData())

#define IS_VEC3_ARRAY(value) (value->IsObject() \
	&& (value.As<v8::Object>()->GetIndexedPropertiesExternalArrayDataType() == v8::kExternalFloatArray) \
	&& ((value.As<v8::Object>()->GetIndexedPropertiesExternalArrayDataLength() % 3) == 0))
#define GET_VEC3_ARRAY_DATA(value) GET_VEC3_DATA(value)
#define GET_VEC3_ARRAY_LENGTH(value) (value.As<v8::Object>()->GetIndexedPropertiesExternalArrayDataLength())

#else

#define IS_VEC3(value) (value->IsFloat32Array() && (value.As<v8::Float32Array>()->Length() == 3))
#define GET_VEC3_DATA(value) (float*)(static_cast<char*>(value.As<v8::Float32Array>()->Buffer()->GetContents().Data()) + value.As<v8::Float32Array>()->ByteOffset())

#define IS_VEC3_ARRAY(value) (value->IsFloat32Array() && ((value.As<v8::Float32Array>()->Length() % 3) == 0))
#define GET_VEC3_ARRAY_DATA(value) GET_VEC3_DATA(value)
#define GET_VEC3_ARRAY_LENGTH(value) (value.As<v8::Float32Array>()->Length())

#endif

namespace node_vec3 {

NAN_METHOD(muls_add)
{
	if (!IS_VEC3(info[0])) return Nan::ThrowError("out not a vec3");
	if (!IS_VEC3(info[1])) return Nan::ThrowError("a not a vec3");
	if (!IS_VEC3(info[2])) return Nan::ThrowError("b not a vec3");
	if (!(info[3]->IsNumber())) return Nan::ThrowError("s not a number");
	float* out = GET_VEC3_DATA(info[0]);
	const float* a = GET_VEC3_DATA(info[1]);
	const float* b = GET_VEC3_DATA(info[2]);
	const float s = (float) info[3]->NumberValue();
	out[0] = a[0] + (s * b[0]);
	out[1] = a[1] + (s * b[1]);
	out[2] = a[2] + (s * b[2]);
	info.GetReturnValue().Set(info[0]);
}

namespace array {

NAN_METHOD(muls_add)
{
	if (!IS_VEC3_ARRAY(info[0])) return Nan::ThrowError("out not a vec3.array");
	if (!IS_VEC3_ARRAY(info[1])) return Nan::ThrowError("a not a vec3.array");
	if (!IS_VEC3_ARRAY(info[2])) return Nan::ThrowError("b not a vec3.array");
	if (!(info[3]->IsNumber())) return Nan::ThrowError("s not a number");
	float* out = GET_VEC3_ARRAY_DATA(info[0]);
	const float* a = GET_VEC3_ARRAY_DATA(info[1]);
	const float* b = GET_VEC3_ARRAY_DATA(info[2]);
	const float s = (float) info[3]->NumberValue();
	const size_t n = GET_VEC3_ARRAY_LENGTH(info[0]);
	for (size_t i = 0; i < n; ++i)
	{
		out[i] = a[i] + (s * b[i]);
	}
	info.GetReturnValue().Set(info[0]);
}

} // namespace array

NAN_MODULE_INIT(init)
{
	Nan::SetMethod(target, "muls_add", muls_add);
	v8::Local<v8::Object> array = Nan::New<v8::Object>();
	Nan::Set(target, Nan::New<v8::String>("array").ToLocalChecked(), array);
	Nan::SetMethod(array, "muls_add", array::muls_add);
}

} // namespace node_vec3

NODE_MODULE(node_vec3, node_vec3::init)
