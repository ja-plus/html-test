use std::collections::HashSet;
use std::time::SystemTime;

pub fn main() {
    let sys_time1 = SystemTime::now();
    let solution = Solution::new();

    assert_eq!(solution.threeSum(vec![0]), Vec::new() as Vec<Vec<i32>>);
    assert_eq!(
        solution.threeSum(vec![-2, 0, 1, 1, 2]),
        [[-2, 0, 2], [-2, 1, 1]]
    );
    assert_eq!(
        solution.threeSum(vec![-10, 0, 10, 20, -10, -40]),
        [[-10, -10, 20], [-10, 0, 10]]
    );

    let sys_time2 = SystemTime::now();
    let difference = sys_time2
        .duration_since(sys_time1)
        .expect("Clock may have gone backwards"); //expect()方法在Ok时返回T值，在Err时panic
    println!("{:?}", difference); //自动转换时间单位
}
struct Solution {}

impl Solution {
    fn new() -> Self {
        Solution {}
    }

    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     * @param num int整型一维数组
     * @return int整型二维数组
     */
    pub fn threeSum(&self, mut num: Vec<i32>) -> Vec<Vec<i32>> {
        // write code here
        let mut result: Vec<Vec<i32>> = Vec::new();
        // 用每个结果集的字符串，比较result是否有重复
        let mut result_str: HashSet<String> = HashSet::new();
        num.sort();
        for i in 0..num.len() {
            let num1 = num[i];
            if num1 > 0 {
                break;
            }
            for j in (i + 1)..num.len() {
                let num2 = num[j];
                let sum = num1 + num2;
                let mut res = vec![num1, num2];
                for k in (j + 1)..num.len() {
                    let num3 = num[k];
                    if num3 == -sum {
                        res.push(num[k]);
                        // 结果集字符串
                        let str = format!("{},{},{}", num1, num2, num3);
                        // 没重复则新增
                        if !result_str.contains(&str) {
                            result_str.insert(str);
                            result.push(res);
                        }
                        break;
                    }
                }
            }
        }

        result
    }
}
