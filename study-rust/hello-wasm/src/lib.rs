extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    // 告诉rust 想要调用外部定义的函数
    pub fn alert(s: &str);
}

//表示这个函数可以被js调用,export greet
#[wasm_bindgen]
pub fn greet(name: &str) -> String{
    alert(&format!("Hello, {}!", name));
    String::from("res data")
}