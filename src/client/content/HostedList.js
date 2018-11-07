'use strict'

import React from 'react';
import {Utils} from '../Utils.js';
import '../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {hostedOptionLegend as options, APP_ROOT} from "../Constants.js";
import ListControl from "./common/ListControl.js";
import {jsonGet} from "../RestClient.js";
import {ListJsonDebugger} from './common/Debugger.js';

export default class HostedList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listing: [],
      rawListing: [],
      disabledMap: {},
      enableDebug: false
    }

    this.createNew = this.createNew.bind(this);
    this.handleDebug = this.handleDebug.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getStores = this.getStores.bind(this);
    this.getDisTimeouts = this.getDisTimeouts.bind(this);
  }

  componentDidMount() {
    this.getStores();
  }
  getStores(){
    jsonGet('/api/admin/stores/_all/hosted',
      response => {
        this.setState({
          listing: response.items,
          rawListing: response.items,
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
  handleSearch(event){
    this.setState({
      listing: Utils.searchByKeyForNewStores(event.target.value, this.state.rawListing)
    });
  }
  render(){
    let listing = this.state.listing;
    let disMap = this.state.disabledMap;
    return (
      <div className="container-fluid">
        <ListControl
          useSearch={true} handleSearch={this.handleSearch}
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
                    <a href={`${APP_ROOT}/hosted/${store.packageType}/view/${store.name}`}>
                      <span className={storeClass}>{store.packageType}-{store.name}</span>
                    </a>
                  </div>
                  <div className="fieldset">
                    <div>
                      <div className="left-half">
                        <label>Local URL:</label>
                        <a href={Utils.storeHref(store.key)} target="_new">{Utils.storeHref(store.key)}</a>
                      </div>
                    </div>
                    <div>
                      <div className="left-half">
                        <label>Capabilities:</label>
                        {
                          Utils.hostedOptions(store).map(
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
