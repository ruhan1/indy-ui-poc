'use strict'

import React from 'react';
import {render} from 'react-dom';
import {Utils} from '../Utils.js';
import '../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListControl from "./ListControl.js";
import {jsonGet} from "../RestClient.js";
import {JsonDebugger} from './JsonDebugger.js';


export default class GroupList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listing: [],
      disabledMap: {},
      enableDebug: false
    }
    this.createNew = this.createNew.bind(this);
    this.handleDebug = this.handleDebug.bind(this);
    this.hideAll = this.hideAll.bind(this);
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
  hideAll(){
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
        <ListControl
          useHideAll={true} handleHideAll={this.hideAll}
          useSearch={true}
          useDebug={true} handleDebug={this.handleDebug}
          handleCreateNew={this.createNew} />
        <div className="content-panel">
          <div className="store-listing">
            {
              listing.map( store => {
                let storeClass = Utils.isDisabled(store.key, disMap)? "disabled-store":"enabled-store";
                return (
                  <div key={store.key} className="store-listing-item">
                    <div className="fieldset-caption">
                      <a href={`view/group/${store.packageType}/view/${store.name}`}>
                        <span className={storeClass}>{store.packageType}-{store.name}</span>
                      </a>
                    </div>
                    <div className="fieldset">
                      <div>
                        <div className="left-half">
                          <label>Local URL:</label>
                          <a href={Utils.storeHref(store.key)} target="_new">{Utils.storeHref(store.key)}</a>
                        </div>
                        <div class="options-field field right-half">
                          <div class="inline-label">
                            {store.constituents.length} Constituent(s) [
                            <!-- span class="option">
                              <a href="" ng-if="!store.display" ng-click="displayConstituents(store)">View</a>
                              <a href="" ng-if="store.display" ng-click="hideConstituents(store)">Hide</a>
                            </span -->
                            <span class="option">
                              <a href="" ng-if="!store.display" ng-click="displayConstituents(store)">+</a>
                              <a href="" ng-if="store.display" ng-click="hideConstituents(store)">-</a>
                            </span>
                            ]
                          </div>
          					      <ol ng-if="store.display" class="content-panel item-expanded subsection">
          					        <li ng-repeat="item in store.constituents">
          					          <a href="#/{{item.type}}/{{item.packageType}}/view/{{item.name}}">
                                  <span class="enabled-store" ng-if="!isDisabled(item.key)">{{item.key}}</span>
                                  <span class="disabled-store" ng-if="isDisabled(item.key)">{{item.key}}</span>
                              </a>
          					          <div ng-if="item.type == 'remote'" class="subfields">
          					           <span class="description field">(Remote URL: <a target="_new" href="{{item.storeHref}}">{{item.storeHref}}</a>)</span>
          					          </div>
          					        </li>
          					      </ol>
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
