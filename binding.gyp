{
	'targets':
	[
		{
			'target_name': "vec2",
			'include_dirs': [ "<!(node -e \"require('nan')\")" ],
			'sources': [ "vec2.cc" ]
		},
		{
			'target_name': "vec3",
			'include_dirs': [ "<!(node -e \"require('nan')\")" ],
			'sources': [ "vec3.cc" ]
		},
		{
			'target_name': "vec4",
			'include_dirs': [ "<!(node -e \"require('nan')\")" ],
			'sources': [ "vec4.cc" ]
		}
	]
}
