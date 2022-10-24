/** vue3 eslint config*/
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['html', 'vue', 'prettier'],
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 1,
    'prefer-const': 1, // 未重新赋值的变量自动转换成const
    'spaced-comment': 1, // 注释斜杠后空格
    'new-cap': 1, // 构造函数首字母大写
    'no-unused-vars': [1, { argsIgnorePattern: 'h' }], // 用于取消jsx 渲染函数render(h) 中提示形参h未使用的问题
    eqeqeq: 1, // 使用 ===
    'dot-notation': 1, // 强制使用.不用[]
    // 'no-debugger': 0,
    // 'no-console': 0,
    'no-new-object': 1, // 使用字面量创建对象 非new Object()
    'object-shorthand': 1, // 对象方法属性值缩写
  },
};
