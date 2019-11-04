module.exports = {
  exclude: /node_modules/,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: true,
        },
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
  comments: false,
}
