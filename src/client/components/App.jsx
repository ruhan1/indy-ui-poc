'use strict'

import React from 'react';
import {BrowserRouter as Router, HashRouter, Route} from 'react-router-dom';
import Root from './Root.jsx';
import {APP_ROOT} from './ComponentConstants.js';

export const App = ()=>{
  return (
    <HashRouter basename={APP_ROOT}>
      <div>
        <Route path={[`${APP_ROOT}`, '/']} component={Root} />
      </div>
    </HashRouter>
  );
};

export default App;
