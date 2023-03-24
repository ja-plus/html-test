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

    // -------push
    let mut vector = vec![1, 2, 4, 8];
    vector.push(16);
    vector.push(32);
    // println!("{:?}", vector);

    // ------append
    let mut v1: Vec<i32> = vec![1, 2, 4, 8];
    let mut v2: Vec<i32> = vec![16, 32, 64];
    v1.append(&mut v2);
    println!("v1:{}", v1[0]); // 通过下标访问
    println!("append:{:?}", v1);

    // Iterators can be collected into vectors
    let collected_iterator: Vec<i32> = (0..10).collect();
    println!("Collected (0..10) into: {:?}", collected_iterator);

    // update by index
    v1[0] = 21;
    println!("v1[0]:{}", v1[0]);

    // insert
    let mut vec = Vec::new();
    vec.push(1);
    vec.insert(0, 2);// 最前方插入
    println!("vec:{:?}", vec);
    
    // drain delete
    let mut vec = vec![1,2,3,4];
    vec.drain(0..1);
    println!("drain() vec:{:?},", vec);

    // for
    let vec = vec![2,4,6,48];
    for (i, n) in vec.iter().enumerate(){
        println!("iter().enumerate():i:{},n:{}",i,n);
    }
    // sort
    let mut vec = vec![2,5,1,5,2];
    vec.sort(); // vec.sort_by(|a,b| {a.cmp(b)})
    println!("sort:{:?}",vec);

    // with_capacity 预先设置最大容量
    let mut vec:Vec<i32> = Vec::with_capacity(10);
    
}
