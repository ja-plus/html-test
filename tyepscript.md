* `keyof` 将对象的Key作为联合类型
* 


```typescript
// 根据不同参数返回不同类型
function getData<T extends 'a'|'b'>(type:T):T extends 'a' ? string : string[]{}
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