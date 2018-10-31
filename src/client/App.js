'use strict'

import React from 'react';
import {render} from 'react-dom';
import IndyNavHeader from './nav/IndyNavHeader.js';
import IndyNavFooter from './nav/IndyNavFooter.js';
import IndyContainer from './content/IndyContainer.js';
import './styles/indy.css';


export const App = (props)=>{
  return (
    <div>
      <IndyNavHeader />
      <IndyContainer />
      <IndyNavFooter />
    </div>
  );
};
