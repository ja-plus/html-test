use std::collections::HashMap;

mod use_reqwest;

#[tokio::main]
async fn main() {
    println!("hello world");
    
    let res = use_reqwest::main();
    if let Ok(resp) = res.await {
        println!("response:{:#?}", resp);
    }
    let post_res = use_reqwest::post_test();
    if let Ok(post_resp) = post_res.await {
        println!("post Response: {:#?}",post_resp);
    }
}
