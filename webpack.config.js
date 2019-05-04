const path = require('path');

module.exports = {
  entry: './src/widget.js',
  output: {
    filename: 'widget.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        resolve: {
          extensions: ['.js', '.jsx']
        },
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-syntax-jsx'],
              ['@babel/plugin-transform-react-jsx', { pragma: 'dom' }],
              ['@babel/plugin-transform-runtime', { regenerator: true }],
              ['@babel/plugin-proposal-object-rest-spread']
            ]
          }
        }
      },
      {
      test: /\.less$/,
      use: [
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            modules: true,
            localIdentName: "threeboxProfileHover__[name]_[local]"
          }
        },
        {
          loader: "less-loader"
        }
      ]
    }
    ]
  },
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
