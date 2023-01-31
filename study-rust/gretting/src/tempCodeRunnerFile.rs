if data[i] < data[j] {
                i += 1;
                temp_vec.push(data[i]);
            } else {
                // println!("while,i:{},j:{}",i,j);
                count += mid - i + 1;
                temp_vec.push(data[j]);
                j += 1;
            };