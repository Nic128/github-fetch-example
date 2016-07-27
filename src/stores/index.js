import { createStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import { getReposWatcher } from '../sagas';
import reducers from '../reducers';

export default function(initialState = {}) {

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    fromJS(initialState),
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(getReposWatcher);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
