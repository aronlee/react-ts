/**
 * @typescript-eslint 规则参考
 * https://www.npmjs.com/package/@typescript-eslint/eslint-plugin#supported-rules
 */

module.exports = {
  root: true,

  parser: '@typescript-eslint/parser', // 指定ESLint解析器

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-control-statements/recommended',
    'prettier/react',
    // 使用eslint config prettier禁用@typescript eslint/eslint插件中与prettier冲突的eslint规则
    'prettier/@typescript-eslint',
    // 启用 eslint-plugin-prettier ，并将 prettier 错误显示为eslint错误。确保这始终是扩展数组中的最后一个配置。
    'plugin:prettier/recommended',
  ],

  settings: {
    react: {
      version: 'detect',
    },
  },

  plugins: ['react', 'prettier'],

  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    'jsx-control-statements/jsx-control-statements': true,
  },

  globals: {
    $api: true,
  },

  rules: {
    'no-console': 'off', // 禁用 console
    'no-debugger': 'off', // 禁用 debugger
    'no-alert': 'off', // 禁用 alert
    'multiline-ternary': 0,

    indent: ['off', 2, { SwitchCase: 1 }], // 强制使用两个空格作为缩进
    quotes: ['error', 'single'], //强制使用单引号
    semi: ['error', 'never'], //强制不使用分号结尾
    'comma-dangle': ['error', 'always-multiline'], // 逗号结束
    'no-param-reassign': 'error', // 禁止对 function 的参数进行重新赋值
    'jsx-quotes': ['error', 'prefer-double'], // 强制所有 JSX 属性值使用双引号。
    'prettier/prettier': 'error', // prettier
    'prefer-rest-params': 0,

    'jsx-control-statements/jsx-use-if-tag': 0, // 强制在 jsx 中使用 if 判断
    'jsx-control-statements/jsx-jcs-no-undef': 0,
    '@typescript-eslint/no-explicit-any': 0, // 禁用 any 类型
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-var-requires': 0,
    'react/display-name': 0,
  },
}
