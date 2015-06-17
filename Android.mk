LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)
LOCAL_MODULE := webgl-math-vec2
LOCAL_C_INCLUDES := $(LOCAL_PATH)/$(subst \,/,$(shell cd $(LOCAL_PATH) && node -e "require('nan')"))
LOCAL_SRC_FILES := vec2.cc
LOCAL_STATIC_LIBRARIES := node
include $(BUILD_STATIC_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE := webgl-math-vec3
LOCAL_C_INCLUDES := $(LOCAL_PATH)/$(subst \,/,$(shell cd $(LOCAL_PATH) && node -e "require('nan')"))
LOCAL_SRC_FILES := vec3.cc
LOCAL_STATIC_LIBRARIES := node
include $(BUILD_STATIC_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE := webgl-math-vec4
LOCAL_C_INCLUDES := $(LOCAL_PATH)/$(subst \,/,$(shell cd $(LOCAL_PATH) && node -e "require('nan')"))
LOCAL_SRC_FILES := vec4.cc
LOCAL_STATIC_LIBRARIES := node
include $(BUILD_STATIC_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE := webgl-math
LOCAL_STATIC_LIBRARIES := webgl-math-vec2
LOCAL_STATIC_LIBRARIES += webgl-math-vec3
LOCAL_STATIC_LIBRARIES += webgl-math-vec4
include $(BUILD_STATIC_LIBRARY)
