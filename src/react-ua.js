import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UAParser from 'ua-parser-js';

const UserAgentContext = React.createContext();

export const UserAgent = UserAgentContext.Consumer;

export class UserAgentProvider extends Component {
  render() {
    return (
      <UserAgentContext.Provider
        value={new UAParser(this.props.value).getResult()}
      >
        {this.props.children}
      </UserAgentContext.Provider>
    );
  }
}

UserAgentProvider.propTypes = {
  value: PropTypes.any,
  children: PropTypes.node
};
