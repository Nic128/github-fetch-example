import { expect } from 'chai';

import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR
} from '../../constants';

import {
  loadRepos,
  reposLoaded,
  repoLoadingError
} from '../../actions';

describe('App Actions', () => {

  describe('loadRepos', () => {

    it('should return the correct type', () => {
      const username = 'test';
      const expectedResult = {
        type: LOAD_REPOS,
        username
      };
      expect(loadRepos(username)).to.deep.equal(expectedResult);
    });

  });

  describe('reposLoaded', () => {

    it('should return the correct type and the passed repos', () => {
      const fixture = ['Test'];
      const expectedResult = {
        type: LOAD_REPOS_SUCCESS,
        repos: fixture
      };
      expect(reposLoaded(fixture)).to.deep.equal(expectedResult);
    });

  });

  describe('repoLoadingError', () => {

    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!'
      };
      const expectedResult = {
        type: LOAD_REPOS_ERROR,
        error: fixture
      };
      expect(repoLoadingError(fixture)).to.deep.equal(expectedResult);
    });

  });

});
