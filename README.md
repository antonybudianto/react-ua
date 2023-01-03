# react-ua

[![npm version](https://badge.fury.io/js/react-ua.svg)](https://badge.fury.io/js/react-ua)
[![Build Status](https://travis-ci.org/antonybudianto/react-ua.svg?branch=master)](https://travis-ci.org/antonybudianto/react-ua)

<p align="center">
<img src="https://user-images.githubusercontent.com/7658554/210290544-85e3a809-c9e2-4a96-a5ce-349f15be907f.png">
</p>

React User Agent Component and Provider, SSR-ready, using new React Context API

## Requirement

- React 16.8.0

## Features

- Wrapper for [ua-parser-js](https://github.com/faisalman/ua-parser-js)
- Using new React [Hooks API](https://reactjs.org/docs/hooks-faq.html)
- Using new React [Context API](https://reactjs.org/docs/context.html)
- SSR-ready
- Unit-tested

> Try it [live at StackBlitz](https://stackblitz.com/edit/demo-react-ua)

```js
import React from 'react';
import { UserAgentProvider, useUserAgent } from 'react-ua';

const Comp = () => {
  const ua = useUserAgent();
  return <div>OS: {ua.os.name}</div>;
};

const App = () => (
  <UserAgentProvider>
    <Comp />
  </UserAgentProvider>
);

ReactDOM.render(<App />, document.getElementById('#root'));

// SSR
const el = (
  <UserAgentProvider value={request.headers['user-agent']}>
    <Comp />
  </UserAgentProvider>
);

ReactDOMServer.renderToString(el);
```

## HOC (deprecated)

```tsx
import { withUserAgent } from 'react-ua/hoc';

const CompWithHoc = withUserAgent(({ ua }) => <div>OS: {ua.os.name}</div>);

const App = () => (
  <UserAgentProvider>
    <CompWithHoc />
  </UserAgentProvider>
);
```

## License

MIT
