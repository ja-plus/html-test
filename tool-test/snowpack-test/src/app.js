import aa from './a.js';
import './style.css';
import './style1.less';
// import './style.less';// 同名情况
import './style2.scss';
let a = document.createElement('a');
a.textContent = 'hahahaha';
a.href = 'http://www.baidu.com';
document.body.appendChild(a);
console.log(aa);

let ad = 2 ** 2;
let arr = [1, 2, 3];
let arr2 = [...arr];

class Parent{}