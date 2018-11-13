'use strict'

import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Root from './Root.js';
import {APP_ROOT} from './ComponentConstants.js';


export const App = ()=>{
  return (
    <Router>
      <div>
        <Route path="/" component={Root} />
      </div>
    </Router>
  );
};

export default App;
