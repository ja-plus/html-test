pub mod vector_binary_tree;
use vector_binary_tree::VectorBinaryTree;
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
    let parent_node = binary_tree.get_parent_node(&node);
    println!(
        "node:{:?},left:{:?},right:{:?},parent:{:?}",
        node, left_node.value, right_node.value, parent_node.value
    );
    assert_eq!(left_node.value, Some(1));
    assert_eq!(right_node.value, Some(2));
    assert_eq!(parent_node.value, None);

    let node = binary_tree.get(1, 0);
    let left_node = binary_tree.get_left_node(&node);
    let right_node = binary_tree.get_right_node(&node);
    let parent_node = binary_tree.get_parent_node(&node);

    println!(
        "node:{:?},left:{:?},right:{:?},parent:{:?}",
        node, left_node.value, right_node.value, parent_node.value
    );
    assert_eq!(left_node.value, Some(3));
    assert_eq!(right_node.value, Some(4));
    assert_eq!(parent_node.value, Some(0));

    let node = binary_tree.get(2, 3);
    let left_node = binary_tree.get_left_node(&node);
    let right_node = binary_tree.get_right_node(&node);
    let parent_node = binary_tree.get_parent_node(&node);
    println!(
        "node:{:?},left:{:?},right:{:?},parent:{:?}",
        node, left_node.value, right_node.value, parent_node.value
    );
    assert_eq!(left_node.value, Some(13));
    assert_eq!(right_node.value, Some(14));
    assert_eq!(parent_node.value, Some(2));

    let node = binary_tree.get(3, 0);
    let left_node = binary_tree.get_left_node(&node);
    let right_node = binary_tree.get_right_node(&node);
    let parent_node = binary_tree.get_parent_node(&node);

    println!(
        "node:{:?},left:{:?},right:{:?},parent:{:?}",
        node, left_node.value, right_node.value, parent_node.value
    );
    assert_eq!(left_node.value, Some(15));
    assert_eq!(right_node.value, None);
    assert_eq!(parent_node.value, Some(3));

    let node = binary_tree.get(3, 2);
    let left_node = binary_tree.get_left_node(&node);
    let right_node = binary_tree.get_right_node(&node);
    let parent_node = binary_tree.get_parent_node(&node);

    println!(
        "node:{:?},left:{:?},right:{:?},parent:{:?}",
        node, left_node.value, right_node.value, parent_node.value
    );
    assert_eq!(left_node.value, None);
    assert_eq!(right_node.value, Some(20));
    assert_eq!(parent_node.value, Some(4));
}
