'use strict'

import React from 'react';
import {render} from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/indy.css';
import IndyRemoteList from './IndyRemoteList.js';


const browseCompatible=`<!--[if lt IE 7]>
    <p className="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->`;

const isHome = false;

export default class IndyContainer extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="content-wrapper">
         {/*browseCompatible*/}
        <div className="view-container">
          <div className="view-frame">
           {
             isHome?
             "Welcome! Make a selection from the menu above to proceed.":
             <IndyRemoteList />
           }
          </div>
        </div>
      </div>
    );
  }
}
