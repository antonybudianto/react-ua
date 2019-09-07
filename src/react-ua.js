import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UAParser from 'ua-parser-js';

const UserAgentContext = React.createContext();

export const UserAgent = UserAgentContext.Consumer;

export const UserAgentProvider = ({ value, children }) => {
  const initUA = new UAParser(value).getResult();
  const [ua, setUa] = useState(initUA);

  useEffect(() => {
    if (ua.ua !== value && value !== undefined) {
      setUa(value);
    }
  });

  return (
    <UserAgentContext.Provider value={ua}>{children}</UserAgentContext.Provider>
  );
};

UserAgentProvider.propTypes = {
  value: PropTypes.any,
  children: PropTypes.node
};

export const withUserAgent = Comp =>
  class UserAgentHoc extends React.PureComponent {
    // This method works with Next.js
    static async getInitialProps(ctx) {
      let initialProps = {};

      if (Comp.getInitialProps) {
        initialProps = await Comp.getInitialProps(ctx);
      }

      return initialProps;
    }

    render() {
      return <UserAgent>{ua => <Comp ua={ua} {...this.props} />}</UserAgent>;
    }
  };
