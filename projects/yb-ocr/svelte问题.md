# class 传递问题
```html
<main>
    <BeButton class="button">
</main>
```
这个class子组件外层元素会加上此class，但不能被父元素的style标签中定义的.button 类影响，且会报错。
# {#each} 指令遍历组件，则组件都不是唯一的实例
# div 等元素，不支持on:click,需要在同一个元素上面添加on:keypress