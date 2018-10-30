'use strict'

import React from 'react';
import {render} from 'react-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//mock user login
const isUserloggedIn = true;
const username = "mock";

export default class IndyNavHeader extends React.Component {
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
    // addons will be render based on the backend addons response, this is a mock;
    let addons=[
      <a key='autoproxy-calc' className="dropdown-item" href="view/autoprox/calc">AutoProx Calculator</a>,
      <a key='autoproxy-rules' className="dropdown-item" href="view/autoprox/rules">AutoProx Rules</a>,
      <a key='store-changelog' className="dropdown-item" href="#/revisions/changelog/stores">Store Changelogs</a>
    ];
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light" role="navigation">
        <a className="navbar-brand" href="view">Indy</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li key="list-remote" className="nav-item">
              <a className="nav-link" href="view/remote">Remote Repositories</a>
            </li>
            <li key="list-hosted" className="nav-item">
              <a className="nav-link" href="view/hosted">Hosted Repositories</a>
            </li>
            <li key="list-group" className="nav-item">
              <a className="nav-link" href="view/group">Groups</a>
            </li>
            <li key="rest-api" className="nav-item">
              <a className="nav-link"href="rest-api.html">REST API</a>
            </li>
            <li key="list-addons" className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                more
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/api/diag/bundle">Diagnostic Bundle</a>
                <a className="dropdown-item" href="/api/diag/repo">Repo Bundle</a>
                <a className="dropdown-item" href="view/nfc">Not-Found Cache</a>
                <a className="dropdown-item" href="view/cache/delete">Delete Cache</a>
                <div className="dropdown-divider"></div>
                {addons}
              </div>
            </li>
            { isUserloggedIn &&
              <li key="list-logged-in" className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {username}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item"  href="view/logout">Log Out</a>
                </div>
              </li>
            }
          </ul>
        </div>
      </nav>
    );
  }
}
