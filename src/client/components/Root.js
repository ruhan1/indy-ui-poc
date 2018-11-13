'use strict'

import React from 'react';
import NavHeader from './nav/NavHeader.js';
import NavFooter from './nav/NavFooter.js';
import Container from './content/Container.js';
import {BrowserRouter as Router} from 'react-router-dom';
import './styles/indy.css';

const Root = (props)=>(
  <div>
    <NavHeader />
    <Container />
    <NavFooter />
  </div>
);

export default Root;
