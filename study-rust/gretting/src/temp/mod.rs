struct Solution {}
#[derive(PartialEq, Clone)]
enum Cell {
    Q,
    Empty,
    Forbidden,
}

impl Solution {
    fn new() -> Self {
        Solution {}
    }

    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param n int整型 the n
     * @return int整型
     */
    pub fn Nqueen(&self, n: i32) -> i32 {
        // write code here

        let mut matrix: Vec<Vec<Cell>> = vec![vec![Cell::Empty; n as usize]; n as usize];
        /* 计数 */
        let mut count = 0;
        self.recursion(&mut matrix, &mut count, 0);
        count
    }

    fn recursion(&self,  matrix: &mut Vec<Vec<Cell>>, count: &mut i32, row_index: usize) {
        let n: usize = matrix.len();
        if row_index >= n {
            *count += 1;
            return;
        }
        for i in row_index..n {
            let mut empty_count = 0;
            for j in 0..n {
                let cell = &matrix[i][j];
                // 判断该位置是否合法
                if self.check_valid(&matrix, i, j) {
                    matrix[i][j] = Cell::Q;
                    self.recursion(matrix, count, row_index + 1);
                    matrix[i][j] = Cell::Empty; // 回溯
                }

                // if *cell == Cell::Empty {
                //     empty_count += 1;

                //     let mut clone_matrix = matrix.clone();
                //     clone_matrix[i][j] = Cell::Q;

                //     self.mark_forbidden(&mut clone_matrix, i, j);
                //     self.recursion(clone_matrix, count, row_index + 1);
                // }
            }
            if empty_count < (n - row_index) {
                break;
            }
        }
    }

    /** 判断该位置是否合法，判断四周是否有Q */
    fn check_valid(&self, matrix: &Vec<Vec<Cell>>, i: usize, j: usize) -> bool {
        let n = matrix.len();
        // 检查列
        for row_num in 0..n {
            let cell = &matrix[row_num][j];
            if *cell == Cell::Q {
                return false;
            }
        }
        // 检擦斜边 \
        let min = std::cmp::min(i, j);
        // 移动到左上角
        let mut ii = i - min;
        let mut jj = j - min;
        while ii < n && jj < n {
            let cell = &matrix[ii][jj];
            if *cell == Cell::Q {
                return false;
            }
            ii += 1;
            jj += 1;
        }
        // 检擦斜边/
        let min = std::cmp::min(i, n-j -1);
        // 移动到右上角
        let mut ii = i - min;
        let mut jj = j + min;
        // println!("i:{},j:{},{},{}",i,j,ii,jj);
        while ii < n {
            let cell = &matrix[ii][jj];
            if *cell == Cell::Q {
                return false;
            }
            if jj == 0 {
                break;
            }
            ii += 1;
            jj -= 1;
        }

        true
    }

    /* 给访问过的位置加上标记
    fn mark_forbidden(&self, matrix: &mut Vec<Vec<Cell>>, i: usize, j: usize) {
        let n = matrix.len();
        for row in 0..n {
            for col in 0..n {
                // let mut cell = matrix[row][col];
                let row_abs_diff = ((row as i32) - (i as i32)).abs();
                let col_abs_diff = ((col as i32) - (j as i32)).abs();

                if row_abs_diff == 0
                    || col_abs_diff == 0
                    || row_abs_diff == col_abs_diff
                        && matrix[row][col] != Cell::Q
                        && matrix[row][col] != Cell::Forbidden
                {
                    matrix[row][col] = Cell::Forbidden;
                }
            }
        }
    }*/
}
