#[derive(Debug)]
pub struct Node {
    pub value: Option<i32>,
    level: i32,
    index: i32,
}
/** 数组实现二叉树 */
pub struct VectorBinaryTree {
    tree: Vec<Option<i32>>,
}

impl VectorBinaryTree {
    pub fn new() -> Self {
        VectorBinaryTree { tree: Vec::new() }
    }
    pub fn new_with_arr(arr: Vec<i32>) -> Self {
        let tree = arr.iter().map(|x| Some(*x)).collect();
        VectorBinaryTree { tree }
    }
    pub fn add(&mut self, item: i32) {
        self.tree.push(Some(item));
    }
    /**
     * 设置
     * level: 从0开始计数
     * index: 从0开始计数
     */
    pub fn set(&mut self, level: i32, index: i32, value: i32) {
        if level == 0 {
            self.tree[0] = Some(value);
            return;
        }
        if index > 2_i32.pow(level as u32 + 1) - 2 {
            panic!("index out of range");
        }
        let arr_index = 2_i32.pow(level as u32) - 1 + index;
        for _i in self.tree.len()..(arr_index as usize + 1) {
            self.tree.push(None);
        }
        self.tree[arr_index as usize] = Some(value);
    }
    /**
     * level: 从0开始计数
     * index: 从0开始计数
     */
    pub fn get(&mut self, level: i32, index: i32) -> Node {
        if level == 0 {
            return Node {
                value: self.tree.get(0).copied().unwrap_or(None),
                level,
                index,
            };
        }
        if index > 2_i32.pow(level as u32 + 1) - 2 {
            panic!("index out of range");
        }
        let arr_index = 2_i32.pow(level as u32 - 1) + index;
        let value = self.tree.get(arr_index as usize).copied().unwrap_or(None);

        Node {
            value,
            level,
            index,
        }
    }

    pub fn get_last_node(&mut self) -> Node {
        let len = self.tree.len();
        if len == 0 {
            return Node {
                value: None,
                level: -1,
                index: -1,
            };
        } else if len == 1 {
            return Node {
                value: self.tree.last().copied().unwrap_or(None),
                level: 0,
                index: 0,
            };
        }
        let value = self.tree.last().copied().unwrap_or(None);
        let mut level = -1;
        let mut index = 0;
        let mut i = 0;
        while i < len {
            level += 1;
            i += 2_i32.pow(level as u32);
        }
        index = len - 2_i32.pow(level as u32 - 1) + 1;
        Node {
            value,
            level,
            index,
        }
    }

    pub fn get_left_node(&mut self, node: &Node) -> Node {
        let Node {
            value: _,
            level,
            index,
        } = *node;
        let i = 2_i32.pow(level as u32 + 1) - 1 + 2 * index;
        let value = self.tree.get(i as usize).copied().unwrap_or(None);

        Node {
            value,
            level: level + 1,
            index: 2 * index,
        }
    }

    pub fn get_right_node(&mut self, node: &Node) -> Node {
        let Node {
            value: _,
            level,
            index,
        } = *node;
        let i = 2_i32.pow(level as u32 + 1) - 1 + 2 * index + 1;
        let value = self.tree.get(i as usize).copied().unwrap_or(None);
        Node {
            value,
            level: level + 1,
            index: 2 * index + 1,
        }
    }
    pub fn get_parent_node(&mut self, node: &Node) -> Node {
        let Node {
            value: _,
            level,
            index,
        } = *node;
        if level == 0 {
            return Node {
                value: None,
                level: -1,
                index: -1,
            };
        }

        let new_index: f64 = (index / 2).into();

        let i = 2_i32.pow(level as u32 - 1) - 1 + new_index.ceil() as i32;
        let value = self.tree.get(i as usize).copied().unwrap_or(None);
        Node {
            value,
            level: level - 1,
            index,
        }
    }
}
