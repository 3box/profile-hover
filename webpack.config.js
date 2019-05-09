const path = require("path");

const createConfig = ({ target, entry, output, babelOptions = {}, externals = {} }) => ({
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
          extensions: getExtensions(target)
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

const getExtensions = (target) => {
  const extensions = [".js", ".jsx"];

  if (!target) {
    return extensions;
  }

  return extensions
    .map(extension => `_${target}${extension}`)
    .concat(extensions);
}

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
    target: "react",
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

