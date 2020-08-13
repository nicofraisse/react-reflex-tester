import React from 'react';
import classes from './LeaderboardScore.module.css';

const leaderboardScore = (props) => {
  console.log(props.scores.stats)
  const averageScore = props.scores.stats.reduce((a, b) => a + b) / props.scores.stats.length
  return (
    <div className={classes.LeaderboardScore}>
      <div>{ props.scores.name }</div>
      <div>{ averageScore }</div>
    </div>
  );
};

export default leaderboardScore;
