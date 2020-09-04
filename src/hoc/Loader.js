import React, { Component } from 'react';
import classes from './Loader.module.css'

class Loader extends Component {
  state = {
    count: 3,
  }
  render() {
    setTimeout(() => {
      this.setState({
        count: this.state.count - 1
      })}
      , 1000)
    return (
      <div class={this.state.count > 0 ? classes.Loader : null}>
        {
          (this.state.count > 0) ? this.state.count : this.props.children
        }
      </div>
    )
  }
}

export default Loader;
