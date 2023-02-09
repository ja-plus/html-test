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

    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     * @param t1 TreeNode类
     * @param t2 TreeNode类
     * @return TreeNode类
     */
    pub fn Mirror(
        &self,
        t1: Option<Box<TreeNode>>,
    ) -> Option<Box<TreeNode>> {
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
                p.left = self.Mirror(p.left);
                p.right = self.Mirror(p.right);
                
                Some(p)
            }
            None => None,
        }
    }

}
