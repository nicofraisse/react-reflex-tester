import React, { Component } from 'react';
import classes from './Game.module.css';
import Square from '../../components/game/Square/Square';
import GameStats from '../../components/game/GameStats/GameStats';
import WelcomePage from '../WelcomePage/WelcomePage'
import axios from 'axios';

const RED = 'rgb(245, 110, 104)';
const WHITE = '#aaa';

class Game extends Component {
  state = {
    squareColor: WHITE,
    attemptData: [],
    timeRemaining: 60,
    gameEnded: false,
    gameStarted: false,
    playerName: null
  }

  makeColorWhite = () => {
    this.setState({
      squareColor: WHITE
    })
  }

  makeColorRed = () => {
    this.setState({
      squareColor: RED
    })
  }

  randomNumber = (min, max) => min + Math.random() * (max - min)

  startGame() {
    const firstTime = this.randomlyBecomeRed(2000, 8000);
    const oneSecInterval = setInterval(() => {
        if (this.state.timeRemaining === 1) {
          clearInterval(oneSecInterval)
          this.manageGameEnd()
        }
        this.setState((prevState) => {
          return {
            timeRemaining: this.state.timeRemaining - 1,
            gameStarted: true
          };
        })
      }
    , 1000)
  }

  manageGameEnd() {
    this.setState({gameEnded: true});
    const game = {
      name: this.state.playerName,
      stats: this.state.attemptData
    }

    axios.post('https://reflex-game-41594.firebaseio.com/games.json', game)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  randomlyBecomeRed = (min, max) => {
    const randomRedTimeout = setTimeout(() => {
      if (this.state.gameEnded) {
        clearTimeout(randomRedTimeout);
        return;
      }
      const redDate = (new Date().getTime()).toString().slice(7);
      this.makeColorRed();
      this.setState({
        becameRedTimestamp: redDate
      })
    }, this.randomNumber(min, max))
  }

  squareClickHandler = (time) => {
    if (this.state.gameEnded) return;
    if (this.state.squareColor === RED) {
      this.setState({
        attemptData: this.state.attemptData.concat(time - this.state.becameRedTimestamp)
      });
      this.makeColorWhite();
      this.randomlyBecomeRed(1000, 8000);
    }
    else {
      alert('please take it easy')
    }
  }

  handleSubmit = (event, value) => {
    event.preventDefault()
    this.setState({playerName: value})
  }

  render() {
    let gameReveal = <WelcomePage submit={this.handleSubmit}/>
    if (this.state.playerName) {
      if (!this.state.gameStarted) {
        this.startGame()
      }
      gameReveal = (
        <div className={classes.Game}>
          <h1>Click the square when it becomes red.</h1>
          <div style={{display: 'flex'}}>
            <Square click={(e) => this.squareClickHandler((new Date().getTime()).toString().slice(7))} color={this.state.squareColor} />
            <div style={{flexGrow: 1}}>
              <p style={{textAlign: 'center'}}>Time remaining: {this.state.timeRemaining}</p>
              <GameStats gameData={this.state.attemptData} />
            </div>
          </div>
        </div>
      );
    }
    return gameReveal;
  }
};

export default Game;
