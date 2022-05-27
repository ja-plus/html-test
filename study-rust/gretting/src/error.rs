// use rand::{Rng};
use std::fs::File;
use std::io::ErrorKind;
fn main() {
    // panic!("panic");
    // let v =vec![1,2];
    // v[99];

    let f = File::open("hello.txt");
    let f = match f {
        Ok(file) => {
            file
        },
        // Err(error) => {
        //     panic!("Error painc in file {:?}",error);
        // }
        Err(error) => {
            match error.kind() {
                ErrorKind::NotFound => {
                    match File::create("hello.txt"){
                        Ok(fc) => fc,
                        Err(e) => panic!("{}",e)
                    }
                },
                other_error => panic!("Error opening the file {:?}",other_error),
            }
        }


    };

    let f = File::open("hello.txt").unwrap();
    let f = File::open("hello.txt").expect("无法打开文件");

}
