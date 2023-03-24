pub fn main(){
    
}

use std::collections::{HashMap};

struct Solution{

}

impl Solution {
    fn new() -> Self {
        Solution{}
    }

    /**
    * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
    * 
        * @param num int整型一维数组 
        * @return int整型二维数组
    */
    pub fn three_sum(&self, num: Vec<i32>) -> Vec<Vec<i32>> {
        // write code here
        let mut result:Vec<Vec<i32>> = Vec::new();
        let mut map:HashMap<i32,Vec<i32>> = HashMap::new();
        for i in 0..num.len(){
            let num1 = num[i];
            for j in (i+1)..num.len() {
                let num2 = num[j];
                let sum = num1 + num2;
                map.insert(sum,vec![num1,num2]);
            }
        }
        for i2 in &num {
            let n = -1 * i2;
            if let Some(v) = map.get_mut(&n) {
               v.push(i2.clone());
               result.push(v.to_vec());
               map.remove(&n);
            }
        }

        result
    }
}