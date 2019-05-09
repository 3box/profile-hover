const path = require("path");

const createConfig = ({ entry, output, babelOptions = {}, externals = {} }) => ({
  entry,
  output,
  externals,
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

module.exports = (env, argv) => {
  const production = argv.mode === 'production';

  const nonReactConfig = createConfig({
    entry: "./src/widget.js",
    output: {
      filename: "widget.js",
      path: path.resolve(__dirname, "dist")
    },
    babelOptions: {
      presets: ["@babel/preset-env"],
      plugins: [
        ["@babel/plugin-transform-react-jsx", { pragma: "dom" }],
        ["@babel/plugin-transform-runtime", { regenerator: true }],
        ["@babel/plugin-proposal-object-rest-spread"]
      ]
    }
  });

  const reactConfig = createConfig({
    entry: "./src/ProfileHover.jsx",
    output: {
      libraryTarget: "commonjs2",
      filename: "reactBundle.js",
      path: path.resolve(__dirname, "dist")
    },
    babelOptions: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: [
        ["@babel/plugin-transform-react-jsx"],
        ["@babel/plugin-transform-runtime", { regenerator: true }]
      ]
    },
    externals: !production ? undefined : {
      react: "react"
    }
  });

  return [nonReactConfig, reactConfig];
}

