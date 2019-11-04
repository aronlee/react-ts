module.exports = {
    presets: [
      // https://segmentfault.com/a/1190000005112677
      // http://www.2ality.com/2015/12/babel6-loose-mode.html
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
          },
          modules: false,
          loose: true,
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: false,
        },
      ],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      '@babel/plugin-proposal-json-strings',
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true,
        },
      ],
      '@babel/plugin-proposal-function-sent',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-throw-expressions',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-logical-assignment-operators',
      '@babel/plugin-proposal-optional-chaining',
      [
        '@babel/plugin-proposal-pipeline-operator',
        {
          proposal: 'minimal',
        },
      ],
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-do-expressions',
      '@babel/plugin-proposal-function-bind',
    ],
    // Output comments in generated output.
    comments: false,
  }
  