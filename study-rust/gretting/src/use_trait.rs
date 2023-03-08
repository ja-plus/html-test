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
            age: 12,
        }
    }
}
impl Show for Person {
    fn show(&self) {
        println!("name:{},age:{}", self.name, self.age);
    }
}
pub struct Animal {}
impl Show for Animal {} // 此行去除，这个struct不能进入impl Show 的约束
// 仅可以传入Person 结构体
pub fn ha(s: Person) -> Person {
    let person = Person {
        name: String::from("aa"),
        age: 12,
    };
    person.show();
    s.show();
    s.age;
    person
}
// impl 关键字约束，struct一定需要impl了Show这个trait
pub fn ha2(s: impl Show)-> impl Show {
    s.show();
    s
}
// 泛型约束
pub fn ha3<T: Show>(s: T)-> T {
    s.show();
    s
}
// where 
pub fn ha4<T>(s: T) -> T
where
    T: Show,
{
    s.show();
    s
}

pub fn main(){
    let animal = Animal{};
    let animal = ha2(animal);
    let animal = ha3(animal);
    let animal = ha4(animal); // 归还所有权？
}