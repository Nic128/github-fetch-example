/**
 * Gets the repositories of the user from Github
 */

import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { LOAD_REPOS } from '../constants';
import { reposLoaded, repoLoadingError } from '../actions';

import request from '../utils/request';

/**
 * Github repos request/response handler
 */
export function* getRepos(action) {

  const requestURL = `https://api.github.com/users/${action.username}/repos?type=all&sort=updated`;

  // Call our request helper (see 'utils/request')
  const repos = yield call(request, requestURL);

  if (!repos.err) {
    yield put(reposLoaded(repos.data, action.username));
  } else {
    yield put(repoLoadingError(repos.err));
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* getReposWatcher() {
  yield takeLatest(LOAD_REPOS, getRepos);
}
