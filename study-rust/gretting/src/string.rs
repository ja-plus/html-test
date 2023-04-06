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

    // test String split
    let s = String::from("2.10.2");
    let result: Vec<&str> = s.split(".").collect();
    println!("String split result:{:?}", result);
    // &str split
    let s = "1-2-3";
    let result: Vec<&str> = s.split("-").collect();
    println!("&str split result:{:?}", result);

    // transfer to number
    let s = "0123123";
    let num: i32 = s.parse().unwrap();
    println!("transfer to number:{}", num);

    // compare
    println!("std:;cmp::max: {}", std::cmp::max(1, 2));

    let s = ['a', 'b', 'c'].iter().collect::<String>();
    println!("Vec<char> 转字符串:{}", s);
}
