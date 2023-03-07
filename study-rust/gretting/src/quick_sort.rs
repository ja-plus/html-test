pub fn main() {
    // let mut arr = vec![7, 57, 8, 21, 8]; // 有重复数字的数组
    // let mut arr = vec![3, 6, 0, 4, 2, 7];
    // let mut arr = vec![0, 2, 6, 4, 3];
    let mut arr = vec![10,10,9,9,8,7,5,6,4,3,4,2];
    // let mut arr = vec![3, 6, 21, 4, 8, 2, 57, 8, 0, 7];
    let end = arr.len() - 1;
    quick_sort(&mut arr, 0, end);
    // println!("after sort:{:?}", arr);
}
fn quick_sort(arr: &mut Vec<i32>, start: usize, end: usize) {
    if start >= end {
        return;
    }
    if end - start == 1 {
        if arr[start] > arr[end] {
            let tmp = arr[start];
            arr[start] = arr[end];
            arr[end] = tmp;
        }
        return;
    }
    let target = arr[end];
    let mut i = start;
    let mut j = end ;
    // 记录相同值的下标
    let mut vec: Vec<usize> = Vec::new();
    while i < j {
        // println!("i,{},j:{},arri:{},arrj:{}target:{}",i,j,arr[i],arr[j],target);
        if arr[i] > target && arr[j] < target {
            // print!("i:{},",i);
            let tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        } else if arr[i] <= target {
            if arr[i] == target {
                vec.push(i); //记录相同数据的下标
            }
            if i + 1 <= j {
                i += 1;
            } else {
                break;
            }
        } else if arr[j] >= target {
            if arr[j] == target && j !=end {
                vec.push(j); //记录相同数据的下标
            }
            if j - 1 >= i {
                j -= 1;
            } else {
                break;
            }
        }
    }
    // 哨兵变量移动到合适位置。
    let tmp = arr[end];
    arr[end] = arr[j];
    arr[j] = tmp;
    let mid = i;
    // 如果有相同数据；将相同的值移动到中间两侧。
    for index in vec {
        if index < mid {
            i -= 1;
            if i != index {
                let tmp = arr[i];
                arr[i] = arr[index];
                arr[index] = tmp;
            }
        } else {
            j += 1;
            if j != index {
                let tmp = arr[j];
                arr[j] = arr[index];
                arr[index] = tmp;
            }
        }
    }

    println!("i:{},j:{},arr:{:?},start:{},end:{}", i, j, &arr,start,end);
    //left
    if i > 0 {
        quick_sort(arr, start, i-1);
    }
    // right
    quick_sort(arr, j+1, end);
}
