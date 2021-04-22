import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { StateProvider } from './StateProvider';
import reducer, { initialState } from './reducer';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <Router>
      <App />
    </Router>
  </StateProvider>,
  document.getElementById('app')
);
