import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import WebpackMd5Hash from "webpack-md5-hash";
import HtmlWebpackPlugin from "html-webpack-plugin";
import autoprefixer from "autoprefixer";
import path from "path";

export default {
	resolve: {
		extensions: ["*", ".js", ".jsx", ".json"]
	},
	devtool: "#source-map",
	entry: {
		vendor: path.resolve(__dirname, "src/vendor"),
		main: path.resolve(__dirname, "src/index")
	},
	target: "web",
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
		filename: "[name].[chunkhash].js"
	},
	plugins: [
		// moment locales - welsh and english only
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /^en-gb|^cy/),

		// Hash the files using MD5 so that their names change when the content changes.
		new WebpackMd5Hash(),

		// Generate an external css file with a hash in the filename
		new ExtractTextPlugin("[name].[contenthash].css"),

		// Use CommonsChunkPlugin to create a separate bundle
		// of vendor libraries so that they"re cached separately.
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor"
		}),

		// add jquery aliases for easier import usage
		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$: "jquery",
			jquery: "jquery"
		}),

		// Create HTML file that includes reference to bundled JS.
		new HtmlWebpackPlugin({
			template: "src/index.html",
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true,
			// Properties you define here are available in index.html
			// using htmlWebpackPlugin.options.varName
			fontAwesomeToken: "b9377f6d6d"
		}),

		// Minify JS
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true
		}),

		// general loader options
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false,
			noInfo: true, // set to false to see a list of every file being bundled.
			options: {
				sassLoader: {
					includePaths: [path.resolve(__dirname, "src", "scss")]
				},
				context: "/",
				postcss: () => [autoprefixer]
			}
		})
	],
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loaders: ["babel-loader"] },
			{ test: /\.css|\.scss$/, loader: ExtractTextPlugin.extract("css-loader?sourceMap!postcss-loader!sass-loader?sourceMap") },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
			{ test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
		]
	}
};
