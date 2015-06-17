#include <nan.h>
#include <node.h>
#include <v8.h>

#define IS_VEC3(value) (value->IsObject() \
	&& (value.As<v8::Object>()->GetIndexedPropertiesExternalArrayDataType() == v8::kExternalFloatArray) \
	&& (value.As<v8::Object>()->GetIndexedPropertiesExternalArrayDataLength() == (3 * sizeof(float))))

#define IS_VEC3_ARRAY(value) (value->IsObject() \
	&& (value.As<v8::Object>()->GetIndexedPropertiesExternalArrayDataType() == v8::kExternalFloatArray) \
	&& (value.As<v8::Object>()->GetIndexedPropertiesExternalArrayDataLength() % (3 * sizeof(float)) == 0))

namespace node_vec3 {

NAN_METHOD(muls_add)
{
	NanScope();
	if (!IS_VEC3(args[0])) return NanThrowError("out not a vec3");
	if (!IS_VEC3(args[1])) return NanThrowError("a not a vec3");
	if (!IS_VEC3(args[2])) return NanThrowError("b not a vec3");
	if (!(args[3]->IsNumber())) return NanThrowError("s not a number");
	float* out = (float*) args[0].As<v8::Object>()->GetIndexedPropertiesExternalArrayData();
	const float* a = (float*) args[1].As<v8::Object>()->GetIndexedPropertiesExternalArrayData();
	const float* b = (float*) args[2].As<v8::Object>()->GetIndexedPropertiesExternalArrayData();
	const float s = (float) args[3]->NumberValue();
	out[0] = a[0] + (s * b[0]);
	out[1] = a[1] + (s * b[1]);
	out[2] = a[2] + (s * b[2]);
	NanReturnValue(args[0]);
}

namespace array {

NAN_METHOD(muls_add)
{
	NanScope();
	if (!IS_VEC3_ARRAY(args[0])) return NanThrowError("out not a vec3.array");
	if (!IS_VEC3_ARRAY(args[1])) return NanThrowError("a not a vec3.array");
	if (!IS_VEC3_ARRAY(args[2])) return NanThrowError("b not a vec3.array");
	if (!(args[3]->IsNumber())) return NanThrowError("s not a number");
	float* out = (float*) args[0].As<v8::Object>()->GetIndexedPropertiesExternalArrayData();
	const float* a = (float*) args[1].As<v8::Object>()->GetIndexedPropertiesExternalArrayData();
	const float* b = (float*) args[2].As<v8::Object>()->GetIndexedPropertiesExternalArrayData();
	const float s = (float) args[3]->NumberValue();
	const int n = args[0].As<v8::Object>()->GetIndexedPropertiesExternalArrayDataLength() / sizeof(float);
	for (int i = 0; i < n; ++i)
	{
		out[i] = a[i] + (s * b[i]);
	}
	NanReturnValue(args[0]);
}

} // namespace array

#if NODE_VERSION_AT_LEAST(0,11,0)
void init(v8::Handle<v8::Object> exports, v8::Handle<v8::Value> module, v8::Handle<v8::Context> context)
#else
void init(v8::Handle<v8::Object> exports/*, v8::Handle<v8::Value> module*/)
#endif
{
	NanScope();
	NODE_SET_METHOD(exports, "muls_add", muls_add);
	v8::Local<v8::Object> array = NanNew<v8::Object>();
	exports->Set(NanNew<v8::String>("array"), array);
	NODE_SET_METHOD(array, "muls_add", array::muls_add);
}

} // namespace node_vec3

#if NODE_VERSION_AT_LEAST(0,11,0)
NODE_MODULE_CONTEXT_AWARE_BUILTIN(node_vec3, node_vec3::init)
#else
NODE_MODULE(node_vec3, node_vec3::init)
#endif

