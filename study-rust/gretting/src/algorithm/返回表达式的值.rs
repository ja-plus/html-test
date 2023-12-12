/**表达式求值 */
pub fn main() {
    let solution = Solution::new();
    // let result = solution.solve(String::from("1+2*3"));
    let result = solution.solve(String::from("(12*(3-4))*5"));
    println!("result:{}", result);
}

struct Solution {}

impl Solution {
    fn new() -> Self {
        Solution {}
    }

    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     * 返回表达式的值
     * @param s string字符串 待计算的表达式
     * @return int整型
     */
    pub fn solve(&self, s: String) -> i32 {
        // write code here
        if s.len() == 0 {
            return 0;
        }
        let new_s = s;
        let chars: Vec<char> = new_s.chars().collect();
        let mut new_vec: Vec<String> = Vec::new();
        let mut temp = String::from("");
        // 切分字符串 如["1", "+", "23"]
        for c in chars {
            if c.is_ascii_digit() {
                // 数字
                temp += &c.to_string();
            } else {
                if temp.len() > 0 {
                    new_vec.push(temp);
                    temp = String::from("");
                }
                new_vec.push(c.to_string());
            }
        }
        if temp.len() > 0 {
            new_vec.push(temp);
        }
        // println!("new_vec:{:?}", new_vec);

        let mut op_stack: Vec<String> = Vec::new();
        let mut num_stack: Vec<i32> = Vec::new();

        for item in &new_vec {
            if self.priority(item) > 0 {
                // 符号
                self.insert_op(&mut op_stack, &mut num_stack, &item);
            } else {
                // 数字
                let num = item.parse::<i32>().unwrap();
                num_stack.push(num);
            }
        }
        while op_stack.len() > 0 {
            self.digest_op_stack(&mut op_stack, &mut num_stack);
        }
        // println!("result:{:?}", &num_stack);
        num_stack[0]
    }
    fn priority(&self, op: &str) -> u8 {
        if op == "+" || op == "-" {
            return 1;
        } else if op == "*" || op == "/" {
            return 2;
        } else if op == "(" || op == ")" {
            return 3;
        } else {
            return 0;
        }
    }
    fn calc_num(&self, a: i32, op: &str, b: i32) -> i32 {
        if op == "+" {
            return a + b;
        } else if op == "-" {
            return a - b;
        } else if op == "*" {
            return a * b;
        } else if op == "/" {
            return a / b;
        } else {
            panic!("Not support operator: \"{}\"", op);
        }
    }
    fn digest_op_stack(&self, op_stack: &mut Vec<String>, num_stack: &mut Vec<i32>) {
        let b = num_stack.pop().unwrap();
        let a = num_stack.pop().unwrap();
        let op = op_stack.pop().unwrap();

        // println!("a:{},b{},op:{}",a,b,op);
        // 计算
        let result = self.calc_num(a, &op, b);
        num_stack.push(result);
    }
    fn insert_op(&self, op_stack: &mut Vec<String>, num_stack: &mut Vec<i32>, item: &str) {
        if op_stack.len() == 0 {
            op_stack.push(item.to_string());
        } else {
            // 判断栈顶操作符与当前操作符的优先级
            let top_op = &op_stack[op_stack.len() - 1];
            if item == ")" {
                // 如果准备入栈操作符为")",则计算"(" 之后的数字
                while op_stack[op_stack.len() - 1] != "(" {
                    self.digest_op_stack(op_stack, num_stack);
                }
                if op_stack[op_stack.len() - 1] == "(" {
                    op_stack.pop(); // pop "("
                }
            } else if top_op == "(" || self.priority(item) > self.priority(top_op) {
                op_stack.push(item.to_string());
            } else {
                //优先级 <= 栈顶优先级
                self.digest_op_stack(op_stack, num_stack);
                self.insert_op(op_stack, num_stack, item);
            }
        }
    }
}
