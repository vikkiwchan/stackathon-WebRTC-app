module.exports = {
  entry: ['./client/index.js'],
  output: {
    path: __dirname,
    filename: './public/main.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        use: { loader: 'babel-loader' },
      },
    ],
  },
};
