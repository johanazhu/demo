import React from "react";

class SetStateDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
    this.onHandleClick = this.onHandleClick.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps", state.count);
    return null;
  }

  shouldComponentUpdate(props, state) {
    console.log("shouldComponentUpdate", state.count);
    // 如果 shouldComponentUpdate() 返回值为 false，则不会调用 componentDidUpdate()。
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate", prevState.count);
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", prevState.count);
  }

  onHandleClick() {
    //   this.setState 对象模式
    this.setState({
      count: this.state.count + 1,
    });
    //   this.setState 对象模式之第二参数为回调模式
    // this.setState(
    //   {
    //     count: this.state.count + 1,
    //   },
    //   () => {
    //     console.log("点击之后的回调", this.state.count);
    //   }
    // );
    // this.setState 函数模式
    // this.setState(state => {
    //   console.log("函数模式", state.count);
    //   return { count: state.count + 1 };
    // });
  }

  render() {
    console.log("render", this.state.count);
    return (
      <div>
        <div onClick={this.onHandleClick}>{this.state.count}</div>
      </div>
    );
  }
}

export default SetStateDemo;
