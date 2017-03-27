const webpack = require('webpack');
const path = require('path');
const {resolve, join} = path;

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname ,'app');

module.exports = {
  entry:     `${APP_DIR}/entry.js`,
  output:    {
    path:       BUILD_DIR,
    filename:   'bundle.js',
    publicPath: '/'
  },
  devtool:   'source-map',
  devServer: {
    inline:      true,
    contentBase: BUILD_DIR,
    port:        5000,
    host:        '0.0.0.0'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: ['', 'components', 'node_modules']
  },

  module:    {
    loaders: [
      {
        test: /\.scss/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test:    /\.jsx?$/,
        include: APP_DIR,
        exclude: /(node_modules)|(bower_components)/,
        loader:  'babel-loader',
        query:   {
          presets: ['es2015'],
          plugins: [
            'transform-runtime',
            ['transform-react-jsx', {
              'pragma': 'dom' // default pragma is React.createElement
            }]
          ]
        }
      }
    ]
  }
};
