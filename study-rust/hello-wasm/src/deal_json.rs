/**
 * serde json 使用方式
 */
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::wasm_bindgen;

use crate::console_log;
#[derive(Serialize,Deserialize,Debug)]
struct Person {
    name: String,
    age: u8,
}

#[wasm_bindgen]
pub fn parse_json(json_str: String) -> String {
    console_log(&(String::from("接受到对象：") + &json_str));
    let mut person = serde_json::from_str::<Person>(&json_str).unwrap_or_else(|err| {
        console_log(&err.to_string());
        panic!("{}",&err.to_string());
    });

    person.name = String::from("New name");
    person.age = 10;
    
    serde_json::to_string(&person).unwrap()

}