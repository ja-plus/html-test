#[derive(Debug)]
enum SpreadsheetCell {
  Int(i32),
  Float(f64),
  Text(String),
}

fn main() {
  let row = vec![
    SpreadsheetCell::Int(3),
    SpreadsheetCell::Float(10.12),
    SpreadsheetCell::Text(String::from("hello vec")),
  ];
  for i in &row {
    println!("{:?} ", i);
  }

  let mut vector = vec![1, 2, 4, 8];
  vector.push(16);
  vector.push(32);
  println!("{:?}", vector);

  let mut v1: Vec<i32> = vec![1, 2, 4, 8];
  let mut v2: Vec<i32> = vec![16, 32, 64];
  v1.append(&mut v2);
  println!("v1:{}",v1[0]); // 通过下标访问
  println!("append:{:?}", v1);

   // Iterators can be collected into vectors
   let collected_iterator: Vec<i32> = (0..10).collect();
   println!("Collected (0..10) into: {:?}", collected_iterator);
}
