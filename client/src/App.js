import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <h1>Healthy Food Web</h1>
          <h4>Find your best healthy recipe!</h4>
          <Route></Route>
          <Route></Route>
          <Route></Route>
          <Route></Route>
          <Route></Route>
        </div>
      </BrowserRouter>
  );
}

export default App;
