import { expect } from 'chai';
import configureStore from '../../stores';

describe('configureStore', () => {

  let store;

  before(() => {
    store = configureStore();
  });

  describe('dispatch', () => {

    it('should be defined function', () => {
      expect(typeof store.dispatch).to.equal('function');
    });

  });

});
