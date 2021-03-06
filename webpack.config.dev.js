import webpack from 'webpack';
import path from 'path';

export default {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: false,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    './src/index'
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, "/dist"), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
      // Define environmental variables
      new webpack.DefinePlugin({
          'process.env': {
              API_URL: JSON.stringify(process.env.HIMSS_API_URL) || '"http://localhost"',
              NODE_ENV: JSON.stringify('development')
          }
      })
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      { test: /\.jsx?$/, loader: "babel", exclude: /node_modules/ },
      {test: /\.scss$/, loaders: ["style-loader","css-loader","sass-loader"]},
      {test: /\.json$/, loaders: ["json-loader"]},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=1&root=.&name=images/[name].[ext]'
        }
    ]
  }
};