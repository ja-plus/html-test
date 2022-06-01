// fn longer(s1: &str, s2: &str) -> &str {
//     if s2.len() > s1.len() {
//         s2
//     } else {
//         s1
//     }
// }
fn longer<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    if s2.len() > s1.len() {
        s2
    } else {
        s1
    }
}
// impl<'a> Str<'a> {
//     fn get_content(&self) -> &str {
//         self.content
//     }
// }

fn main(){
    // let r;

    // {
    //     let x = 5;
    //     r = &x;
    // }

    // println!("r: {}", r);
    let r;
    {
        let s1 = "rust";
        let s2 = "ecmascript";
        r = longer(s1, s2);
        println!("{} is longer", r);
    }
}