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

  roundNumber = (num, decimal) => Math.round(num * decimal) / decimal;

  avg = (scores) => {
    const avgScore = scores.stats.reduce((a, b) => a + b) / scores.stats.length;
    return this.roundNumber(avgScore, 1)
  }


  render() {
    const allScores = this.state.scores
    .sort((s1, s2) => this.avg(s1) - this.avg(s2))
    .map((scores, index) => {
      return <LeaderboardScore scores={scores} index={index} avgScore={this.avg(scores)}/>
    });
    return (
      <div className={classes.Leaderboard}>
        <h1 className="mt-3">Leaderboard</h1>
        <div className={classes.ScoreList}>
          { allScores }
        </div>
      </div>
    );
  }
}

export default Leaderboard;
