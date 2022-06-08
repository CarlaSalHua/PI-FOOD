import { createStore, applyMiddleware, compose} from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducer';
import thunk from 'redux-thunk';
const composerEnhancer = window._REDUX_DEVTOOLS_COMPOSE_ ||compose;
export const store = createStore(rootReducer, composerEnhancer(applyMiddleware(thunk)));
