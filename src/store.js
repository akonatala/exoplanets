import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer.js';

const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(ReduxThunk)
  );

  return store;
}

export default configureStore