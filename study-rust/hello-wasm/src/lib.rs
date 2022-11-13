extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: &str);
    // 告诉rust 想要调用外部定义的函数。这些函数定义在window上。
    pub fn alert(s: &str);
    // js 定义在window上的方法
    pub fn getData(data: String);

}

//表示这个函数可以被js调用,export greet
#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    alert(&format!("Hello, {}!", name));
    String::from("res data")
}

#[wasm_bindgen]
pub fn run() {
    for i in 0..4 {
        println!("rust println {:?}", i);
        getData(i.to_string());
    }
}
