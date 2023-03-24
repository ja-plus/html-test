use std::cmp::Ordering;

/**
 * serde json 使用方式
 */
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::wasm_bindgen;

use crate::console_log;
#[derive(Serialize, Deserialize, Debug)]
struct Person {
    id: f64,
    name: String,
    age: u8,
}
impl Eq for Person{}
impl Ord for Person {
    fn cmp(&self, other: &Self) -> Ordering {
        if self.id < other.id {
            Ordering::Less
        } else if self.id > other.id {
            Ordering::Greater
        } else {
            Ordering::Equal
        }
    }
}
impl PartialEq for Person{
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}
impl PartialOrd for Person{
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        match self.id.partial_cmp(&other.id) {
            Some(core::cmp::Ordering::Equal) => {}
            ord => return ord,
        }
        match self.name.partial_cmp(&other.name) {
            Some(core::cmp::Ordering::Equal) => {}
            ord => return ord,
        }
        self.age.partial_cmp(&other.age)
    }
}

#[wasm_bindgen]
pub fn parse_json(json_str: String) -> String {
    // console_log(&format!("接受到对象：{}",&json_str));

    let mut person = serde_json::from_str::<Vec<Person>>(&json_str).unwrap_or_else(|err| {
        console_log(&err.to_string());
        panic!("{}", &err.to_string());
    });
    person.sort();
    // person.name = String::from("New name");
    // person.age = 10;

    serde_json::to_string(&person).unwrap()
    // json_str
}