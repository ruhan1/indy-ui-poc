'use strict'

import React from 'react';
import {render} from 'react-dom';
import {Utils} from '../IndyUtils.js';
import '../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {remoteOptionLegend as options} from "../IndyConstants.js";
import {jsonGet} from "../RestClient.js";
import JSONPretty from 'react-json-pretty';


export default class IndyRemoteList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listing: [],
      disabledMap: {},
      enableDebug: false
    }
    this.createNew = this.createNew.bind(this);
    this.handleDebug = this.handleDebug.bind(this);
    this.getStores = this.getStores.bind(this);
    this.getDisTimeouts = this.getDisTimeouts.bind(this);
  }
  componentDidMount() {
    this.getStores();
  }
  getStores(){
    jsonGet('/api/admin/stores/_all/remote',
      response => {
        this.setState({
          listing: response
        });
        this.getDisTimeouts();
      },
      jqxhr => {
        this.setState({
          message: JSON.parse(jqxhr.responseText).error
        });
      }
    );
  }
  getDisTimeouts(){
    jsonGet('/api/admin/schedule/store/all/disable-timeout',
      response => {
        let disabledMap = Utils.setDisableMap(response, this.state.listing);
        this.setState({
          disabledMap: disabledMap
        });
      },
      jqxhr => {
        this.setState({
          message: JSON.parse(jqxhr.responseText).error
        });
      }
    );
  }
  createNew(){
    //mock
  }
  handleDebug(event){
    this.setState({
      enableDebug: event.target.checked
    })
  }
  render(){
    let listing = this.state.listing;
    let disMap = this.state.disabledMap;
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
            <input type="checkbox" name="enableDebug" checked={this.state.enableDebug} onChange={this.handleDebug} /> Debug Data
          </div>
        </div>
        <div className="content-panel">
          <div className="store-listing">
            {
              listing.map(function(store){
                let storeClass = Utils.isDisabled(store.key, disMap)? "disabled-store":"enabled-store";
                return (
                  <div key={store.key} className="store-listing-item">
                    <div className="fieldset-caption">
                      <a href={`view/remote/${store.packageType}/view/${store.name}`}>
                        <span className={storeClass}>{store.packageType}-{store.name}</span>
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
        {
          this.state.enableDebug &&
          (
            <div className="debug">
                JSON:
                <JSONPretty id="json-pretty" json={this.state.listing}></JSONPretty>
            </div>
          )
        }
      </div>
    );
  }
}
