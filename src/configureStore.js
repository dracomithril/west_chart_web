import { routerReducer } from 'react-router-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducers, initialize, middleware } from './reducers';

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default initState => createStoreWithMiddleware(
  combineReducers({
    ...reducers,
    routing: routerReducer,
  }),
  { ...initState, ...initialize() },
);
