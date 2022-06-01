struct Point<T> {
    x: T,
    y: T,
}

enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}
impl Point<f64> {
    fn y(&self) -> f64 {
        self.x
    }
}
// impl<T, U> Point<T, U> {
//     fn mixup<V, W>(self, other: Point<V, W>) -> Point<T, W> {
//         Point {
//             x: self.x,
//             y: other.y,
//         }
//     }
// }
trait Descriptive {
    // fn describe(&self) -> String;
    fn describe(&self) -> String {
        String::from("[Object]")
    }
}
struct Person {
    name: String,
    age: u8
}
struct Father {
    name: String,
    age: i32
}
impl Descriptive for Person {
    fn describe(&self) -> String {
        format!("{} {}", self.name, self.age)
    }
}
impl Descriptive for Father{
    fn describe(&self) -> String{
        String::from("I am your father ") + &self.name
    }
}

fn output(object: impl Descriptive) {
    println!("{}", object.describe());
}
// fn output<T: Descriptive>(object: T) {
//     println!("{}", object.describe());
// }
fn output_two<T: Descriptive>(arg1: T, arg2: T) {
    println!("{}", arg1.describe());
    println!("{}", arg2.describe());
}
// fn notify(item: impl Summary + Display)
// fn notify<T: Summary + Display>(item: T)
// fn some_function<T: Display + Clone, U: Clone + Debug>(t: T, u: U)
// fn some_function<T, U>(t: T, u: U) -> i32
//     where T: Display + Clone,
//           U: Clone + Debug
//特性做返回值 返回值类型必须完全一样
// fn person(b:bool) -> impl Descriptive {
//     if b {
//         Person {
//             name: String::from("Cali"),
//             age: 24
//         }
//     } else {
//         Father {
//             name: String::from("Tom Father"),
//             age: 32
//         }
//     }
// }

// fn max<T>(array: &[T]) -> T {
//     let mut max_index = 0;
//     let mut i = 1;
//     while i < array.len() {
//         if array[i] > array[max_index] {
//             max_index = i;
//         }
//         i += 1;
//     }
//     array[max_index]
// }
trait Comparable {
    fn compare(&self, object: &Self) -> i8;
}
fn max<T: Comparable>(array: &[T]) -> &T {
    let mut max_index = 0;
    let mut i = 1;
    while i < array.len() {
        if array[i].compare(&array[max_index]) > 0 {
            max_index = i;
        }
        i += 1;
    }
    &array[max_index]
}
impl Comparable for i32 {
    fn compare(&self, object: &i32) -> i8 {
        if &self > &object { 1 }
        else if &self == &object { 0 }
        else { -1 }
    }
}

fn main() {
    let a = [2, 4, 6, 3, 1];
    println!("max = {}", max(&a));

    let p1 = Point { x: 1, y: 2 };
    let p2 = Point { x: 1.0, y: 2.0 };
    // let p = Point {x: 1, y: 2.0}; // err
    println!("p.x = {}", p1.x());

    let cali = Person {
        name: String::from("Cali"),
        age: 24
    };
    println!("{}", cali.describe());
}
