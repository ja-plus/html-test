use std::{thread, time::Duration};

fn main(){
    print!("{}", "hello world")   
    let simulated_user_specified_value = 10;
    let simulated_random_number = 7;
}
fn simulated_expensive_calculation(intensity:u32) -> u32{
    println!("calculating slowly...");
    thread::sleep(Duration::from_secs(2));
    intensity
}

fn generate_workout(intensity:u32, random_number:u32){
    let expensive_closure = |num| {
        println!("calculating slowly...");
        thread::sleep(Duration::from_secs(2));
        num
    };
    // let expensive_result = simulated_expensive_calculation(intensity);
    if intensity < 25 {
        println!("Today, do {} pushups!", expensive_closure(intensity));
        println!("Next, do {} situps!", expensive_closure(intensity));

    } else {
        if random_number == 3 {
            println!("Take a break today! Remember to stay hydrated!");
        } else {
            println!("Today run for {} minutes!",expensive_closure(intensity));
        }
    }
}