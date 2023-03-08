pub trait Show {
    fn show(&self) {
        println!("not implement Show trait"); // trait 默认实现
    }
}
pub struct Person {
    name: String,
    age: i8,
}
impl Person {
    pub fn new() -> Self {
        Person {
            name: String::from("Jack"),
            age: 12
        }
    }
}
impl Show for Person {
    fn show(&self) {
        println!("name:{},age:{}", self.name, self.age);
    }
}
