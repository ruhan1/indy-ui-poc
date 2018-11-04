'use strict'

import React from 'react';
import {render} from 'react-dom';
import NavHeader from './nav/NavHeader.js';
import NavFooter from './nav/NavFooter.js';
import Container from './content/Container.js';
import './styles/indy.css';


export const App = (props)=>{
  return (
    <div>
      <NavHeader />
      <Container />
      <NavFooter />
    </div>
  );
};
