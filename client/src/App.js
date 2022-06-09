import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'
function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <h1>Healthy Food Web</h1>
          <h4>Find your best healthy recipe!</h4>
          <Route exact path='/' component={LandingPage}/>

          <Route exact path= '/home' component={Home}/>
          <Route></Route>
          <Route></Route>
          <Route></Route>
        </div>
      </BrowserRouter>
  );
}

export default App;
