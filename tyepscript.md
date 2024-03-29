## 问题
* d.ts中declare 的interface会被eslint标记为未定义，如何解决
## 笔记
* `keyof` 将对象的Key作为联合类型
* `typeof` 获得某一变量的类型
* `infer` 推导类型。必须跟在 `extends` 后,且一定在三元运算中。 eg: type getIntersection<T> = T extends (a: infer P,b: infer P) => void ? P : never;
## 内置类型
* Parameter 获取函数参数类型
* ReturnType 获取函数的返回值类型
* Omit 去除对象中的指定字段
* Pick 与Omit相反
* Exclude 去联合类型中的个别类型
* Extract 与Exclude相反
* Partial 字段全部转换为可选 k?:v
## never类型
使用 never 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码<br>
具有 never 返回类型的函数永不返回。它也不返回 undefined。该函数没有正常完成，这意味着它可能会抛出异常或根本无法退出执行<br>
任意类型与 never 交叉都得到 never。string & never => never
```typescript
type Foo = string | number;
function controlFlowAnalysisWithNever(foo: Foo) {
  if(typeof foo === "string") {
    // 这里 foo 被收窄为 string 类型
  } else if(typeof foo === "number") {
    // 这里 foo 被收窄为 number 类型
  } else {
    // foo 在这里是 never
    const check: never = foo;
  }
}
```
### 从另一个类型中获取类型
```typescript
type A = {name: string};
type B = A["name"]; // string
```
### 初始化对象为{}的方式
```typescript
type A ={
  name: string,
  age: number
}
let a: Partial<A> = {};
let b: A | Record<string, never> = {}
```
### 指定方法的this类型
```ts
type Person = {name: string, age: number}
function a(this: Person, val: string){
  this // type
}
a('string') // error
a.call({name:'a',age:1},'string') // ✔
```
### d.ts 中import from其他类型会导致该全局声明文件失效
### 遍历/获取对象
```ts
function test (foo: object) {
  for (let key in foo) {
    console.log(foo[key]); // typescript错误提示 key的类型为string
  }
  // 解决办法
  let key:keyof typeof foo; // typeof foo = object
  for(key in foo){}
}
Object.keys(obj:object); // 返回的是string[]类型
// 解决办法
Object.keys(obj:object).forEach(key => {
    obj[key as keyof typeof obj]
});
```
```typescript
// 根据不同参数返回不同类型
function getData<T extends 'a'|'b'>(type:T):T extends 'a' ? string : string[]{}
// type 加默认值则会有问题，因为是运行时类型，如何解决？
```

### 想要指定对象的key为在某一联合类型中
```typescript
interface A {
    [K: 'name' | 'id']:string; // 报错
    [K: keyof Other]:string; // 报错
}
type A = {
    [K in 'name' | 'id']:string; // 通过
    [K: keyof Other]:string; // 通过
}
```
### interface 中不能使用 [K: string]?:
```typescript
interface A {
    [K: string]?:string; // 报错
}
```

### Distributive Conditional Types
```ts
type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>; // =>  ToArray<string> | ToArray<number>;
```

### boolean 转换number类型推断有误???
```ts
let a: 0 | 1 = +true// +boolean 结果为number，类型校验不通过
```