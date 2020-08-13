import React from 'react';
import Toolbar from '../../components/navigation/Toolbar/Toolbar';
import classes from './Layout.module.css'


const Layout = (props) => {
  return (
    <div className={classes.Layout}>
      <Toolbar />
      {props.children}
    </div>
  )
}

export default Layout;
