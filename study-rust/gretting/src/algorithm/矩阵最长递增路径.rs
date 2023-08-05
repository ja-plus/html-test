struct Solution {}

impl Solution {
    fn new() -> Self {
        Solution {}
    }

    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     * 递增路径的最大长度
     * @param matrix int整型二维数组 描述矩阵的每个数
     * @return int整型
     */
    pub fn solve(&self, matrix: Vec<Vec<i32>>) -> i32 {
        // write code here
        // let mut cache: HashMap<i32, usize> = HashMap::new(); // HashMap 这个比不缓存还慢
        let mut cache: Vec<Vec<Option<usize>>> = Vec::new();
        for i in 0..matrix.len() {
            let mut vec = vec![None;matrix[0].len()];
            cache.push(vec);
        }
        let mut result: Vec<i32> = Vec::new();
        for i in 0..matrix.len() {
            for j in 0..matrix[0].len() {
                let len = self.recursion2(i, j, &matrix, -1, 1, &mut cache);
                result.push(len as i32);
            }
        }
        let mut max: i32 = 0;
        for item in result {
            if max < item {
                max = item;
            }
        }
        return max;
    }

    pub fn recursion2(
        &self,
        i: usize,
        j: usize,
        matrix: &Vec<Vec<i32>>,
        pre_num: i32,
        length: usize,
        cache: &mut Vec<Vec<Option<usize>>>,
    ) -> usize {
        match matrix.get(i) {
            Some(row) => match row.get(j) {
                Some(cur_num) => {
                    if *cur_num > pre_num {
                        let cached_value = cache[i][j];
                        return match cached_value {
                            Some(v) => v + 1,
                            None => {
                                // right
                                let a =
                                    self.recursion2(i, j + 1, matrix, *cur_num, length + 1, cache);
                                // bottom
                                let b =
                                    self.recursion2(i + 1, j, matrix, *cur_num, length + 1, cache);
                                // bottom
                                let c =
                                    self.recursion2(i, j - 1, matrix, *cur_num, length + 1, cache);
                                // top
                                let d =
                                    self.recursion2(i - 1, j, matrix, *cur_num, length + 1, cache);

                                let mut max: usize = 0;
                                for l in [a, b, c, d].iter() {
                                    if *l > max {
                                        max = *l;
                                    }
                                }
                                cache[i][j] = Some(max);
                                // println!("{:?}",cache);
                                return max + 1;
                            }
                        };
                    }
                    return 0;
                }
                None => 0,
            },
            None => 0,
        }
    }
}
