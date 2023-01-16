// mod use_reqwest;
// mod dimen2_arr_lookup;
mod order_arr;
// #[tokio::main]
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
    order_arr::main();
}

