/**
 * svelte eslint config
 * eslint-plugin-svelte:
 * https://ota-meshi.github.io/eslint-plugin-svelte/user-guide/
 * prettier-plugin-svelte option:
 * https://www.npmjs.com/package/prettier-plugin-svelte
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.svelte'],
  },
  parser: '@typescript-eslint/parser',
  plugins: ['html', 'prettier'],
  extends: ['eslint:recommended', 'plugin:svelte/recommended', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
  rules: {
    'prettier/prettier': 1,
    eqeqeq: 1, // 使用 ===
    'dot-notation': 1, // 强制使用.不用[]
    // 'spaced-comment': 1, // 注释斜杠后空格
    'new-cap': 1, // 构造函数首字母大写
    // semi: [1, 'always'], // 使用分号结尾
    // 'space-infix-ops': 1, // 操作符周围空格 // prettier/recommended
    // 'arrow-spacing': 1, // 箭头函数空格 // prettier/recommended
    // 'keyword-spacing': 1, // 关键词空格// prettier/recommended
    // 'no-trailing-spaces': 1, // 禁止尾行空格// prettier/recommended
    // 'object-curly-spacing': [1, 'always'], // 大括号空格{_key: val_} //prettier/recommended
    // 'comma-spacing': 1, // 逗号后空格 //prettier/recommended
    // 'space-before-block': 0, // 块前空格 if()_{} //prettier/recommended
    // 'switch-colon-spacing': 1, // switch -> case 0:_{} //prettier/recommended
    // 'brace-style': 1, // 左大括号不另起一行 //prettier/recommended
    // 'block-spacing': 1, // function () {_aa()_} //prettier/recommended
    // 'key-spacing': 1, // 键值间空格 key:_val
    // 'no-new-object': 1, // 使用字面量创建对象 非new Object()
    // 'object-shorthand': 1, // 对象方法属性值缩写
  },
};
