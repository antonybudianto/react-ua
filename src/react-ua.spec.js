import '@babel/polyfill';

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import {
  UserAgentProvider,
  UserAgent,
  withUserAgent,
  useUserAgent
} from './react-ua';
import PropTypes from 'prop-types';

const mockUa =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36';

Object.defineProperty(
  window.navigator,
  'userAgent',
  (function(_value) {
    return {
      get: function _get() {
        return _value;
      },
      set: function _set(v) {
        _value = v;
      }
    };
  })(mockUa)
);

afterEach(cleanup);

describe('react-ua', () => {
  it('should render with default provider', () => {
    const el = (
      <UserAgentProvider>
        <UserAgent>{v => <div>Browser: {v.browser.name}</div>}</UserAgent>
      </UserAgentProvider>
    );
    const { getByText } = render(el);
    getByText('Browser: Chrome');
  });

  it('should render with custom provider value', () => {
    const customUa =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/13.2b11866 Mobile/16A366 Safari/605.1.15';
    const el = (
      <UserAgentProvider value={customUa}>
        <UserAgent>{v => <div>OS: {v.os.name}</div>}</UserAgent>
      </UserAgentProvider>
    );
    const { getByText } = render(el);
    getByText('OS: iOS');
  });

  it('should render HOC component with default provider', () => {
    const Comp = ({ ua }) => <div>Browser: {ua.browser.name}</div>;
    Comp.propTypes = {
      ua: PropTypes.object
    };

    const CompWithHoc = withUserAgent(Comp);
    const el = (
      <UserAgentProvider>
        <CompWithHoc />
      </UserAgentProvider>
    );
    const { getByText } = render(el);
    getByText('Browser: Chrome');
  });

  it('should render HOC component with custom provider value', () => {
    const customUa =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/13.2b11866 Mobile/16A366 Safari/605.1.15';

    const Comp = ({ ua }) => <div>OS: {ua.os.name}</div>;
    Comp.propTypes = {
      ua: PropTypes.object
    };

    const CompWithHoc = withUserAgent(Comp);
    const el = (
      <UserAgentProvider value={customUa}>
        <CompWithHoc />
      </UserAgentProvider>
    );
    const { getByText } = render(el);
    getByText('OS: iOS');
  });

  it('should render hook useUserAgent', () => {
    const customUa =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/13.2b11866 Mobile/16A366 Safari/605.1.15';

    const CompWithHooks = () => {
      const ua = useUserAgent();
      return <div>OS: {ua.os.name}</div>;
    };
    const el = (
      <UserAgentProvider value={customUa}>
        <CompWithHooks />
      </UserAgentProvider>
    );
    const { getByText } = render(el);
    getByText('OS: iOS');
  });
});
