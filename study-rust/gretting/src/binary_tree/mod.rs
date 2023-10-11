struct BinaryTree {
    tree: Vec<i32>,
}
struct Node {
    value: i32,
    level: usize,
    index: usize,
}

impl BinaryTree {
    fn new() -> Self {
        BinaryTree { tree: Vec::new() }
    }
    fn new_with_arr(arr: Vec<i32>) -> Self {
        BinaryTree { tree: arr }
    }
    pub fn add(&mut self, item: i32) {
        self.tree.push(item);
    }
    /**
     * level: 从0开始计数
     * index: 从0开始计数
     */
    pub fn get(&mut self, level: usize, index: usize) -> Node {
        if level == 0 {
            return Node {
                value: self.tree[0],
                level,
                index,
            };
        }
        if index > 2_usize.pow((level + 1) as u32) - 2 {
            panic!("index out of range");
        }
        let arr_index = 2_usize.pow((level - 1) as u32) + index;
        let value = self.tree[arr_index];

        Node {
            value,
            level,
            index,
        }
    }

    pub fn get_node_left(&mut self, node: &Node) -> Node {
        let Node {
            value: _,
            level,
            index,
        } = node;
        let value = self.tree[2_usize.pow(level as u32) - 1 + 2 * index];

        Node {
            value: value,
            level: level + 1,
            index: 2 * index,
        }
    }

    pub fn get_node_right(&mut self, node: &Node) -> Node {
        let Node {
            value: _,
            level,
            index,
        } = node;
        let value = self.tree[2_usize.pow(level as u32) - 1 + 2 * index + 1];
        Node {
            value: value,
            level: level + 1,
            index: 2 * index + 1,
        }
    }
}

fn main() {
    let mut binary_tree = BinaryTree::new_with_arr((0..16).collect());
    let node = binary_tree.get(0, 0);
    let left_node = binary_tree.get_node_left(&node);
    let right_node = binary_tree.get_node_right(&node);
    println!("Hello, world!");
    println!(
        "node.value:{},left:{},right:{}",
        node.value, left_node.value, right_node.value
    );
}
