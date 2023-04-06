

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
    pub fn permute(&self, num: Vec<i32>) -> Vec<Vec<i32>> {
        // write code here
        let mut result:Vec<Vec<i32>> = Vec::new();
        self.recursion(vec![], num, &mut result);
        result

    }
    fn recursion(&self,part1: Vec<i32>,part2: Vec<i32>,result:&mut Vec<Vec<i32>>){
        if part2.len() == 0 {
            result.push(part1);
            return;
        }
        
        for i in 0..part2.len() {
            let mut p1 = part1.clone();
            let mut p2 = part2.clone();
            p1.push(part2[i]);
            p2.remove(i);
            self.recursion(p1, p2, result);
        }

    }
}