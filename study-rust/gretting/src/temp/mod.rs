struct Solution {}

impl Solution {
    fn new() -> Self {
        Solution {}
    }

    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     * 反转字符串
     * @param str string字符串
     * @return string字符串
     */
    pub fn solve(&self, str: String) -> String {
        // write code here
        let mut arr: Vec<char> = str.chars().collect();
        arr.reverse();
        arr.iter().collect::<String>()
    }
}
