import React from 'react';
import ReactDOM from 'react-dom';

const Index = () => {
  return <div className="app">Hello from React!</div>;
};

console.log('UI Ready!');

ReactDOM.render(<Index />, document.getElementById('app'));

module.hot.accept();
