const webpack = require('webpack');
const path = require('path');
// const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: path.join(__dirname, 'client/src/index.jsx'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'client/dist'),
  },
  plugins: [
    new Dotenv(),
    new webpack.EnvironmentPlugin( { ...process.env } )
  ],
  module: {
    rules: [
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
};
