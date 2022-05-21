use std::collections::HashMap;
fn main() {
  let mut hm = HashMap::new();
  hm.insert(String::from("hhh"), 10);

  let teams = vec![String::from("1"), String::from("2")];
  let intial_scores = vec![12, 13];
  let scores: HashMap<_, _> = teams.iter().zip(intial_scores.iter()).collect();

  // 不存在key则插入
  hm.entry(String::from("hhh")).or_insert(20);
  // hm.entry(String::from("aaa")).or_default();

  println!("{:?}", hm);

  let text = "hello world wonderful world";
  let mut map = HashMap::new();
  for word in text.split_whitespace() {
    let count = map.entry(word).or_insert(0);
    *count += 1;
  }
  println!("{:#?}", map);
}
