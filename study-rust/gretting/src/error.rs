use std::fs::File;
use std::io::{self, ErrorKind, Read};
fn main() {
    // panic!("panic");

    let _f = File::open("hello.txt");
    let _f = match _f {
        Ok(file) => file,
        // Err(error) => {
        //     panic!("Error painc in file {:?}",error);
        // }
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("{}", e),
            },
            other_error => panic!("Error opening the file {:?}", other_error),
        },
    };

    // let _f = File::open("hello.txt").unwrap();
    // let _f = File::open("hello.txt").expect("无法打开文件");

    let r = g();
    match r {
        Ok(v) => {
            println!("g{}", v)
        }
        Err(e) => {
            println!("e{}", e)
        }
    }
    // kind
    let str_file = read_text_from_file("hello.txt");
    match str_file {
        Ok(s) => println!("{}", s),
        Err(e) => {
            match e.kind() {
                io::ErrorKind::NotFound => {
                    println!("No such file");
                },
                _ => {
                    println!("Cannot read the file");
                }
            }
        }
    }
       
}

fn f(i: i32) -> Result<i32, bool> {
    if i >= 0 {
        Ok(i)
    } else {
        Err(false)
    }
}

fn g() -> Result<i32, bool> {
    let r = f(10000)?; // 传递错误 ，? 符仅用于返回值类型为 Result<T, E> 的函
    Ok(r)
}

fn read_text_from_file(path: &str) -> Result<String, io::Error> {
    let mut f = File::open(path)?;
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}
