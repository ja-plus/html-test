use std::fs;
use std::io::prelude::*;
use std::net::{TcpListener, TcpStream};
fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    for stream in listener.incoming() {
        let stream = stream.unwrap();
        println!("-----connection established!-----");
        handle_connection(stream);
    }
}
fn handle_connection(mut stream: TcpStream) {
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();
    println!("Request:{}", String::from_utf8_lossy(&buffer));
    // 文件的url 在根目录
    // let contents = fs::read_to_string("hello.html").unwrap();

    // // let response = "HTTP/1.1 200 OK\r\n\r\n";
    // let response = format!(
    //     "HTTP/1.1 200 OK\r\nContent-Length: {}\r\n\r\n{}",
    //     contents.len(),
    //     contents
    // );
    // stream.write(response.as_bytes()).unwrap();
    // stream.flush().unwrap();

    let get = b"GET / HTTP/1.1\r\n";

    let (status_line, filename) = if buffer.starts_with(get) {
        ("HTTP/1.1 200 OK", "hello.html")
    } else {
        ("HTTP/1.1 404 NOT FOUND", "404.html")
    };

    let contents = fs::read_to_string(filename).unwrap();

    let response = format!(
        "{}\r\nContent-Length: {}\r\n\r\n{}",
        status_line,
        contents.len(),
        contents
    );

    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}
