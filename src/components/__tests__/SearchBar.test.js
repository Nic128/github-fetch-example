import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import SearchBar from '../SearchBar';

describe('SearchBar component', () => {

  let wrapper;

  const defaultProps = {
    error: false,
    currentUser: false,
    actions: {
      loadRepos: sinon.spy()
    }
  }

  beforeEach(() => {
    wrapper = shallow(<SearchBar {...defaultProps} />);
  });

  describe('should render', () => {

    it('with AutoForm and Textfield within', () => {
      let form = wrapper.find('AutoForm');
      expect(form).to.have.length(1);
      expect(form.prop('noValidate')).to.exist;
      expect(form.find('Textfield')).to.have.length(1);
    });

    it('with Textfield with empty string for Textfield defaultValue prop if currentUser prop is false', () => {
      expect(wrapper.find('Textfield').prop('defaultValue')).to.equal('');
    });

    it('with Textfield with currentUser prop value for Textfield defaultValue prop if currentUser prop is defined', () => {
      wrapper.setProps({ currentUser: 'Bob' });
      expect(wrapper.find('Textfield').prop('defaultValue')).to.equal('Bob');
    });

    it('with Textfield with error prop value for Textfield error prop', () => {
      expect(wrapper.find('Textfield').prop('error')).to.equal(false);
    });

  });

  describe('onSubmit', () => {

    it('should call evt.preventDefault and actions.loadRepos', () => {
      let evt = { preventDefault: sinon.spy() };
      let data = { username: 'Bob' }
      let instance = wrapper.instance();
      instance.onSubmit(evt, data);
      sinon.assert.called(evt.preventDefault);
      sinon.assert.calledWith(instance.props.actions.loadRepos, 'Bob');
    });

  });

});
