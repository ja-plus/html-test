import React from 'react';
class Child extends React.Component {
  constructor(props) {
    super(props);
  }
  /** like computed */
  get doubleNum() {
    return this.props.num * 2;
  }
  render() {
    return (
      <div>
        <h2>child</h2>
        <div>
          num: {this.props.num}, doubleNum: {this.doubleNum}
        </div>
        <input type="text" value={this.props.num} onChange={this.handleInputChange.bind(this)} />
      </div>
    );
  }
  handleInputChange(e) {
    this.props.changeNum(e.target.value);
  }

  refFunc() {
    console.log('child ref func');
  }
}
export default class HelloMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date(), num: 0 };
    this.childRef = React.createRef();
  }

  componentDidMount() {
    console.log('component Mount');
  }
  componentWillUnmount() {
    console.log('component will unmount');
  }
  render() {
    return (
      <div>
        <h1>
          Hello {this.props.name} {this.state.date.toLocaleDateString()}
        </h1>
        <h2>{this.props.defaultProp}</h2>
        <button onClick={this.handleClick.bind(this)}>click{this.state.num}</button>

        <ul>{this.list()}</ul>
        <Child /* ref="child" */ ref={this.childRef} num={this.state.num} changeNum={this.handleChangeNum.bind(this)}></Child>
      </div>
    );
  }

  handleClick(e) {
    console.log('click button', e);
    // console.log('findDomNode', this.findDOMNode());
    // this.replaceState({ num: this.state.num++ });
    // this.refs.child.refFunc();
    this.childRef.current.refFunc(); // current?
    this.setState(state => {
      state.num++;
      return state;
    });
  }

  handleChangeNum(val) {
    this.setState(state => {
      state.num = val;
      return state;
    });
  }

  list() {
    let els = [];
    for (let i = 0; i < 3; i++) {
      els.push(<li key={i}>{i}</li>);
    }
    return els;
  }
}
// HelloMessage 一定在声明后使用
HelloMessage.defaultProps = {
  defaultProp: 'aaaa',
};
