const path = require("path");

const createConfig = ({ entry, output, babelOptions }) => ({
  entry,
  output,
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
              ...babelOptions
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
});

const nonReactConfig = createConfig({
  entry: "./src/widget.js",
  output: {
    filename: "widget.js",
    path: path.resolve(__dirname, "dist")
  },
  babelOptions: {
    presets: ["@babel/preset-env"],
    plugins: [
      ["@babel/plugin-syntax-jsx"],
      ["@babel/plugin-transform-react-jsx", { pragma: "dom" }],
      ["@babel/plugin-transform-runtime", { regenerator: true }],
      ["@babel/plugin-proposal-object-rest-spread"]
    ]
  }
});

const reactConfig = createConfig({
  entry: "./src/ProfileHover.jsx",
  output: {
    library: "ProfileHover",
    libraryTarget: "umd",
    filename: "reactBundle.js",
    path: path.resolve(__dirname, "dist")
  },
  babelOptions: {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [
      ["@babel/plugin-transform-react-jsx"],
      ["@babel/plugin-transform-runtime", { regenerator: true }]
    ]
  }
});


const exampleConfig = createConfig({
  entry: "./example/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "example")
  },
  babelOptions: {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [
      ["@babel/plugin-transform-react-jsx"],
      ["@babel/plugin-transform-runtime", { regenerator: true }]
    ]
  }
});

module.exports = [nonReactConfig, reactConfig, exampleConfig];
