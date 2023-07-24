# TypeScript Note
避免使用export default, [export default 被认为是有害的](https://jkchao.github.io/typescript-book-chinese/tips/avoidExportDefault.html#commonjs-%E4%BA%92%E7%94%A8)
## 问题
* d.ts中declare 的interface会被eslint标记为未定义，如何解决。取消eslint检查d.ts文件
## 笔记
* `keyof` 将对象的Key作为联合类型
* `typeof` 获得某一变量的类型
* `infer` 推导类型。必须跟在 `extends` 后,且一定在三元运算中。 eg: type getIntersection<&lt;T&gt; = T extends (a: infer P,b: infer P) =&gt; void ? P : never;
* `is`
  ```ts
  function isString(s: unknown): s is string {
    return typeof s === 'string';//如果为true则说明s为string,下面方法就可以推断出类型
  }
  // 判断参数是否为字符串,是在调用转大写方法
  function ifUpperCase(str: unknown) {
    if (isString(str)) {
      str.toUpperCase(); // 可推断类型
    }
  }
  ```
