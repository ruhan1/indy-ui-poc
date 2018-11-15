'use strict'

import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import NavHeader from './nav/NavHeader.jsx';
import NavFooter from './nav/NavFooter.jsx';
import Container from './content/Container.jsx';

const Root = (props)=>(
  <div>
    <NavHeader />
    <Container />
    <NavFooter />
  </div>
);

export default Root;
