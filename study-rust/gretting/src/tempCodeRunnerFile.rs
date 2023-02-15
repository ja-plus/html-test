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

struct Solution{

}

impl Solution {
    fn new() -> Self {
        Solution{}
    }

    /**
    * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
    *
    * 
        * @param root TreeNode类 
        * @return bool布尔型
    */
    pub fn isCompleteTree(&self, root: Option<Box<TreeNode>>) -> bool {
        let mut vec:Vec<i32> = Vec::new();
        self.recursion( root,&mut vec,0);
        println!("{:?}",&vec);
        for i in 0..vec.len() -2 {
        
            if (2 as i32).pow(i as u32) != vec[i] {return false;} 
        }
        false
    }

    fn recursion(&self, node: Option<Box<TreeNode>>,vec:&mut Vec<i32>,level:usize){
        match node {
            Some(n) => {
                if let Some(item) = vec.get(level){
                    vec[level] +=1;
                }
                self.recursion(n.left,vec,level +1,);
                self.recursion(n.right,vec,level+1);
            },
            None => {
                if vec.get(level) == None{
                    println!("{}level",level);
                    vec.push(0);
                }
            }
        };

    }
}