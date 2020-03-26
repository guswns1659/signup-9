const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",
  entry: { join: "./js/join/join.js" },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name]_bundle.js"
  },
  module: {
    rules: [
      //{ test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["last 2 versions"]
                  }
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader'
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './html/join.html'

    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
      //filename: 'css/[name].css'
    })
  ]
};
