/**
 * Tests for HomePage sagas
 */

import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';
import { getRepos, getReposWatcher } from '../../sagas';
import { reposLoaded, repoLoadingError } from '../../actions';
import request from '../../utils/request';

describe('getRepos Saga', () => {

  let getReposGenerator;
  const action = { username: 'Nic128' };

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {

    getReposGenerator = getRepos(action);

    const requestURL = `https://api.github.com/users/${action.username}/repos?type=all&sort=updated`;
    const callDescriptor = getReposGenerator.next(action).value;
    expect(callDescriptor).to.deep.equal(call(request, requestURL));

  });

  it('should dispatch the reposLoaded action if it requests the data successfully', () => {
    const response = {
      data: [{
        name: 'First repo'
      }, {
        name: 'Second repo'
      }]
    };
    const putDescriptor = getReposGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(put(reposLoaded(response.data, action.username)));
  });

  it('should call the repoLoadingError action if the response errors', () => {
    const response = {
      err: 'Some error'
    };
    const putDescriptor = getReposGenerator.next(response).value;
    expect(putDescriptor).to.deep.equal(put(repoLoadingError(response.err)));
  });

});

describe('getReposWatcher Saga', () => {

  const getReposWatcherGenerator = getReposWatcher();

  it('should watch for LOAD_REPOS action and invoke getRepos saga on actions', () => {
    const callDescriptor = getReposWatcherGenerator.next().value;
    expect(callDescriptor.name).to.equal('takeLatest(LOAD_REPOS, getRepos)');
  });

});
