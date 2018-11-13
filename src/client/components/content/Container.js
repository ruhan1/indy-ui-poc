'use strict'

import React from 'react';
import {Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/indy.css';
import RemoteList from './RemoteList.js';
import HostedList from './HostedList.js';
import GroupList from './GroupList.js';
import RemoteView from './RemoteView.js';
import HostedView from './HostedView.js';
import GroupView from './GroupView.js';
import {APP_ROOT} from '../ComponentConstants.js'


const browseCompatible=`<!--[if lt IE 7]>
    <p className="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->`;

const isHome = false;

export default class Container extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
         {/*browseCompatible*/}
        <div>
           {
             isHome?
             "Welcome! Make a selection from the menu above to proceed.":
             (
               <div>
                <Route exact path={`${APP_ROOT}/remote`} component={RemoteList} />
                <Route exact path={`${APP_ROOT}/hosted`} component={HostedList} />
                <Route exact path={`${APP_ROOT}/group`} component={GroupList} />
                <Route exact path={`${APP_ROOT}/remote/:packageType/view/:name`} component={RemoteView} />
                <Route exact path={`${APP_ROOT}/hosted/:packageType/view/:name`} component={HostedView} />
                <Route exact path={`${APP_ROOT}/group/:packageType/view/:name`} component={GroupView} />
               </div>
             )
           }
          </div>
      </div>
    );
  }
}
