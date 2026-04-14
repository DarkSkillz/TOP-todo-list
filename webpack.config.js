import HtmlWebpackPlugin from "html-webpack-plugin"
import path from "node:path"

export default {
    mode: "development",
    entry: "./src/app.js",
    output: {
        filename: "main.js",
        path: path.resolve(import.meta.dirname, "dist"),
        clean: true
    },
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/index.html"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader","css-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            },
            {
                test: /\.html$/i,
                use: ["html-loader"]
            }
        ]
    },
    infrastructureLogging: {
        level: "warn"
    }
}