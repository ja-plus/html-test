import React from 'react';
HelloMessage.defaultProps = {
  defaultProp: 'aaaa',
};
export default class HelloMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
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
      </div>
    );
  }
}
