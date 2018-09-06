import { routerReducer } from 'react-router-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { reducers, initialize, middleware } from './reducers';

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});
export default initState => createStore(
  rootReducer,
  { ...initState, ...initialize() },
  composeEnhancers(
    applyMiddleware(...middleware),
  ),
);
