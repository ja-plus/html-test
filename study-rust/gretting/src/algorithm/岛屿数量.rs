use std::collections::HashSet;
struct Solution {}

impl Solution {
    fn new() -> Self {
        Solution {}
    }

    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     * 判断岛屿数量
     * @param grid char字符型二维数组
     * @return int整型
     */
    pub fn solve(&self, mut grid: Vec<Vec<char>>) -> i32 {
        // write code here
        let mut count = 0;
        // let mut visited_set: HashSet<String> = HashSet::new();
        for i in 0..grid.len() {
            for j in 0..grid[i].len() {
                let ch = grid[i][j];
                if ch == '0' || ch == '2' {
                    // 跳过 0 的判断，'2' 表示已遍历
                    continue;
                }
                // let id = i.to_string() + "_" + &j.to_string();
                // if !visited_set.contains(&id) {
                self.deep_search(&mut grid, /* &mut visited_set, */ i, j);
                count += 1;
                // }
            }
        }
        count
    }
    /**深度优先遍历*/
    pub fn deep_search(
        &self,
        grid: &mut Vec<Vec<char>>,
        // visited_set: &mut HashSet<String>,
        x: usize,
        y: usize,
    ) {
        if let Some(row) = grid.get_mut(x) {
            if let Some(ch) = row.get_mut(y) {
                if *ch == '0' || *ch == '2' {
                    return;
                }
                // let id: String = x.to_string() + "_" + &y.to_string();
                // if visited_set.contains(&id) {
                //     return;
                // }
                // visited_set.insert(id);
                // 上面原本用HashSet判断是否访问，现在直接把原数组改变
                *ch = '2';
                // 四个方向查找
                self.wide_search(grid, /* visited_set,  */ x - 1, y);
                self.wide_search(grid, /* visited_set,  */ x + 1, y);
                self.wide_search(grid, /* visited_set,  */ x, y - 1);
                self.wide_search(grid, /* visited_set,  */ x, y + 1);
            }
        }
    }
}
