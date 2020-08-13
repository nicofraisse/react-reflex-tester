import React from 'react';
import classes from './Square.module.css';

const square = (props) => (
  <div
  className={classes.Square}
  style={{backgroundColor: props.color}}
  onClick={props.click}/>
);

export default square;
