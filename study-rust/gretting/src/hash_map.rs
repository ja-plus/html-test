use std::{collections::HashMap};
fn main() {
  let mut hm = HashMap::new();
  hm.insert(String::from("hhh"), 10);

  let teams = vec![String::from("1"), String::from("2")];
  let initial_scores = vec![12, 13];
  let scores: HashMap<_, _> = teams.iter().zip(initial_scores.iter()).collect();
  println!("scores:{:?}", scores);
  match hm.get("hhh"){
    Some(v) => {
      println!("hashMap.get:{}",v);
    }
    _ => {}
  }
  // 不存在key则插入
  hm.entry(String::from("hhh")).or_insert(20);
  // hm.entry(String::from("aaa")).or_default();

  println!("hm:{:?}", hm);

  let text = "hello world wonderful world";
  let mut map = HashMap::new();
  for word in text.split_whitespace() {
    let count = map.entry(word).or_insert(0);
    *count += 1;
  }
  println!("{:#?}", map);

  // 先定好map大小
  let mut map:HashMap<i32, i32> = HashMap::with_capacity(10);
  map.insert(1,1);
  map.insert(2,1);
  map.remove(&2); // remove

  // 遍历
  for (k,v) in map {
    println!("k:{},v:{}",k,v);
  }

}
