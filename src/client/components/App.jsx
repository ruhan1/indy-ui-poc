import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Root from './Root.jsx';
import {APP_ROOT} from './ComponentConstants.js';

export const App = ()=> <HashRouter basename={APP_ROOT}>
      <Route path={[`${APP_ROOT}`, '/']} component={Root} />
    </HashRouter>;
export default App;
