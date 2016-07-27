import React, { Component } from 'react';
import { Spinner, List, ListItem, ListItemContent, ListItemAction } from 'react-mdl';
import propTypes from '../utils/propTypes';

export default class ListComponent extends Component {

  static propTypes = propTypes;

  render() {
    const { loading, repos, currentUser } = this.props;
    return (
      <section>

        {loading && (
          <div className="align-center">
            <Spinner singleColor />
          </div>
        )}

        <List className="full-width">
          {repos && repos.map(repo => (
            <ListItem key={repo.id}>
              <ListItemContent>
                <a href={repo.html_url} target="_blank">{repo.name}</a>
              </ListItemContent>
              <ListItemAction>
                {repo.stargazers_count}
              </ListItemAction>
            </ListItem>
          ))}
          {repos && !repos.length && (
            <ListItem>{`User ${currentUser} has no repo.`}</ListItem>
          )}
        </List>

      </section>
    );
  }

}
