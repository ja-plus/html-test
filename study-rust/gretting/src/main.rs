mod use_reqwest;

#[tokio::main]
async fn main() {
    println!("hello world");
    let res = use_reqwest::main();
    if let Ok(resp) = res.await {
        println!("{:#?}", resp);
    }
}