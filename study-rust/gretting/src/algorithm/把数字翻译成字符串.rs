/**
 * a->1, b->2, ...
 * 示例1
 * 输入："12"
 * 返回值：2
 * 说明：
 * 2种可能的译码结果（”ab” 或”l”）
 */

 struct Solution {}

 impl Solution {
     fn new() -> Self {
         Solution {}
     }
 
     /**
      * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
      *
      * 解码
      * @param nums string字符串 数字串
      * @return int整型
      */
     pub fn solve(&self, nums: String) -> i32 {
         if &nums == "0" {
             return 0;
         }
         // write code here
         let chars = nums.chars().collect::<Vec<char>>();
         let mut count = 1;
         let mut group_count = 0; // 可以连起来的数字的数量。123，1223，117等，有多种可能的数字。
         if (chars[0].to_digit(10).unwrap() as i8) < 3 {
             group_count = 1;
         };
 
         for i in 1..chars.len() {
             let num = chars[i].to_digit(10).unwrap() as i8;
             let num_prev = chars[i - 1].to_digit(10).unwrap() as i8;
             if num == 0 && group_count == 0 {
                 //不是10，20的情况下出现0，则表示不能满足，直接返回0
                 return 0;
             }
 
             if num_prev == 1 && num > 0
                 || num_prev == 2 && num < 7 && num > 0
                 || num_prev != 1 && num_prev != 2 && num > 0
             {
                 //num_prev == 1或2的情况下，数字是可以连起来的。
                 //前面不是1或2的情况下，视为单个连续数字。
                 group_count += 1;
             }
 
             // println!("{},{}", num, group_count);
 
             /*
              * 停止连续的条件
              * 数字大于2的情况，说明连续数字结束。
              * 数字为0 的情况也需要结束连续，且不能加到group_count长度中。因为10，20只有一种情况。
              */ 
             if num > 2 || num == 0 || i == chars.len() - 1 {
                 let fib_result = self.fib(group_count);
                 count *= fib_result;
                 group_count = 0;
             }
         }
 
         count
     }
 
     fn fib(&self, count: i32) -> i32 {
         if count < 3 {
             return count;
         }
 
         let mut a = 1;
         let mut b = 2;
         let mut i = count;
         while i > 2 {
             let temp = b;
             b = a + b;
             a = temp;
             i -= 1;
         }
         b
     }
 }
 