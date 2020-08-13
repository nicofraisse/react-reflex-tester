import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Toolbar.module.css'

const Toolbar = (props) =>  {
  return (
    <nav className={classes.Toolbar}>
      <NavLink to="/game" activeClassName={classes.active}>Play game</NavLink>
      <NavLink to="/leaderboard" activeClassName={classes.active}>Leaderboard</NavLink>
    </nav>
  )
}

export default Toolbar;
