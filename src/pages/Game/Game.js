import React, { Component } from 'react';
import classes from './Game.module.css';
import Square from '../../components/game/Square/Square';
import GameStats from '../../components/game/GameStats/GameStats';
import WelcomePage from '../WelcomePage/WelcomePage'
import Loader from '../../hoc/Loader.js'
import axios from 'axios';

const RED = 'rgb(245, 110, 104)';
const WHITE = '#aaa';

class Game extends Component {
  state = {
    squareColor: WHITE,
    attemptData: [],
    timeRemaining: 61,
    gameEnded: false,
    gameStarted: false,
    playerName: null,
    successfulGame: true
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
    const firstTime = this.randomlyBecomeRed(1000, 8000);
    const oneSecInterval = setInterval(() => {
        if (this.state.timeRemaining === 1) {
          clearInterval(oneSecInterval);
          this.manageGameEnd();
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

  constructDate(datetime) {
    const date = datetime.getFullYear()+'/'+(datetime.getMonth()+1)+'/'+datetime.getDate();
    const time = datetime.getHours() + ":" + datetime.getMinutes();
    return date + ', ' + time;
  }

  manageGameEnd() {
    this.setState({gameEnded: true});
    const game = {
      name: this.state.playerName,
      stats: this.state.attemptData,
      date: this.constructDate(new Date)
    }
    if (this.state.attemptData.length >= 5) {
      axios.post('https://reflex-game-41594.firebaseio.com/games.json', game)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    } else {
      this.setState({
        successfulGame: false
      })
    }
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
        setTimeout(() => {
          this.startGame()
        }, 2000)
      }
      gameReveal = (
        <div className={classes.Game}>
          <h1>Click the square when it becomes red.</h1>
          <div style={{display: 'flex'}}>
            <Loader>
              <Square click={(e) => this.squareClickHandler((new Date().getTime()).toString().slice(7))} color={this.state.squareColor} />
            </Loader>
            <div style={{flexGrow: 1}}>
              <GameStats gameData={this.state.attemptData} />
            </div>
          </div>
          {this.state.gameStarted ?
            this.state.timeRemaining < 1 && this.state.successfulGame ? <p className={classes.TimeRemaining}>Great job! Your score has been saved to the <strong>leaderboard</strong> ✅</p>
              : !this.state.successfulGame ? <p className={classes.TimeRemaining}>You have less than 5 records, your data could not be saved 😢</p>
              : <p className={classes.TimeRemaining}>{this.state.timeRemaining} seconds remaining</p>
              : <p className={classes.TimeRemaining}>Get ready...</p>}

        </div>
      );
    }
    return gameReveal;
  }
};

export default Game;
