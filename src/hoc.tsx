import React from 'react';
import { UserAgent } from './react-ua';

/**
 * @legacy Please migrate to use hooks
 * Legacy HOC
 */
export const withUserAgent = (Comp) =>
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
      return <UserAgent>{(ua) => <Comp ua={ua} {...this.props} />}</UserAgent>;
    }
  };
