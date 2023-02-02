#[derive(Debug)]
// use std::collections::HashMap
enum UsState {
  Alabama,
  Alaska,
}
enum Coin {
  Penny,
  Nickel,
  Dime,
  Quarter(UsState),
}
fn value_in_cents(coin:Coin) ->u8{
  match coin {
    Coin::Penny => 1,
    // Coin::Nickel => 5,
    // Coin::Dime => 10,
    Coin::Quarter(state) => {
      println!("Quarter! {:?}", state );
      25
    },
    _ => {
      println!("other situation");
      10
    }
    
  }
}
fn main(){
  println!("{}",value_in_cents(Coin::Penny));
  println!("{}",value_in_cents(Coin::Quarter(UsState::Alaska)));
  value_in_cents(Coin::Nickel);
  let v = Some(2);
  match v {
    Some(3) => println!("three"),
    _ => println!("match Some default"),
  }
  if let Some(3) = v {
    println!("Some(3) = v");
  }else {
    println!("let Some else");
  }
  if let Some(n) = v {
    println!("let Some(n) = v,v:{:?},n:{} ",v,n);
  }else {
    // None
    println!("None");
  }
}