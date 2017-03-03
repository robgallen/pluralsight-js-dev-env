import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
	resolve: {
		extensions: ["*", ".js", ".jsx", ".json"]
	},
	devtool: "#inline-source-map",
	entry: [
		path.resolve(__dirname, "src/index")
	],
	target: "web",
	output: {
		path: path.resolve(__dirname, "src"),
		publicPath: "/",
		filename: "app-bundle.js"
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: false,
			debug: true,
			noInfo: true // set to false to see a list of every file being bundled.
		}),
		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$: "jquery",
			jquery: "jquery"
		}),
		// Create HTML file that includes reference to bundled JS.
		new HtmlWebpackPlugin({
			template: "src/index.html",
			inject: true,
			// Properties you define here are available in index.html
			// using htmlWebpackPlugin.options.varName
			fontAwesomeToken: "96656064f0"
		})
	],
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loaders: ["babel-loader"] },
			{ test: /\.css$/, loaders: ["style-loader", "css-loader"] },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
			{ test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
		]
	}
};
