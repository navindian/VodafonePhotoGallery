import {createStore,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {rootReducer } from '../Reducers/Reducer'

const initializeStore = () => {
  const store = createStore(
    rootReducer, // Initializing root reducer
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};

export default initializeStore;