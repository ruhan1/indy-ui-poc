'use strict'

import React from 'react';
import {render} from 'react-dom';
import {Utils} from '../IndyUtils.js';
import $ from 'jquery/src/core';
import 'jquery/src/ajax';
import 'jquery/src/ajax/xhr';
import '../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// mock data
const options = [
  {icon: "S", title: "Snapshots allowed"},
  {icon: "R", title: "Releases allowed"}
];

export default class IndyRemoteList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listing: []
    }
    this.createNew = this.createNew.bind(this);
    this.handleDebug = this.handleDebug.bind(this);
  }
  componentDidMount() {
    $.getJSON({
      url: '/api/admin/stores/_all/remote',
      type: "GET",
      responseType: "application/json",
      contentType: "application/json",
      dataType: "json"
    }).done((response) => {
      this.setState({
        listing: response
      });
    }).fail((jqxhr, textStatus, error) => {
      this.setState({
        message: JSON.parse(jqxhr.responseText).error,
        messageStyle: 'red'
      });
    });
  }
  createNew(){
    //mock
  }
  handleDebug(){
    //mock
  }
  render(){
    let listing = this.state.listing;
    return (
      <div className="container-fluid">
        <div className="control-panel">
          <div className="cp-row">
            <button onClick={this.createNew}>New...</button>
          </div>
          <div className="cp-row">
            Search:&nbsp;<input name="query" />
          </div>
          <div className="cp-row">
            Sort by:&nbsp;
            <select name="orderProp">
              <option value="key">Name</option>
              <option value="url">Remote URL</option>
            </select>
          </div>
          <div className="cp-row">
            <div className="legend">
              <div className="label" style={{fontSize:"75%", padding: ".2em .6em .3em"}}>Capability Legend:</div>
              <ul>
                {
                  options.map(
                    option =>
                     (
                       <li key={option.title}>
                         <div>
                           <span className="key">{option.icon} </span>
                           <span>{option.title}</span>
                         </div>
                       </li>
                    )
                  )
                }
              </ul>
            </div>
          </div>
          <div className="cp-row cp-debug">
            <input type="checkbox" name="enableDebug" checked={false} onChange={this.handleDebug} /> Debug Data
          </div>
        </div>
        <div className="content-panel">
          <div className="store-listing">
            {
              listing.map(function(store){
                return (
                  <div key={store.key} className="store-listing-item">
                    <div className="fieldset-caption">
                        <a href={`view/remote/${store.packageType}/view/${store.name}`}>
                            <span className="enabled-store" ng-if="!isDisabled(store.key)">{store.packageType}-{store.name}</span>
                            <span className="disabled-store" ng-if="isDisabled(store.key)">{store.packageType}-{store.name}</span>
                        </a>
                    </div>
                    <div className="fieldset">
                      <div>
                        <div className="left-half">
                          <label>Local URL:</label>
                          <a href={Utils.storeHref(store.key)} target="_new">{Utils.storeHref(store.key)}</a>
                        </div>
                        <div className="right-half">
                          <label>Remote URL:</label>
                          <a href={store.url} target="_new">{store.url}</a>
                        </div>
                      </div>
                      <div>
                        <div className="left-half">
                          <label>Capabilities:</label>
                          {
                            Utils.remoteOptions(store).map(
                              option =>
                              (
                                <div key={option.title} className="options">
                                  <span className="key">{option.icon} </span>
                                </div>
                              )
                            )
                          }
                        </div>
                      </div>
                      <div className="description field"><span>{store.description}</span></div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

        {/*
        <div ng-if="enableDebug" className="debug">
            JSON:
            <pre>{{listing | json}}</pre>
        </div>
        */}
      </div>
    );
  }
}
