fn main() {
  let mut s = String::new();
  let data = "data";
  let s2 = data.to_string();
  let mut s3 = String::from("s3");
  s3.push_str("hah");
  s3.push_str(&s2);
  s3.push_str(data);
  println!("{}", s3);
  println!("{}", s2 + &s3);
  // println!("{}", s2); // s2所有权已经转移
  let fm = format!("{}-{}-{}", s, s3, data); // format 不会取得所有权
  println!("{}", fm);
  //字符串中取单个字符：
  let s = String::from("EN中文");
  let a = s.chars().nth(2);
  println!("{:?},{}", a, s.chars().count());
  // sting 是 Vec<u8>的包装
  let s = String::from("EN中文");
  let sub = &s[0..2];
  println!("{}", sub);
}
