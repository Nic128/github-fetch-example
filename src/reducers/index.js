/*
 * Combine all available reducers to a single root reducer.
 */

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR
} from '../constants';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: fromJS({
    repositories: false
  })
});

function app(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('currentUser', action.username)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error.toString())
        .set('loading', false);
    default:
      return state;
  }
}

const reducers = { app };
export default combineReducers(reducers);
