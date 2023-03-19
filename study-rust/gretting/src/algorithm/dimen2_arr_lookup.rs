fn main() {
    let solution = Solution::new();
    // let array: Vec<Vec<i32>> = vec![
    //     vec![1, 2, 8, 9],
    //     vec![2, 4, 9, 12],
    //     vec![4, 7, 10, 13],
    //     vec![6, 8, 11, 15],
    // ];
    // let target = 3;
    let array = vec![
        vec![1, 2, 8, 9],
        vec![2, 4, 9, 12],
        vec![4, 7, 10, 13],
        vec![6, 8, 11, 15],
    ];
    let target = 5;
    let result = solution.Find(target, array);
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
     * @param target int整型
     * @param array int整型二维数组
     * @return bool布尔型
     */
    pub fn Find(&self, target: i32, array: Vec<Vec<i32>>) -> bool {
        // write code here
        let mut i = array.len() - 1;
        let mut j = 0;
        let row_num = array.len() -1;
        let mut last_row = &array[row_num];
        let max_num = last_row[last_row.len()-1];
        while j < array[i].len() {
            let val = array[i][j];
            if val == target {
                return true;
            }
            let mut right = max_num;
            if j + 1 < array[i].len() {
                right = array[i][j + 1];
            }
            if right <= target {
                j = j + 1;
            } else  {
                if i == 0 {
                    return false;
                }
                i = i - 1;
            }
        }
        false
    }
}
