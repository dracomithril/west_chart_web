
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { initialize, middleware, reducers } from './reducers';

const composeEnhancers = composeWithDevTools({});


export default initState => createStore(
  reducers,
  { ...initState, ...initialize() },
  composeEnhancers(
    applyMiddleware(...middleware),
  ),
);
