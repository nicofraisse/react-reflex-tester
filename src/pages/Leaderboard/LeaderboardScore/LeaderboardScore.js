import React from 'react';
import classes from './LeaderboardScore.module.css';

const leaderboardScore = (props) => {
  let betterScoreDate = '';
  const date = props.scores.date;
  if (props.scores.date) {
    let minutes = date.split(':')[date.split(':').length - 1]
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    betterScoreDate = date.split(':').slice(0, date.split(':').length - 1).join('') + ':' + minutes;
  }
  return (
    <div className={classes.LeaderboardScore}>
      <div style={{width: '10%'}} className={'text-left'}>{ props.index + 1 }</div>
      <div style={{width: '41%'}} className={'text-left'}>{ props.scores.name }</div>
      <div style={{width: '27%'}} className={['text-right', classes.datetime].join(' ')}>{ betterScoreDate }</div>
      <div style={{width: '23%'}} className={['text-right', classes.datenotime].join(' ')}>{ betterScoreDate.substring(0, betterScoreDate.lastIndexOf(',')) }</div>
      <div style={{width: '22%'}} className={'text-right'}><strong>{ props.avgScore } ms</strong></div>
    </div>
  );
};

export default leaderboardScore;
