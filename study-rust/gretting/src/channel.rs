use std::sync::mpsc;
use std::thread;
use std::time::Duration;

pub fn main() {
    let (tx, rx) = mpsc::channel();
    // let (tx2 ,rx2) = mpsc::channel();
    let tx2 = mpsc::Sender::clone(&tx);

    thread::spawn(move || {
        tx.send(String::from("hello")).unwrap();
        let vals = vec![
            String::from("hello1"),
            String::from("hello2"),
            String::from("hello3"),
        ];

        for str in vals {
            tx2.send(str).unwrap();
            thread::sleep(Duration::from_millis(100));
        }
    });

    let received = rx.recv().unwrap();
    println!("Got: {}", received);

    for receive in rx {
        println!("Got2: {}", receive);
    }
}
