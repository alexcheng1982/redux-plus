const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /(test|spec)\.(jsx?|tsx?)$/]
      }
    ]
  },
  resolve: {
    modules: ["node_modules"],
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ReduxPlus',
    libraryTarget: 'umd'
  }
};