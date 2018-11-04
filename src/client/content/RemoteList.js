'use strict'

import React from 'react';
import {render} from 'react-dom';
import {Utils} from '../Utils.js';
import '../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {remoteOptionLegend as options} from "../Constants.js";
import ListControl from "./ListControl.js";
import {jsonGet} from "../RestClient.js";
import {JsonDebugger} from './JsonDebugger.js';


export default class RemoteList extends React.Component {
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
          listing: response.items
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
    let orderBys = [
      {value: 'key', text: 'Name'},
      {value: 'url', text: 'Remote URL'}
    ]
    return (
      <div className="container-fluid">
        <ListControl
          useSearch={true}
          useOrderBy={true} orderBys={orderBys}
          useLegend={true} legends={options}
          useDebug={true} handleDebug={this.handleDebug}
          handleCreateNew={this.createNew} />
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

        <JsonDebugger enableDebug={this.state.enableDebug} jsonObj={this.state.listing} />
      </div>
    );
  }
}