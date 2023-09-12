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
        let mut max_len = 0;
        let mut max_i = 0;
        let mut max_j = 0;

        for i in 0..s2_arr.len() {
            let s2_char = s2_arr[i];
            for j in 0..s1_arr.len() {
                let s1_char = s1_arr[j];
                if s2_char == s1_char {
                    let length = temp_matrix[i][j] + 1;
                    temp_matrix[i + 1][j + 1] = length;
                    // 获取最大长度对应的位置
                    if length > max_len {
                        max_i = i;
                        max_j = j;
                        max_len = length;
                    }
                } else {
                    temp_matrix[i + 1][j + 1] = 0;
                }
            }
        }

        // for item in temp_matrix.iter() {
        //     println!("{:?}", item);
        // }

        let mut str_vec = "".to_string();
        for i in 0..max_len {
            // println!("i:{}",i);
            let c = s1_arr[max_j - i];
            str_vec = c.to_string() + &str_vec;
        }

        // str_vec.reverse();
        println!("{}",str_vec);

        // str_vec.iter().collect::<String>()
        str_vec
    }
}

fn main() {
    let s = Solution::new();
    /*
     * [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
     * [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
     * [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
     * [0, 0, 0, 0, 0, 2, 0, 0, 0, 0]
     * [0, 0, 0, 0, 0, 0, 3, 0, 0, 0]
     * [0, 0, 0, 0, 0, 0, 0, 4, 0, 0]
     * [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
     * [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
     */
    s.LCS("1AB2345CD".to_string(), "12345EF".to_string());
}
