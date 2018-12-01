import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { UserAgentProvider, UserAgent } from './react-ua';

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
});
