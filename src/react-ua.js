import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UAParser from 'ua-parser-js';

const UserAgentContext = React.createContext();

export const UserAgent = UserAgentContext.Consumer;

export class UserAgentProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ua: new UAParser(props.value).getResult()
    };
  }
  render() {
    return (
      <UserAgentContext.Provider value={this.state.ua}>
        {this.props.children}
      </UserAgentContext.Provider>
    );
  }
}

UserAgentProvider.propTypes = {
  value: PropTypes.any,
  children: PropTypes.node
};
