import React from 'react';
import classes from './GameStats.module.css';

const gameStats = (props) => {
  const gameDataList = props.gameData.map((data) => {
    let addMessage = null;
    // const broUslow = ['🐢', '👵🏼', '😡', '😢']
    const broUslow = ['🐢']
    // const ladUfast = ['✈️', '🚀', '🏃‍♀️', '💯']
    const ladUfast = ['💯']
    const palUnormal = ['🆗']
    if (data > 420) {
      addMessage = broUslow[Math.floor(Math.random() * broUslow.length)];
    } else if (data < 280) {
      addMessage = ladUfast[Math.floor(Math.random() * ladUfast.length)];
    }
    return <div className={classes.GameStat}>{data} ms {addMessage}</div>
  })

  let averageStr = null
  if (props.gameData.length > 0) {
    const averageTime = props.gameData.reduce((a, b) => a + b) / gameDataList.length
    averageStr = `(Average: ${Math.round(averageTime)} ms)`
  }

  return (
    <div className={classes.GameStats}>
      <h3 className={classes.GameStatsTitle}>Your performance {averageStr}</h3>
      <div className={classes.GameStatsList}>
        {gameDataList}
      </div>
    </div>
  );

};

export default gameStats;
