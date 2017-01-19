var webpack = require('webpack');

module.exports = {
  entry: './src/index',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
  },
  externals: [{
    preact: {
      root: 'preact',
      commonjs2: 'preact',
      commonjs: 'preact',
      amd: 'preact'
    }
  }],
  output: {
    filename: 'dist/ReactDnD.min.js',
    libraryTarget: 'umd',
    library: 'ReactDnD'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};
