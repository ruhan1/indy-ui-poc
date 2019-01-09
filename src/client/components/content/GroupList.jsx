import React from 'react';
import {Utils} from '../CompUtils.js';
import {jsonGet} from "../../RestClient.js";
import ListControl from "./ListControl.jsx";
import {ListJsonDebugger} from './Debugger.jsx';
import GroupListItem from './GroupListItem.jsx';

export default class GroupList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listing: [],
      rawListing: [],
      disabledMap: {},
      enableDebug: false,
      message: ''
    };
  }

  componentDidMount() {
    this.getStores();
  }

  getStores = () => {
    jsonGet({
      url: '/api/admin/stores/_all/group',
      done: response => {
        this.setState({
          listing: response.items,
          rawListing: response.items,
        });
        this.getDisTimeouts();
      },
      fail: errorText => {
        this.setState({
          message: JSON.parse(errorText).error
        });
      }
    });
  }

  getDisTimeouts = () => {
    jsonGet({
      url: '/api/admin/schedule/store/all/disable-timeout',
      done: response => {
        let disabledMap = Utils.setDisableMap(response, this.state.listing);
        this.setState({
          disabledMap
        });
      },
      fail: () => {
        Utils.logMessage("disable timeout get failed in group listing.");
      }
    });
  }

  createNew = () => {
    // mock
  }

  hideAll = () => {
    // mock
  }

  handleSearch = event => {
    this.setState({
      listing: Utils.searchByKeyForNewStores(event.target.value, this.state.rawListing)
    });
  }

  handleDebug = event => {
    this.setState({
      enableDebug: event.target.checked
    });
  }

  render(){
    let listing = this.state.listing;
    let disMap = this.state.disabledMap;
    return (
      <div className="container-fluid">
        <ListControl
          useHideAll={true} handleHideAll={this.hideAll}
          useSearch={true} handleSearch={this.handleSearch}
          useDebug={true} handleDebug={this.handleDebug}
          handleCreateNew={this.createNew} />
        <div className="content-panel">
          <div className="store-listing">
            {
              listing.map(store => {
                let storeClass = Utils.isDisabled(store.key, disMap)? "disabled-store":"enabled-store";
                return (
                  <GroupListItem key={store.key} store={store} storeClass={storeClass} disableMap={disMap} />
                );
              })
            }
          </div>
        </div>

        <ListJsonDebugger enableDebug={this.state.enableDebug} jsonObj={this.state.listing} />
      </div>
    );
  }
}
