import request from '../request';
import sinon from 'sinon';
import { expect } from 'chai';
import axios from 'axios';

describe('request', () => {

  // Before each test, stub the fetch function
  beforeEach(() => {
    sinon.stub(axios, 'get');
  });

  // After each test, restore the fetch function
  afterEach(() => {
    axios.get.restore();
  });

  describe('stubbing successful response', () => {

    // Before each test, pretend we got a successful response
    beforeEach(() => {
      const res = {
        data: { hello: 'world' },
        status: 200,
        headers: {
          'Content-type': 'application/json'
        }
      };

      axios.get.returns(Promise.resolve(res));
    });

    it('should format the response correctly', (done) => {
      request('/thisurliscorrect')
        .catch(done)
        .then((res) => {
          expect(res.data.hello).to.equal('world');
          done();
        });
    });
  });

  describe('stubbing error response', () => {

    // Before each test, pretend we got an unsuccessful response
    beforeEach(() => {
      const res = {
        data: '',
        status: 404,
        statusText: 'Not Found',
        headers: {
          'Content-type': 'application/json'
        }
      };

      axios.get.returns(Promise.resolve(res));

    });

    it('should catch errors', (done) => {
      request('/thisdoesntexist')
        .then((res) => {
          expect(res.err.response.status).to.equal(404);
          expect(res.err.response.statusText).to.equal('Not Found');
          done();
        });
    });

  });

});
