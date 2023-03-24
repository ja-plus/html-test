use rand::Rng;
use std::cmp::Ordering;
#[derive(Debug)]
struct Person {
    id: i32,
    name: String,
    age: u8,
}
impl Eq for Person {}
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
impl PartialEq for Person {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}
impl PartialOrd for Person {
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

pub fn main() {
    let mut arr = Vec::with_capacity(10);
    let mut rng = rand::thread_rng();

    for _i in 0..10 {
        let item = Person {
            id: rng.gen_range::<i32>(0, 10),
            name: "Jack".to_string(),
            age: 12,
        };
        arr.push(item);
    }

    arr.sort();
    println!("{:?}", arr);
}
