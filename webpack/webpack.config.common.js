const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const reactLoadableTransformer = require('react-loadable-ts-transformer');

const isDevMod = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,

  output: {
    filename: 'js/[name].js',
    path: path.resolve('./public'),
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [reactLoadableTransformer],
          }),
        },
      },

      {
        // test: /\.s?css$/,
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '/dist/',
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      {
        test: /\.(png|svg|jpe?g|gif)$/,
        include: /assets/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
              publicPath: 'assets/',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    isDevMod
      ? new webpack.NamedModulesPlugin()
      : new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
