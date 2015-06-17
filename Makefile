#
# Copyright (c) Flyover Games, LLC
#

SHELL := /usr/bin/env bash

__default__: help

help:
	@echo done $@

GYP ?= gyp
gyp:
	$(GYP) --depth=. -f xcode -DOS=ios --generator-output=./webgl-math-ios webgl-math.gyp
	$(GYP) --depth=. -f xcode -DOS=osx --generator-output=./webgl-math-osx webgl-math.gyp
