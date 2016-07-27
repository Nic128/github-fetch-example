import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl';
import SearchBar from './SearchBar';
import List from './List';
import propTypes from '../utils/propTypes';

if (require('can-use-dom')){
  // Load material javascript
  require('react-mdl/extra/material.js');
  // Load styles
  require('normalize.css/normalize.css');
  require('react-mdl/extra/material.css');
  require('styles/App.css');
}

export default class AppComponent extends Component {

  static propTypes = propTypes;

  componentDidMount() {
    const { actions, currentUser } = this.props;
    if (currentUser && currentUser.trim().length > 0) {
      actions.loadRepos(currentUser);
    }
  }

  render() {
    const { actions, loading, error, repos, currentUser } = this.props;
    return (
      <Card className="main-card">
        <CardTitle>Github fetch example</CardTitle>
        <CardText>
          <SearchBar
            actions={actions}
            error={error}
            currentUser={currentUser} />
        </CardText>
        <CardActions border>
          <List
            loading={loading}
            repos={repos}
            currentUser={currentUser} />
        </CardActions>
      </Card>
    );
  }

}
