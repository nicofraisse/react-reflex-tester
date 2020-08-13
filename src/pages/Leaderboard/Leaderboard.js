import React, { Component } from 'react';
import LeaderboardScore from './LeaderboardScore/LeaderboardScore';
import classes from './Leaderboard.module.css'
import axios from 'axios';

class Leaderboard extends Component {
  state = {
    scores: [],
    loading: true
  }

  componentDidMount() {
    axios.get('https://reflex-game-41594.firebaseio.com/games.json')
      .then(response => {
        const dataHash = response.data
        const dataArr = []
        Object.keys(dataHash).forEach((k) => {
          dataArr.push(dataHash[k])
        });
        console.log(dataArr)
        this.setState({
          scores: dataArr,
          loading: false
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const allScores = this.state.scores.map((score) => {
      return <LeaderboardScore scores={score} />
    });
    return (
      <div className={classes.Leaderboard}>
        <h1>Leaderboard</h1>
        <div>
          { allScores }
        </div>
      </div>
    );
  }
}

export default Leaderboard;
