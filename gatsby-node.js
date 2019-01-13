exports.onCreateWebpackConfig = ({
    stage,
    rules,
    loaders,
    plugins,
    actions,
  }) => {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /\.s(a|c)ss$/,
            use: [
                {loader: require.resolve('style-loader')},
                {loader: require.resolve('css-loader')}
            ],
          },
        ],
      },
    })
  }