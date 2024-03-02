// App.JSX
import { render } from 'solid-js/web';
import { StkTable } from './StkTable.jsx';
import {stkTableColumns,stkTableData} from '../stk-table/props.js'


function App() {
  return <div>
    <h1>Solid App</h1>
    <StkTable style="height:300px" columns={stkTableColumns} dataSource={stkTableData}></StkTable>
  </div>;
}
// 组件声明也可以直接用箭头函数
/*
const App = ()=> (<div>Solid My App</div>);
*/

render(() => <App />, document.querySelector('#solid-app'));
