import React, { Component } from 'react';
import classes from './WelcomePage.module.css'

class WelcomePage extends Component {
  state = {
    name: null
  }

  updateName = (event) => {
    this.setState({name: event.target.value})
  }

  render() {
    return (
      <div className={classes.WelcomePage}>
        <h1>Welcome to React-ion game</h1>
        <p>Test your reflexes! It's very simple: You will have to click on the big square as soon as it becomes <span style={{color: 'rgb(245, 110, 104)', fontWeight: 'bold'}}>red</span>! FYI, it will ranomply change color every 1 to 10 seconds. The test lasts for 1 minute. Enjoy!</p>

        <div>
          <label htmlFor="nameInput"><h5>Enter your nickname to get started:</h5></label>
          <form>
            <div className="form-inline text-left">
              <input type="text" id="nameInput" onChange={this.updateName} placeholder="Your name" className="form-control mr-3"/>

              <input type="submit" value="Play!" onClick={(event) => this.props.submit(event, this.state.name)} className="btn btn-success" style={{border: '1px solid rgba(133, 188, 122, 1.00)', backgroundColor: 'rgba(133, 188, 122, 1.00)'}}/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default WelcomePage
