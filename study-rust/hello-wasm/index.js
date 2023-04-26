import init, { initSync, greet, sub_data, cpu_calc, fib as rust_fib, parse_json, add,add_range } from './pkg/hello_wasm.js';
init().then(() => {
    /** 这样调用无法传参,接收返回 */
    // let res = module.greet('esmodule');
    // console.log('greet res', res);
    // 正确方式
    let res = greet('异步初始化wasm');
    console.log(res);
    let person = new Array(10000).fill(0).map((it) => {
        return { id: Math.random() * 10000, "name": "Jake", "age": 10 }
    });
    let person2 = structuredClone(person);

    console.time('stringify cost')
    let personStr = JSON.stringify(person)
    console.timeEnd('stringify cost')

    console.time('rust alter');
    let result = parse_json(personStr);
    console.timeEnd('rust alter');

    console.time('js sort');
    person2.sort((a, b) => a.id - b.id)
    console.timeEnd('js sort');
    // console.log('person2', person2)

    /* 模拟订阅*/
    // sub_data();
    // console.time('rust cpu');
    // cpu_calc(1000000);
    // console.timeEnd('rust cpu');

    // console.time('js cpu');
    // cpuCalc(1000000);
    // console.timeEnd('js cpu');
    // console.time('rust while fib cpu');
    // res = rust_fib(40);
    // console.log('rust while fib result:', res);
    // console.timeEnd('rust while fib cpu');

    // console.log('-----------');

    // console.time('rust recursion fib cpu');
    // res = rust_fib_recursion(40);
    // console.log('rust recursion fib result:', res);
    // console.timeEnd('rust recursion fib cpu');

    // console.log('-----------');

    // console.time('js while fib cpu');
    // res = fib(40);
    // console.log('js while fib result:', res);
    // console.timeEnd('js while fib cpu');

    // console.log('-----------');

    // console.time('js recursion fib cpu');
    // res = fibRecursion(40);
    // console.log('js recursion fib result:', res);
    // console.timeEnd('js recursion fib cpu');

    // console.log('-----------');
    console.time('rust add');
    // console.log('rust add',add(0.1,0.2));
    console.log('rust add',add_range(0,1_000_000_000));
    console.timeEnd('rust add');
    console.time('js add');
    // console.log('js add',0.1 + 0.2);
    let num = 0;
    for(let i = 0;i<1_000_000_000;i++){
        num += i;
    }
    console.log('js add', num);
    console.timeEnd('js add');
});
/** 执行run后，该方法会被rust调用*/
window.getData = function (str) {
    console.log('receive rust call func', str);
};

// initSync(); // 不会用
// greet('同步初始化wasm');
/** 返回最大的质数*/
function cpuCalc(num) {
    // let resultArr = [];
    let result = 0;
    for (let i = 2; i < num; i++) {
        let flag = true;
        for (let j = 2; j < Math.sqrt(i); j++) {
            if (i % j === 0) {
                flag = false;
                break;
            }
        }
        if (flag) {
            // resultArr.push(i);
            result = i;
        }
    }
    // console.log(resultArr.join(','));
    console.log('js素数：', result);
}
/** 斐波那契数列*/
function fib(num) {
    let result = 0;
    for (let i = 1; i < num; i++) {
        let num1 = 1;
        let num2 = 1;
        let j = 1;
        while (j < i) {
            j += 1;
            let temp = num2;
            num2 = num1 + num2;
            num1 = temp;
            result = num2;
        }
    }
    return result;
}