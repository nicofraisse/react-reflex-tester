import React from 'react';
import classes from './LeaderboardScore.module.css';

const leaderboardScore = (props) => {
  return (
    <div className={classes.LeaderboardScore}>
      <div>{ props.index + 1 }</div>
      <div>{ props.scores.name }</div>
      <div>{ props.scores.date }</div>
      <div><strong>{ props.avgScore } ms</strong></div>
    </div>
  );
};

export default leaderboardScore;
