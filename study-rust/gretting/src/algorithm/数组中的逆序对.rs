use std::time::Instant;

/**数组中的逆序对*/
pub fn main() {
    let now = Instant::now();
    let solution = Solution::new();
    // let data = vec![3, 1, 2];
    // let data = vec![1, 3, 5, 2];
    let data = vec![
        364, 637, 341, 406, 747, 995, 234, 971, 571, 219, 993, 407, 416, 366, 315, 301, 601, 650,
        418, 355, 460, 505, 360, 965, 516, 648, 727, 667, 465, 849, 455, 181, 486, 149, 588, 233,
        144, 174, 557, 67, 746, 550, 474, 162, 268, 142, 463, 221, 882, 576, 604, 739, 288, 569,
        256, 936, 275, 401, 497, 82, 935, 983, 583, 523, 697, 478, 147, 795, 380, 973, 958, 115,
        773, 870, 259, 655, 446, 863, 735, 784, 3, 671, 433, 630, 425, 930, 64, 266, 235, 187, 284,
        665, 874, 80, 45, 848, 38, 811, 267, 575,
    ];
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
        let right = data.len() - 1;
        let count = self.split(&mut data, 0, right);
        // println!("data:{:?}", data);
        (count % 1000000007) as i32
    }

    fn split(&self, data: &mut Vec<i32>, left: usize, right: usize) -> usize {
        // println!("left:{},right:{}", left, right);
        if left >= right {
            return 0;
        }
        let mid = (left + right) / 2;
        // println!("mid:{}", mid);
        // left
        let count1 = self.split(data, left, mid);
        // println!("count1:{}", count1);
        let count2 = self.split(data, mid + 1, right);
        // println!("count2:{}", count2);
        let count3 = self.merge(data, left, mid, right);
        // println!("count3:{}", count3);
        count1 + count2 + count3
    }
    fn merge(&self, data: &mut Vec<i32>, left: usize, mid: usize, right: usize) -> usize {
        // println!(
        //     "merge: left:{},mid:{},right:{},data:{:?}",
        //     left, mid, right, data
        // );
        let mut i = left;
        let mut j = mid + 1;
        let mut count = 0;
        let mut temp_vec = Vec::new();
        while i <= mid || j <= right {
            // println!(
            //     "merge:i:{},j:{},data[i]:{},data[j]:{}",
            //     i, j, data[i], data[j]
            // );
            if j > right {
                temp_vec.push(data[i]);
                i += 1;
                continue;
            }
            if i > mid {
                temp_vec.push(data[j]);
                j += 1;
                continue;
            }
            if data[i] < data[j] {
                temp_vec.push(data[i]);
                i += 1;
            } else {
                count += mid - i + 1;
                temp_vec.push(data[j]);
                j += 1;
            }
            // println!("temp_vec:{:?}", temp_vec);
        }
        let mut i = left;
        while i <= right {
            data[i] = temp_vec[i - left];
            i += 1;
        }
        // println!("merge: data:{:?}", data);
        // while j <= right {
        //     i=left;
        //     while i <= mid {
        //         if data[i] > data[j] {
        //             count +=1;
        //         }
        //         i+=1;
        //     }
        //     j+=1;
        // }
        // println!("{},{},{},count:{}", left, mid, right,count);
        count
    }
}
