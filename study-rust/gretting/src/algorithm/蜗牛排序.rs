
fn main() {
    let source_arr = vec![
        19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15,
    ];
    println!("{:?}", source_arr);
    let res = run(5, 4, source_arr);
    assert_eq!(
        res,
        [
            [19, 17, 16, 15],
            [10, 1, 14, 4],
            [3, 2, 12, 20],
            [7, 5, 18, 11],
            [9, 8, 6, 13]
        ]
    );
    println!("result:{:?}", res);

    let source_arr = vec![1, 2, 3, 4];
    println!("{:?}", source_arr);
    let res = run(1, 4, source_arr);
    assert_eq!(res, [[1, 2, 3, 4]]);
    println!("result:{:?}", res);

    let source_arr = vec![4, 3, 2, 1];
    println!("{:?}", source_arr);
    let res = run(4, 1, source_arr);
    assert_eq!(res, [[4], [3], [2], [1]]);
    println!("result:{:?}", res);

    let source_arr = vec![1, 3];
    println!("{:?}", source_arr);
    let res = run(2, 2, source_arr);
    assert_eq!(res.len(), 0);
    println!("result:{:?}", res);

    let source_arr = vec![1, 2, 3, 4];
    println!("{:?}", source_arr);
    let res = run(2, 2, source_arr);
    assert_eq!(res, [[1, 4], [2, 3]]);
    println!("result:{:?}", res);

    let source_arr = vec![];
    println!("{:?}", source_arr);
    let res = run(2, 2, source_arr);
    assert_eq!(res.len(), 0);
    println!("result:{:?}", res);
}

#[derive(PartialEq)]
enum Pos {
    Down,
    Up,
    Right,
}
/**
 * 常规法，通过向量控制运行方向
 * 更优解：通过矩阵坐标得到当前点在给定一维数组中的位置。
 */
fn run(row: usize, col: usize, source: Vec<i32>) -> Vec<Vec<i32>> {
    if source.len() != row * col {
        return vec![];
    }
    let mut i: usize = 0;
    let mut j: usize = 0;
    let mut k: Pos = Pos::Right;
    let mut result = vec![vec![0; col]; row];
    
    for item in source {
        // println!("{},{}", i, j);
        result[i][j] = item;

        if i == 0 {
            if k == Pos::Up {
                k = Pos::Right;
            } else {
                k = Pos::Down;
            }
        } 
        if i == row - 1 {
            if k == Pos::Down {
                k = Pos::Right;
            } else {
                k = Pos::Up;
            }
        }

        // move
        if k == Pos::Down {
            i += 1;
        } else if k == Pos::Up {
            i -= 1;
        } else if k == Pos::Right {
            j += 1;
        }
    }

    result
}
