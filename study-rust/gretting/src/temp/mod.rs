struct Solution {}
impl Solution {
    pub fn new() -> Self {
        Solution {}
    }
    pub fn relative_sort_array(&self, mut arr1: Vec<i32>, arr2: Vec<i32>) -> Vec<i32> {
        arr1.sort_by(|a, b| {
            println!("{a},{b}");
            let a_val = arr2.iter().position(|x| x == a).unwrap_or(usize::MAX);
            let b_val = arr2.iter().position(|x| x == b).unwrap_or(usize::MAX);
            println!("{a_val},{b_val}");
            if a_val == usize::MAX && b_val == usize::MAX {
               return a.cmp(&b);
            }
            a_val.cmp(&b_val)
        });
        arr1
    }
}

fn main() { 

    let solution = Solution::new();
    // let result = solution.relative_sort_array(
    //     vec![2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
    //     vec![2, 1, 4, 3, 9, 6],
    // );
    // println!("{result:?}");
    // assert_eq!(result,vec![2,2,2,1,4,3,3,9,6,7,19]);

    let result = solution.relative_sort_array(
        vec![28,6,22,8,44,17],
        vec![22,28,8,6],
    );
    println!("{result:?}");
    assert_eq!(result,vec![22,28,8,6,17,44]);
}
