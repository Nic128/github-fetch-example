import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Main from '../Main';

describe('Main component', () => {

  let wrapper;

  const defaultProps = {
    error: false,
    currentUser: false,
    loading: false,
    repos: [],
    actions: {
      loadRepos: sinon.spy()
    }
  }

  beforeEach(() => {
    wrapper = shallow(<Main {...defaultProps} />);
  });

  describe('should render', () => {

    it('with Card as root element', () => {
      expect(wrapper.is('Card')).to.equal(true);
    });

    it('with CardTitle, CardText and CardActions', () => {
      expect(wrapper.find('CardTitle')).to.have.length(1);
      expect(wrapper.find('CardText')).to.have.length(1);
      expect(wrapper.find('CardActions')).to.have.length(1);
    });

    it('with SearchBarComponent inheriting actions, error, currentUser', () => {
      expect(wrapper.find('SearchBarComponent').prop('actions')).to.deep.equal(defaultProps.actions);
      expect(wrapper.find('SearchBarComponent').prop('error')).to.equal(defaultProps.error);
      expect(wrapper.find('SearchBarComponent').prop('currentUser')).to.equal(defaultProps.currentUser);
    });

    it('with ListComponent inheriting repos and loading', () => {
      expect(wrapper.find('ListComponent').prop('loading')).to.equal(defaultProps.loading);
      expect(wrapper.find('ListComponent').prop('repos')).to.deep.equal(defaultProps.repos);
      expect(wrapper.find('ListComponent').prop('currentUser')).to.equal(defaultProps.currentUser);
    });

  });

  describe('componentDidMount', () => {

    it('should call actions.loadRepos if currentUser is defined and has a length of more than 0', () => {
      let instance = wrapper.instance();
      wrapper.setProps({ currentUser: 'Bob' });
      instance.componentDidMount();
      wrapper.setProps({ currentUser: false });
      instance.componentDidMount();
      sinon.assert.calledOnce(instance.props.actions.loadRepos);
      sinon.assert.calledWith(instance.props.actions.loadRepos, 'Bob');
    });

  });

});
