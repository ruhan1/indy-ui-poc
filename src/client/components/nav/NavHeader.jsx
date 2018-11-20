'use strict'

import React from 'react';
import {Link} from 'react-router-dom';
import {APP_ROOT} from '../ComponentConstants.js'

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
      <Link key='autoproxy-calc' className="dropdown-item" to={`${APP_ROOT}/autoprox/calc`}>AutoProx Calculator</Link>,
      <Link key='autoproxy-rules' className="dropdown-item" to={`${APP_ROOT}/autoprox/rules`}>AutoProx Rules</Link>,
      <Link key='store-changelog' className="dropdown-item" to={`${APP_ROOT}/revisions/changelog/stores`}>Store Changelogs</Link>
    ];
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light" role="navigation">
        <Link className="navbar-brand" to={APP_ROOT}>Indy</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li key="list-remote" className="nav-item">
              <Link className="nav-link" to={`${APP_ROOT}/remote`}>Remote Repositories</Link>
            </li>
            <li key="list-hosted" className="nav-item">
              <Link className="nav-link" to={`${APP_ROOT}/hosted`}>Hosted Repositories</Link>
            </li>
            <li key="list-group" className="nav-item">
              <Link className="nav-link" to={`${APP_ROOT}/group`}>Groups</Link>
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
                <Link className="dropdown-item" to={`${APP_ROOT}/nfc`}>Not-Found Cache</Link>
                <Link className="dropdown-item" to={`${APP_ROOT}/cache/delete`}>Delete Cache</Link>
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
                  <Link className="dropdown-item"  to={`${APP_ROOT}/logout`}>Log Out</Link>
                </div>
              </li>
            }
          </ul>
        </div>
      </nav>
    );
  }
}
