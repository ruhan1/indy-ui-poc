import React from 'react';

export default class NavFooter extends React.Component {
  render(){
    // TODO: stats will be render based on the backend addons response, this is a mock;
    let stats = {
      version: "1.6.0",
      commitId: "f472176",
      builder: "ligangty",
      timestamp: "2018-10-24 05:54 +0000"
    };
    const gridClass = "col-md-auto border-right border-secondary";
    return (
      <nav className="navbar fixed-bottom navbar-expand-lg navbar-light bg-light" role="navigation">
        <div className="container">
          <div className="row">
            <div className={gridClass}>
              <a target="_new" href="http://commonjava.github.io/indy/">Docs</a>
            </div>
            <div className={gridClass}>
              <a target="_new" href="http://github.com/commonjava/indy/issues">Issues</a>
            </div>
            <div className={gridClass}>
              Version:{stats.version}
            </div>
            <div className={gridClass}>
              Commit ID: <a target="_new" href={`http://github.com/commonjava/indy/commit/${stats.commitId}`}>{stats.commitId}</a>
            </div>
            <div className="col-md-auto">
              Built on {stats.timestamp} by <a target="_new" href={`http://github.com/${stats.builder}`}>{stats.builder}</a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
