import React from 'react';
import './App.css';
import Game from './pages/Game/Game';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Layout from './hoc/Layout/Layout';
import Aux from './hoc/Aux';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Layout>
        <Route path="/game" exact component={Game} />
        <Route path="/leaderboard" component={Leaderboard} />
      </Layout>
    </div>
  );
}

export default App;
