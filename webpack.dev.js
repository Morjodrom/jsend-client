const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')


const DIST = path.resolve(__dirname, 'dist')
const SRC = path.resolve(__dirname, 'src')
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
process.env.DEBUG = IS_DEVELOPMENT

const SLOW_AND_ACCURATE_SOURCE = 'source-map'
const FAST_SOURCE = 'cheap-module-eval-source-map '


module.exports = {
	target: "web",
	devtool: false,
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		}]
	},

	plugins: [
		new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG']),
		new CleanWebpackPlugin(DIST),
		// new UglifyJSPlugin()
	],
	entry: {
		jsend: "./src/JSend.js"
	},
	output: {
		filename: '[name].js',
		path: DIST,
		library: 'jsend-client',
		libraryTarget: "umd"
	},
	resolve: {
		modules: [
			SRC,
			"node_modules"
		]
	},

	watch: IS_DEVELOPMENT,

	mode: process.env.NODE_ENV
}