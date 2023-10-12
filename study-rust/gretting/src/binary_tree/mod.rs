#[derive(Debug)]
struct Node {
    value: Option<i32>,
    level: i32,
    index: i32,
}
/** 数组实现二叉树 */
struct VectorBinaryTree {
    tree: Vec<Option<i32>>,
}

impl VectorBinaryTree {
    fn new() -> Self {
        VectorBinaryTree { tree: Vec::new() }
    }
    fn new_with_arr(arr: Vec<i32>) -> Self {
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
}

/**
 * 0-               0
 * 1-         1             2
 * 2-     3      4       5      6
 * 3-   7  8   9   10  11 12  13 14
 * 4- 15       
 */
fn main() {
    let mut binary_tree = VectorBinaryTree::new_with_arr((0..16).collect());
    binary_tree.set(4, 5, 20);
    let node = binary_tree.get(0, 0);
    let left_node = binary_tree.get_left_node(&node);
    let right_node = binary_tree.get_right_node(&node);
    println!(
        "node:{:?},left:{:?},right:{:?}",
        node, left_node.value, right_node.value
    );
    assert_eq!(left_node.value, Some(1));
    assert_eq!(right_node.value, Some(2));

    let node = binary_tree.get(1, 0);
    let left_node = binary_tree.get_left_node(&node);
    let right_node = binary_tree.get_right_node(&node);
    println!(
        "node:{:?},left:{:?},right:{:?}",
        node, left_node.value, right_node.value
    );
    assert_eq!(left_node.value, Some(3));
    assert_eq!(right_node.value, Some(4));

    let node = binary_tree.get(2, 3);
    let left_node = binary_tree.get_left_node(&node);
    let right_node = binary_tree.get_right_node(&node);
    println!(
        "node:{:?},left:{:?},right:{:?}",
        node, left_node.value, right_node.value
    );
    assert_eq!(left_node.value, Some(13));
    assert_eq!(right_node.value, Some(14));

    let node = binary_tree.get(3, 0);
    let left_node = binary_tree.get_left_node(&node);
    let right_node = binary_tree.get_right_node(&node);
    println!(
        "node:{:?},left:{:?},right:{:?}",
        node, left_node.value, right_node.value
    );
    assert_eq!(left_node.value, Some(15));
    assert_eq!(right_node.value, None);

    let node = binary_tree.get(3, 2);
    let left_node = binary_tree.get_left_node(&node);
    let right_node = binary_tree.get_right_node(&node);
    println!(
        "node:{:?},left:{:?},right:{:?}",
        node, left_node.value, right_node.value
    );
    assert_eq!(left_node.value, None);
    assert_eq!(right_node.value, Some(20));
}
