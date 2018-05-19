const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')


const DIST = path.resolve(__dirname, 'dist')
const SRC = path.resolve(__dirname, 'src')

module.exports = {
	target: "web",
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		}]
	},

	plugins: [
		new CleanWebpackPlugin(DIST),
		new UglifyJSPlugin()
	],
	entry: {
		jsend: "./src/JSend"
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

	mode: "development"
}