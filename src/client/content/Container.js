'use strict'

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/indy.css';
import RemoteList from './RemoteList.js';
import HostedList from './HostedList.js';
import GroupList from './GroupList.js';
import RemoteView from './RemoteView.js';
import HostedView from './HostedView.js';
import GroupView from './GroupView.js';


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
             // <RemoteList />
             // <HostedList />
             // <GroupList />
             // <RemoteView />
             // <HostedView />
             <GroupView />
           }
          </div>
      </div>
    );
  }
}
