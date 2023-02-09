/**
 * 所有权
*/
#[derive(PartialEq, Eq, Debug, Clone)]
pub struct TreeNode {
    pub val: i32,
    pub left: Option<Box<TreeNode>>,
    pub right: Option<Box<TreeNode>>,
}

impl TreeNode {
    #[inline]
    fn new(val: i32) -> Self {
        TreeNode {
            val: val,
            left: None,
            right: None,
        }
    }
}

struct Solution {}

impl Solution {
    fn new() -> Self {
        Solution {}
    }
    pub fn Mirror(&self, t1: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
        // write code here
        // self.recursion(t1, t2)
        match t1 {
            Some(mut p) => {
                // let tmp = p.right;
                // p.right = self.Mirror(p.left);
                // p.left = self.Mirror(tmp);
                // Some(p)
                // let left = self.Mirror(p.left);
                // let right = self.Mirror(p.right);
                // p.left = right;
                // p.right = left;

                let tmp = p.right;
                p.right = p.left;
                p.left = tmp;
                // self.Mirror(p.left);// p.left 被借走，不重新获得所有权的话，返回的p会报错，表示p的部分被借走
                // self.Mirror(p.right);
                p.left = self.Mirror(p.left);
                p.right = self.Mirror(p.right);

                Some(p)
            }
            None => None,
        }
    }
}
