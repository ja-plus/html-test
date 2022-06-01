use std::thread;
use std::time::Duration;
use std::sync::mpsc;

/**并发 */
fn spawn_function() {
    for i in 0..5 {
        println!("spawned thread print {}", i);
        thread::sleep(Duration::from_millis(1));
    }
}

fn main() {
    // thread::spawn(spawn_function);
    //闭包（closures）来传递函数作为参数
    let handle = thread::spawn(|| {
        for i in 0..5 {
            println!("spawned thread print {}", i);
            thread::sleep(Duration::from_millis(1));
        }
    });
    // let inc = |num: i32| -> i32 {
    //     num + 1
    // };
    // println!("inc(5) = {}", inc(5));
    for i in 0..3 {
        println!("main thread print {}", i);
        thread::sleep(Duration::from_millis(1));
    }

    handle.join().unwrap();//join 方法可以使子线程运行结束后再停止运行程序。

    let s = "hello";
   
    let handle = thread::spawn(move || {
        println!("s:{}", s);
    });
    handle.join().unwrap();

    // 消息传递
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
    });

    let received = rx.recv().unwrap();
    println!("Got: {}", received);
}