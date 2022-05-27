use std::fs::File;
use std::io::ErrorKind;
fn main() {
    // panic!("panic");

    let _f = File::open("hello.txt");
    let _f = match _f {
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

    // let _f = File::open("hello.txt").unwrap();
    // let _f = File::open("hello.txt").expect("无法打开文件");

}
