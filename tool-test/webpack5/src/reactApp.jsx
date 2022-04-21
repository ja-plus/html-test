import React from 'react';
import ReactDom from 'react-dom';
import AntdTest from './react/antd.jsx';
import HelloMessage from './react/component.jsx';
class App extends React.Component {
  render() {
    return (
      <div style={{ color: '#333' }} className="test test2">
        <h1>hello react</h1>
        <HelloMessage name="hahaha prop" />
        <AntdTest />
      </div>
    );
  }
}
ReactDom.render(<App />, document.getElementById('react-app'));
