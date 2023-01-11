
fn main(){
  let solution = Solution::new();
  let nums: Vec<i32> = vec![9];
  let result = solution.search(nums, 8);
  println!("result:{}", result);
}

struct Solution {}

impl Solution {
    fn new() -> Self {
        Solution {}
    }

    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param nums int整型一维数组
     * @param target int整型
     * @return int整型
     */
    pub fn search(&self, nums: Vec<i32>, target: i32) -> i32 {
        // write code here
        let mut s = 0;
        let mut e = nums.len();
        if e == 0 {return -1;}

        while s <= e {
            let mid=(s+e)/2;
            // println!("mid:{},s:{},e:{}",mid,s,e);
            let val = nums[mid];
            if mid == 0 {
                if val == target{ return 0;}
                else {return -1;}
            }
            if val > target{
                e = mid -1;
            }else if val< target{
                s = mid+1;
            }else {
                return mid as i32;
            }
        }
        -1
    }
}