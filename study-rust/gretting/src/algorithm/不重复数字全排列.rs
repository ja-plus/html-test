use std::collections::HashSet;



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
    /**不重复数字 */
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
    // 重复数字的全排列
     fn recursion2(&self, index: usize, num: &mut Vec<i32>, result: &mut Vec<Vec<i32>>) {
        if index == num.len() {
            result.push(num.clone());
            return;
        }
        // 暂存使用过的数字
        let mut set:HashSet<i32> = HashSet::new();
        // i以后的任意数字放到i的位置，作为一个结果
        for i in index..num.len() {
            // num[i] 做过首字符，则放弃
            if set.contains(&num[i]) {
                continue;
            }else {
                set.insert(num[i]);
            }
            // 把i号位的数放到第index位
            // num.swap(index, i); //不能交换，交换破坏了字典排序。[-1,2,3] => [3,2,-1] x， [3,-1,2]√
            let mut n = num.remove(i);
            num.insert(index,n);
            self.recursion2(index + 1, num, result);
            // 还原顺序，便于下一次循环
            // num.swap(i,index);
            n = num.remove(index);
            num.insert(i,n);
        }
    }
}