// App.JSX
import { render } from 'solid-js/web';

function App() {
  return <div>Solid My App</div>;
}
// 组件声明也可以直接用箭头函数
/*
const App = ()=> (<div>Solid My App</div>);
*/

render(() => <App />, document.querySelector('#solid-app'));
