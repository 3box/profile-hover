const path = require("path");

module.exports = {
  entry: "./example/react/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "example", "react")
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        resolve: {
          extensions: [".js", ".jsx"]
        },
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                ["@babel/plugin-transform-modules-commonjs"],
                ["@babel/plugin-transform-react-jsx"],
                ["@babel/plugin-transform-runtime", { regenerator: true }]
              ]
            }
          }
        ]
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
  }
};

