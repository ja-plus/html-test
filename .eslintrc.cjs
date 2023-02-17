/** vue2 eslint config*/
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true, // vue2.7
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['html', 'vue', 'prettier', '@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 1,
    'vue/multi-word-component-names': 1, // 组件名称多个字符，更改为1警告
    '@typescript-eslint/no-empty-function': 1, // 不能有空方法，改为1警告
    '@typescript-eslint/no-var-requires': 0, // 解决vue.config.js中require语法的报错
    '@typescript-eslint/no-unused-vars': [1, { argsIgnorePattern: 'h' }], // 用于取消tsx,jsx 渲染函数render(h) 中提示形参h未使用的问题
    // 'spaced-comment': 1, // 注释斜杠后空格
    eqeqeq: 1, // 使用 ===
    'dot-notation': 1, // 强制使用.不用[]
    // 'no-debugger': 0,
    // 'no-console': 0,
    // 'no-undef': 0,
    'no-new-object': 1, // 使用字面量创建对象 非new Object()
    'object-shorthand': 1, // 对象方法属性值缩写
  },
};
