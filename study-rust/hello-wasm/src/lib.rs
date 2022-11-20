extern crate wasm_bindgen;

use std::str;
use wasm_bindgen::prelude::*;
// use std::num; // 开平方根方法

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: &str);
    // 告诉rust 想要调用外部定义的函数。这些函数定义在window上。
    pub fn alert(s: &str);
    // js 定义在window上的方法
    pub fn getData(data: String);

}
/**window.console.log() */
fn console_log(s: &str) {
    log(&format!("RustLog:{}", s));
}

//表示这个函数可以被js调用,export greet
#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    let log_string = &format!("Hello, {}!", name);
    // alert(&format!("Hello, {}!", name));
    console_log(log_string);
    String::from("res data")
}

#[wasm_bindgen]
pub fn sub_data() {
    for i in 0..4 {
        println!("rust println {:?}", i);
        getData(i.to_string());
    }
}

/**素数，进行cpu密集任务 */
#[wasm_bindgen]
pub fn cpu_calc(count: i32) {
    // let mut result: Vec<i16> = vec![];
    let mut result = 1;
    // 计算多少数字下
    for i in 2..count {
        let num: f64 = i as f64;
        let after_sqrt = num.sqrt() as i32 + 1;
        let mut flag = true;

        for j in 2..after_sqrt {
            let dividing = i % j;
            if dividing == 0 {
                flag = false;
                break;
            }
        }

        if flag {
            // result.push(i);
            result = i;
            // console_log(&format!("{},{}", &i.to_string(), &after_sqrt.to_string()));
        }
    }

    // TODO: Vec 转字符串
    // let mut result_str = String::from("");
    // for num in result.iter() {
    //     result_str = format!("{},{}",result_str,num.to_string());
    // }

    console_log(&format!("rust 素数:{}", result));
}
