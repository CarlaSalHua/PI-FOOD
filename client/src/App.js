import './App.css';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import RecipeCreate from './components/RecipeCreate/RecipeCreate';

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path= '/home' component={Home}/>
             
          <Route exact path='/newRecipe' component={RecipeCreate}/>
          </Switch>          
          {/* <Route></Route>
          <Route></Route> */}
        </div>
      </BrowserRouter>
  );
}

export default App;
//aplicar module.css