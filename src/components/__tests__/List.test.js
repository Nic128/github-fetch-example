import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import List from '../List';

describe('List component', () => {

  let wrapper;

  const defaultProps = {
    repos: [{
      id: 111,
      html_url: 'http://www.google.com',
      name: 'Bob',
      stargazers_count: 0
    },
    {
      id: 222,
      html_url: 'http://www.yahoo.com',
      name: 'Megan',
      stargazers_count: 12
    }],
    loading: false,
    currentUser: 'Bob'
  }

  beforeEach(() => {
    wrapper = shallow(<List {...defaultProps} />);
  });

  describe('should render', () => {

    it('with Spinner if loading if true', () => {
      expect(wrapper.find('Spinner')).to.have.length(0);
      wrapper.setProps({ loading: true });
      expect(wrapper.find('Spinner')).to.have.length(1);
    });

    it('with List component', () => {
      expect(wrapper.find('List')).to.have.length(1);
    });

    it('with one ListItem component if the repos prop is an empty array', () => {
      wrapper.setProps({ repos: [] });
      expect(wrapper.find('ListItem')).to.have.length(1);
    });

    it('with 2 ListItem component to reflect the repos prop length', () => {
      expect(wrapper.find('ListItem')).to.have.length(2);
      expect(wrapper.find('ListItem').at(0).find('a').text()).to.equal('Bob');
      expect(wrapper.find('ListItem').at(1).find('a').text()).to.equal('Megan');
    });

  });
});
