use std::{thread, time::Instant};

/**数组中的逆序对*/

fn main() {
    let now = Instant::now();
    let solution = Solution::new();
    let data = vec![1, 3, 2];
    // let data = vec![
    //     364, 637, 341, 406, 747, 995, 234, 971, 571, 219, 993, 407, 416, 366, 315, 301, 601, 650,
    //     418, 355, 460, 505, 360, 965, 516, 648, 727, 667, 465, 849, 455, 181, 486, 149, 588, 233,
    //     144, 174, 557, 67, 746, 550, 474, 162, 268, 142, 463, 221, 882, 576, 604, 739, 288, 569,
    //     256, 936, 275, 401, 497, 82, 935, 983, 583, 523, 697, 478, 147, 795, 380, 973, 958, 115,
    //     773, 870, 259, 655, 446, 863, 735, 784, 3, 671, 433, 630, 425, 930, 64, 266, 235, 187, 284,
    //     665, 874, 80, 45, 848, 38, 811, 267, 575,
    // ];
    let result = solution.InversePairs(data);
    // thread::sleep_ms(3000);
    println!("result:{},time:{}", result, now.elapsed().as_millis());
    println!("expect:{}", 2519);
}
struct Solution {}

impl Solution {
    fn new() -> Self {
        Solution {}
    }

    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     * @param data int整型一维数组
     * @return int整型
     */
    pub fn InversePairs(&self, mut data: Vec<i32>) -> i32 {
        // write code here
        let mut i = 1;
        let mut count = 0;
        while i < data.len() {
            if data[i] < data[i - 1] {
                // let mut j = 0;
                // 找到位置
                // while j < i {
                //     if data[i] < data[j] {
                //         count = count + i - j;
                //         break;
                //     }
                //     j = j + 1;
                // }

                let j = self.half_find(&data, i);
                println!("index:{}", j);
                count = count + i - j;
                let tmp = data[i];
                // 插入排序
                data.remove(i);
                data.insert(j, tmp);
            }
            i = i + 1;
        }
        (count % 1000000007) as i32
    }

    fn half_find(&self, data: &Vec<i32>, i: usize) -> usize {
        let mut start = 0;
        let mut end = i;
        let target = data[i];
        while start <= end {
            let mid = (start + end) / 2;
            if mid == 0 {
                return 0;
            }
            if data[mid - 1] < target && data[mid] >= target {
                return mid;
            }
            if data[mid] < target {
                start = mid + 1;
            } else if data[mid] > target {
                end = mid - 1;
            }
        }
        end
    }
}
