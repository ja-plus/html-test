// mod use_reqwest;
// mod dimen2_arr_lookup;
// mod order_arr;
// mod hash_map;
// mod owner_ship;
// mod string;
// mod use_trait;
// mod vector;
// use use_trait::{Person, Show};
// mod binary_tree;
mod channel;
mod rc;
// mod std_cmp;
mod temp;
// #[tokio::main]
// use binary_tree::vector_binary_tree::{VectorBinaryTree};
fn main() {
    // 接收命令行参数
    // let args: Vec<String> = env::args().collect();
    // println!("命令行参数：{:?}", args);// cargo run xxx
    // println!("参数:{}",&args[1]);
    // println!("hello world");

    // let res = use_reqwest::main();
    // if let Ok(resp) = res.await {
    //     println!("response:{:#?}", resp);
    // }
    // let post_res = use_reqwest::post_test();
    // if let Ok(post_resp) = post_res.await {
    //     println!("post Response: {:#?}", post_resp);
    // }
    // dimen2_arr_lookup::main();
    // order_arr::main();
    // let num = (2 as i64).pow(10);
    // println!("{},", num != 1024);

    // let person = Person::new();
    // person.show();

    // std_cmp::main();
    // binary_tree::main();
    // let binary_tree = VectorBinaryTree::new_with_arr(vec![5, 1, 4, 3, 7, 2, 6]);

    channel::main();
    rc::main();
}
