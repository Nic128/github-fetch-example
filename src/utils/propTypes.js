import { PropTypes } from 'react';

export default {
  actions: PropTypes.object,
  loading: PropTypes.bool,
  currentUser: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool
  ])
};