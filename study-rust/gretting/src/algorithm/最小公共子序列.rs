struct Solution {}

impl Solution {
    fn new() -> Self {
        Solution {}
    }

    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     * longest common subsequence
     * @param s1 string字符串 the string
     * @param s2 string字符串 the string
     * @return string字符串
     */
    pub fn LCS(&self, s1: String, s2: String) -> String {
        if s1 == "" || s2 == "" {
            return "-1".to_string();
        }
        // write code here
        let s1_arr: Vec<char> = s1.chars().collect();
        let s2_arr: Vec<char> = s2.chars().collect();
        // println!("s1_arr:{:?}", s1_arr);

        let mut temp_matrix: Vec<Vec<usize>> = vec![vec![0; s1_arr.len() + 1]; s2_arr.len() + 1];

        for i in 0..s2_arr.len() {
            let s2_char = s2_arr[i];
            for j in 0..s1_arr.len() {
                let s1_char = s1_arr[j];
                if s2_char == s1_char {
                    temp_matrix[i + 1][j + 1] = temp_matrix[i][j] + 1;
                } else {
                    temp_matrix[i + 1][j + 1] = temp_matrix[i + 1][j].max(temp_matrix[i][j + 1]);
                }
            }
        }

        // for item in temp_matrix.iter() {
        //     println!("{:?}", item);
        // }

        let matrix = temp_matrix;
        let mut y = matrix.len() - 1;
        let mut x = matrix[0].len() - 1;
        let mut str_vec = Vec::new();
        while x >= 0 && y >= 0 {
            let left = matrix[y][x - 1];
            let top = matrix[y - 1][x];
            let cur = matrix[y][x];
            if cur == 0 {
                return "-1".to_string();
            }
            // println!("x:{},y:{}",x,y);

            if cur > left && cur > top {
                str_vec.push(s1_arr[x - 1]);
                x -= 1;
                y -= 1;
            } else if cur == top {
                y -= 1;
            } else if cur == left {
                x -= 1;
            }
            if matrix[y][x] == 0 {
                break;
            }
        }

        str_vec.reverse();
        // println!("{:?}",str_vec);

        str_vec.iter().collect::<String>()
    }
}

fn main() {
    let s = Solution::new();
    /*
     * [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
     * [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1]
     * [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
     * [0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2]
     * [0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2]
     * [0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3]
     * [0, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3]
     * [0, 1, 2, 2, 2, 3, 3, 4, 4, 4, 4]
     * [0, 1, 2, 2, 2, 3, 3, 4, 4, 5, 5]
     * [0, 1, 2, 2, 2, 3, 3, 4, 4, 5, 6]
     * [0, 1, 2, 2, 2, 3, 3, 4, 4, 5, 6]
     */
    let result = s.LCS("1A2C3D4B56".to_string(), "B1D23A456A".to_string());
    assert_eq!(result, "123456");
    println!("{}", result);
}
