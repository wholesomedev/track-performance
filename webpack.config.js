/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const webpack = require('webpack');
const slsw = require('serverless-webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const { mapValues } = require('lodash');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ifProd } = require('./env');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, '.webpack'),
    filename: '[name].js',
  },
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /.ts$/i,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    // @ts-ignore
    new CopyWebpackPlugin([
      {
        from: 'secrets/**',
        to: '.',
      },
    ]),
    new webpack.WatchIgnorePlugin([/node_modules/]),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(
      mapValues(
        {
          'process.env.NODE_ENV': process.env.NODE_ENV,
        },
        v => JSON.stringify(v),
      ),
    ),
    ...ifProd([new BabelMinifyPlugin()]),
  ],
  externals: [nodeExternals()],
};