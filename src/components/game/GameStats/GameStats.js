import React from 'react';
import classes from './GameStats.module.css';

const gameStats = (props) => {
  const gameDataList = props.gameData.map((data) => {
    let addMessage = null;
    if (data > 500) {
      addMessage = '(bro u slow)'
    } else if (data < 325) {
      addMessage = '(lad u fast)'
    }
    return <li>{data} ms {addMessage}</li>
  })
  let averageStr = null
  if (props.gameData.length > 0) {
    const averageTime = props.gameData.reduce((a, b) => a + b) / gameDataList.length
    averageStr = `Average: ${Math.round(averageTime)} ms`
  }

  return (
    <div className={classes.GameStats}>
      <h2>Your performance</h2>
      <ul>
        {gameDataList}
      </ul>
      <p>{averageStr}</p>
    </div>
  );

};

export default gameStats;
