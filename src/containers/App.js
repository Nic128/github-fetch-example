import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import Main from '../components/Main';
import propTypes from '../utils/propTypes';

class App extends Component {

  static propTypes = propTypes;

  render() {
    return <Main {...this.props}/>;
  }
}

function mapStateToProps(state) {
  return {
    repos: state.getIn(['app', 'userData', 'repositories']),
    currentUser: state.getIn(['app', 'currentUser']),
    loading: state.getIn(['app', 'loading']),
    error: state.getIn(['app', 'error'])
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
