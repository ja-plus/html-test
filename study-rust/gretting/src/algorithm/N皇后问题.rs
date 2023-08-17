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

        let matrix: Vec<Vec<Cell>> = vec![vec![Cell::Empty; n as usize];n as usize];
        /* 计数 */
        let mut count = 0;
        self.recursion(matrix, &mut count, 0);
        count
    }
    fn recursion(&self, mut matrix: Vec<Vec<Cell>>, count: &mut i32, row_index: usize) {
        let n: usize = matrix.len();
        if row_index >= n {
            *count += 1;
            return;
        }
        for i in row_index..n {
            let mut empty_count = 0;
            for j in 0..n {
                let cell = &matrix[i][j];
                if *cell == Cell::Empty {
                    empty_count += 1;

                    let mut clone_matrix = matrix.clone();
                    clone_matrix[i][j] = Cell::Q;

                    self.mark_forbidden(&mut clone_matrix, i, j);
                    self.recursion(clone_matrix, count, row_index + 1);
                    /** 这里用回溯性能更好 */

                }
            }
            if empty_count < (n - row_index){
                break;
            } 
        }
    }
    /** 标记禁用格 */
    fn mark_forbidden(&self, matrix: &mut Vec<Vec<Cell>>, i: usize, j: usize) {
        let n = matrix.len();
        for row in 0..n {
            for col in 0..n {
                // let mut cell = matrix[row][col];
                let row_abs_diff = ((row as i32) - (i as i32)).abs();
                let col_abs_diff = ((col as i32) - (j as i32)).abs();

                if  row_abs_diff == 0 || col_abs_diff == 0 || row_abs_diff == col_abs_diff
                    && matrix[row][col] != Cell::Q &&  matrix[row][col] != Cell::Forbidden
                {
                    matrix[row][col] = Cell::Forbidden;
                }
            }
        }
    }
}
