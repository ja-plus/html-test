fn main() {
    println!("Hello, world!");
    // let v:Vec<i32> = Vec::new();
    let mut v = vec![1,2,3];
    v.push(1);
    let third:&i32 = &v[2];
    let third2 = v.get(0);
    println!("{}", third);

    match third2 {
        Some(third) => println!("{}", third),
        None => println!("no"),
    }
}
