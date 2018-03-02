import { routerReducer } from 'react-router-redux';
import { combineReducers, createStore } from 'redux';
import reducers from './reducers/reducers';

export default initState =>
  createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer,
    }),
    initState,
  );
