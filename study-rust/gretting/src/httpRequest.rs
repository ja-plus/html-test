use chrono::prelude::*;
use reqwest::header::HeaderMap;

#[tokio::main]
async fn main() {
    let client = reqwest::Client::new();
    let now: DateTime<Local> = Local::now();
    let mills = now.timestamp_millis().to_string(); // 1609761696945
    let str = "{\"bp\": \"-0.260\", \"closePrice\": \"99.99\", \"code\": \"T2209\", \"countDeal\": \"66243\", \"ctd\": \"压测数据rs".to_string();
    let str2 = String::from("\", \"irr\": \"-1.3844\", \"openInterest\": \"1699030\", \"price\": \"99.730\", \"priceBuy\": \"99.730\", \"priceSell\": \"99.735\", \"seq\": \"T2209\"}");
    let body_str = format!("{}{}{}",str,mills,str2).to_string();

    let mut headers = HeaderMap::new();
    headers.insert("Content-Type", "application/json".parse().unwrap());
    headers.insert("Cookie","jgbsessid=b828c8eff641f9eb730b8d706a82e600; THSFT_USERID=ifind_e001; u_name=ifind_e001; userid=106105003; user=OmlmaW5kX2UwMDE6Ojo6Ojo6OjoxMDYxMDUwMDM6MTY1NzA4NzYyNzo6Ojo4NjQwMDo6MTc5OTM0ODViMTE5ZmY3YTA1ZjZiMWVlOTQ5Y2ZlZWRhOjow; ticket=d2b9885f7265a63a4ea704516c431522; escapename=ifind_e001; version=1.10.12.381; securities=0; platform=w; jgblang=cn; newguidever=2".parse().unwrap());

    let res = client.post("http://testft.10jqka.com.cn/standardgwapi/api/bond_service_quote/test/comprehensive_stress_test")
    .headers(headers)
    .body(body_str)
    .send();
}

