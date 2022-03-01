import React from "react";
import ReactDom from "react-dom";
class App extends React.Component {
  render() {
    return (
      <div style={{ color: "#333" }} className="test test2">
        <h1>hello react</h1>
      </div>
    );
  }
}
ReactDom.render(<App />, document.getElementById("react-app"));
