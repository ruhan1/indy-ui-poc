'use strict'

import React from 'react';
import {render} from 'react-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class IndyNavFooter extends React.Component {
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render(){
    // stats will be render based on the backend addons response, this is a mock;
    let stats = {
      version: "1.6.0",
      commitId: "f472176",
      builder: "gli",
      timestamp: "2018-10-24 05:54 +0000"
    }
    return (
      <nav className="navbar fixed-bottom navbar-expand-lg navbar-light bg-light" role="navigation">
        <div className="container">
            <span><a target="_new" className="nav-link" href="http://commonjava.github.io/indy/">Docs</a></span>
            | <span><a target="_new" className="nav-link" href="http://github.com/commonjava/indy/issues">Issues</a></span>
            | <span>Version:</span> <span>{stats.version}</span>
            | <span>Commit ID:</span> <span><a target="_new" className="nav-link" href={`http://github.com/commonjava/indy/commit/${stats.commitId}`}>{stats.commitId}</a></span>
            | <span>Built on {stats.timestamp} by <a target="_new" className="nav-link" href={`http://github.com/${stats.builder}`}>{stats.builder}</a></span>
        </div>
      </nav>
    );
  }
}
