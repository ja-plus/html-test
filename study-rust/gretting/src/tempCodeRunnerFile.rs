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
        * @param numbers int整型一维数组 
        * @param target int整型 
        * @return int整型一维数组
    */
    pub fn twoSum(&self, numbers: Vec<i32>, target: i32) -> Vec<i32> {
        // write code here
        let mut map:HashMap<i32,usize> = HashMap::new();
        let mut result:Vec<i32> = Vec::new();
        for (i,num) in numbers.iter().enumerate() {
            let v = target - num;
            if let Some(n) = map.get(&v) {
                if n != &i {
                    result.push(n.clone() as i32 + 1);

                }
            }
            map.insert(num.clone(),i);
        }

        result.sort();
        result
    }
}