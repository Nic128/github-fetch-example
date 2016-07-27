import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

import appReducer from '../../reducers';
import {
  loadRepos,
  reposLoaded,
  repoLoadingError
} from '../../actions';
import { fromJS } from 'immutable';

describe('appReducer', () => {

  let state;

  beforeEach(() => {
    state = fromJS({
      app: {
        loading: false,
        error: false,
        currentUser: false,
        userData: fromJS({
          repositories: false
        })
      }
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).to.equal(expectedResult);
  });

  it('should handle the loadRepos action correctly', () => {
    const username = 'test';
    const expectedResult = state
      .setIn(['app', 'loading'], true)
      .setIn(['app', 'error'], false)
      .setIn(['app', 'currentUser'], username)
      .setIn(['app', 'userData', 'repositories'], false);

    expect(appReducer(state, loadRepos(username))).to.equal(expectedResult);
  });

  it('should handle the reposLoaded action correctly', () => {
    const fixture = [{
      name: 'My Repo'
    }];
    const expectedResult = state
      .setIn(['app', 'userData', 'repositories'], fixture)
      .setIn(['app', 'loading'], false);

    expect(appReducer(state, reposLoaded(fixture))).to.equal(expectedResult);
  });

  it('should handle the repoLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found'
    };
    const expectedResult = state
      .setIn(['app', 'error'], fixture.toString())
      .setIn(['app', 'loading'], false);

    expect(appReducer(state, repoLoadingError(fixture))).to.equal(expectedResult);
  });
});
