import webpack from 'webpack'
import _debug from 'debug'
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import WebpackMd5Hash from 'webpack-md5-hash'

import isomorphicToolsConfig from './isomorphic.tools.config'
import projectConfig, { paths } from '../config'

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicToolsConfig)
const debug = _debug('app:webpack:config:prod')
const srcDir = paths('src')
const cssLoaderOptions = (sass = false) => {
  const options = [
    'modules',
    'sourceMap',
    'localIdentName=[name]__[local]___[hash:base64:5]'
  ]

  options.push(
    !sass ? 'importLoaders=1' : 'importLoaders=2'
  )

  return options.join('&')
}
const scssLoaderOptions = [
  'outputStyle?',
  'expanded',
  'sourceMap',
].join('&')
const {
  VENDOR_DEPENDENCIES,
  __CLIENT__,
  __SERVER__,
  __DEV__,
  __PROD__
} = projectConfig

debug('Create configuration.')
const config = {
  context: paths('base'),
  devtool: 'source-map',
  entry: {
    app: paths('entryApp'),
    vendor: VENDOR_DEPENDENCIES
  },
  output: {
    path: paths('dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      'src',
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: [srcDir],
      },
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        include: [srcDir],
        options: {
          cacheDirectory: true,
        }
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.css$/,
        include: [srcDir],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: `css-loader?${cssLoaderOptions()}!postcss-loader`
        })
      },
      {
        test: /\.scss$/,
        include: [srcDir],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: `css-loader?${cssLoaderOptions(true)}!postcss-loader!sass-loader?${scssLoaderOptions}`
        })
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      }
    ],
  },
  plugins: [
    // https://webpack.js.org/guides/migrating/#uglifyjsplugin-minimize-loaders
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new CleanWebpackPlugin(['readyToDeploy/static/dist', 'webpack-assets.json'], {
      root: paths('base')
    }),
    new ExtractTextPlugin({ filename: '[name].[contenthash].css', disable: false, allChunks: true }),
    new webpack.DefinePlugin({
      __CLIENT__,
      __SERVER__,
      __DEV__,
      __PROD__
    }),

    // optimizations
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        sequences: true,
        dead_code: true,
        drop_debugger: true,
        comparisons: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        drop_console: true
      },
      output: {
        comments: false
      },
      sourceMap: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 2,
    }),
    new WebpackMd5Hash(),
    webpackIsomorphicToolsPlugin
  ]
}

export default config
