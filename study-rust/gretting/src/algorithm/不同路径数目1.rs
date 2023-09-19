struct Solution{

}

impl Solution {
    fn new() -> Self {
        Solution{}
    }

    /**
    * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
    *
    * 
        * @param m int整型 
        * @param n int整型 
        * @return int整型
    */
    pub fn uniquePaths(&self, m: i32, n: i32) -> i32 {
        // write code here
        let mm:usize = m as usize;
        let nn:usize = n as usize;
        let mut arr = vec![vec![0;mm];nn];
        arr[0][0] = 1;
        for row in 0..(n as usize) {
            for col in 0..(m as usize) {
                let mut left = 0;
                let mut top = 0;
                if col > 0 {
                    left = arr[row][col - 1];
                }
                if row > 0 {
                    top = arr[row - 1][col];
                }
                arr[row][col] = left + top;
            }
        }
        arr[nn-1][mm-1]
    }
}