#include <nan.h>
#include <node.h>
#include <v8.h>

#include <math.h> // fabsf

#if NODE_MODULE_VERSION <= NODE_0_12_MODULE_VERSION

#define IS_VEC2(value) (value->IsObject() \
	&& (value.As<v8::Object>()->GetIndexedPropertiesExternalArrayDataType() == v8::kExternalFloatArray) \
	&& (value.As<v8::Object>()->GetIndexedPropertiesExternalArrayDataLength() == 2))
#define GET_VEC2_DATA(value) ((float*) value.As<v8::Object>()->GetIndexedPropertiesExternalArrayData())

#define IS_VEC2_ARRAY(value) (value->IsObject() \
	&& (value.As<v8::Object>()->GetIndexedPropertiesExternalArrayDataType() == v8::kExternalFloatArray) \
	&& ((value.As<v8::Object>()->GetIndexedPropertiesExternalArrayDataLength() % 2) == 0))
#define GET_VEC2_ARRAY_DATA(value) GET_VEC2_DATA(value)
#define GET_VEC2_ARRAY_LENGTH(value) (value.As<v8::Object>()->GetIndexedPropertiesExternalArrayDataLength())

#else

#define IS_VEC2(value) (value->IsFloat32Array() && (value.As<v8::Float32Array>()->Length() == 2))
#define GET_VEC2_DATA(value) (float*)(static_cast<char*>(value.As<v8::Float32Array>()->Buffer()->GetContents().Data()) + value.As<v8::Float32Array>()->ByteOffset())

#define IS_VEC2_ARRAY(value) (value->IsFloat32Array() && ((value.As<v8::Float32Array>()->Length() % 2) == 0))
#define GET_VEC2_ARRAY_DATA(value) GET_VEC2_DATA(value)
#define GET_VEC2_ARRAY_LENGTH(value) (value.As<v8::Float32Array>()->Length())

#endif

namespace node_vec2 {

NAN_METHOD(muls_add)
{
	if (!IS_VEC2(info[0])) return Nan::ThrowError("out not a vec2");
	if (!IS_VEC2(info[1])) return Nan::ThrowError("a not a vec2");
	if (!IS_VEC2(info[2])) return Nan::ThrowError("b not a vec2");
	if (!(info[3]->IsNumber())) return Nan::ThrowError("s not a number");
	float* out = GET_VEC2_DATA(info[0]);
	const float* a = GET_VEC2_DATA(info[1]);
	const float* b = GET_VEC2_DATA(info[2]);
	const float s = (float) info[3]->NumberValue();
	out[0] = a[0] + (s * b[0]);
	out[1] = a[1] + (s * b[1]);
	info.GetReturnValue().Set(info[0]);
}

namespace array {

NAN_METHOD(eq)
{
	if (!IS_VEC2_ARRAY(info[0])) return Nan::ThrowError("a not a vec2.array");
	if (!IS_VEC2_ARRAY(info[1])) return Nan::ThrowError("b not a vec2.array");
	const float* a = GET_VEC2_ARRAY_DATA(info[0]);
	const float* b = GET_VEC2_ARRAY_DATA(info[1]);
	const size_t an = GET_VEC2_ARRAY_LENGTH(info[0]);
	const size_t bn = GET_VEC2_ARRAY_LENGTH(info[1]);
	if (an != bn)
	{
		info.GetReturnValue().Set(false);
		return;
	}
	if (info[2]->IsNumber())
	{
		const float epsilon = (float) info[2]->NumberValue();
		for (size_t i = 0; i < an; ++i)
		{
			if (fabsf(b[i] - a[i]) > epsilon)
			{
				info.GetReturnValue().Set(false);
				return;			
			}
		}
	}
	else
	{
		for (size_t i = 0; i < an; ++i)
		{
			if (a[i] != b[i])
			{
				info.GetReturnValue().Set(false);
				return;			
			}
		}
	}
	info.GetReturnValue().Set(true);
}

NAN_METHOD(muls_add)
{
	if (!IS_VEC2_ARRAY(info[0])) return Nan::ThrowError("out not a vec2.array");
	if (!IS_VEC2_ARRAY(info[1])) return Nan::ThrowError("a not a vec2.array");
	if (!IS_VEC2_ARRAY(info[2])) return Nan::ThrowError("b not a vec2.array");
	if (!(info[3]->IsNumber())) return Nan::ThrowError("s not a number");
	float* out = GET_VEC2_ARRAY_DATA(info[0]);
	const float* a = GET_VEC2_ARRAY_DATA(info[1]);
	const float* b = GET_VEC2_ARRAY_DATA(info[2]);
	const float s = (float) info[3]->NumberValue();
	const size_t n = GET_VEC2_ARRAY_LENGTH(info[0]);
	for (size_t i = 0; i < n; ++i)
	{
		out[i] = a[i] + (s * b[i]);
	}
	info.GetReturnValue().Set(info[0]);
}

} // namespace array

NAN_MODULE_INIT(init)
{
	Nan::Export(target, "muls_add", muls_add);

	v8::Local<v8::Object> array = Nan::New<v8::Object>();
	Nan::Set(target, Nan::New<v8::String>("array").ToLocalChecked(), array);
	Nan::Export(array, "eq", array::eq);
	Nan::Export(array, "muls_add", array::muls_add);
}

} // namespace node_vec2

#if 0 //NODE_VERSION_AT_LEAST(0,11,0)
NODE_MODULE_CONTEXT_AWARE_BUILTIN(node_vec2, node_vec2::init)
#else
NODE_MODULE(node_vec2, node_vec2::init)
#endif
