// enum
// enum IpAddrKind{
//   V4,
//   V6
// }
struct IpAddr {
  kind: IpAddrKind
  address: String
}
enum IpAddrKind{
  V4(u8,u8,u8,u8),
  V6(String),
}

fn main() {
  // let four = IpAddrKind::V4
  // let six = IpAddrKind::V6
  // route(four)
  // let home = IpAddr{
  //   kind: IpAddrKind::V4,
  //   address: "hello address"
  // }
  let home = IpAddrKind::V4(10,19,0,10)
  
}



fn route(ip_kind:IpAddrKind){}

enum Message {
  Quit,
  Move {x:i32,y:i32},
  Write(String),
  ChangeColor (i32,i32,i32),
}
impl Message {
  fn call(&self){}
}