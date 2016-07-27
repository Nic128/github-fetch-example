import React, { Component } from 'react';
import AutoForm from 'react-auto-form';
import { Textfield } from 'react-mdl';
import propTypes from '../utils/propTypes';

export default class SearchBarComponent extends Component {

  static propTypes = propTypes;

  onSubmit = (evt, data) => {
    evt.preventDefault();
    this.props.actions.loadRepos(data.username);
  };

  render() {
    const { error, currentUser } = this.props;
    return (
      <AutoForm onSubmit={this.onSubmit} noValidate>
        <Textfield
          name="username"
          className="full-width"
          error={error}
          defaultValue={currentUser ? currentUser : ''}
          label="Enter github user..."
          autoComplete="off" />
      </AutoForm>
    );
  }

}
