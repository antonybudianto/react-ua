# react-ua

[![npm version](https://badge.fury.io/js/react-ua.svg)](https://badge.fury.io/js/react-ua)
[![Build Status](https://travis-ci.org/antonybudianto/react-ua.svg?branch=master)](https://travis-ci.org/antonybudianto/react-ua)

<p align="center">
<img src="https://user-images.githubusercontent.com/7658554/49334914-f4ff8c80-f613-11e8-820b-49a5b446d889.png">
</p>

React User Agent Component and Provider, SSR-ready, using new React Context API

## Features

- Wrapper for [ua-parser-js](https://github.com/faisalman/ua-parser-js)
- Using new React [Context API](https://reactjs.org/docs/context.html)
- SSR-ready
- Unit-tested

> Try it [live at StackBlitz](https://stackblitz.com/edit/demo-react-ua)

```js
import React from 'react';
import { UserAgentProvider, UserAgent } from 'react-ua';

const App = () => (
  <UserAgent>{ua => <div>OS: {ua.os.name}</div>}</UserAgent>
)

const Home = () => (
  <UserAgentProvider>
    <App />
  </UserAgentProvider>
);

ReactDOM.render(<Home />, document.getElementById("#root"))

// SSR
const el = (
  <UserAgentProvider value={request.headers['user-agent']}>
    <App />
  </UserAgentProvider>
);

ReactDOMServer.renderToString(el);
```

## License

MIT
