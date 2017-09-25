import riot from 'rollup-plugin-riot'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import json from 'rollup-plugin-json'

export default {
  input: 'src/js/index.js',
  output: {
  	file: 'dist/script/main.js',
  	format: 'iife'
  },
  // dest: 'dist/script/main.js',
  // format: 'iife',
  sourceMap: false,

  plugins: [
  	json({
  		preferConst: true,
  		indent: ''
  	}),
  	riot(
  	{
  		template: 'pug'
  		// style: 'stylus',
  		// parser: {
  		// 	css: 'stylus'
  		// }
  	}
  	),
  	nodeResolve({ jsnext: true}),
  	commonjs(),
  	buble()
  ]
};