import React from 'react';
import {Link} from 'react-router-dom';
import ListControl from "./ListControl.jsx";
import {ListJsonDebugger} from './Debugger.jsx';
import {Utils} from '../CompUtils.js';
import {jsonGet} from "../../RestClient.js";
import {hostedOptionLegend as options, APP_ROOT} from "../ComponentConstants.js";

export default class HostedList extends React.Component {
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
      url: '/api/admin/stores/_all/hosted',
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
        Utils.logMessage("disable timeout get failed in hosted listing.");
      }
    });
  }

  createNew = () => {
    // mock
  }

  handleDebug = event => {
    this.setState({
      enableDebug: event.target.checked
    });
  }

  handleSearch = event => {
    this.setState({
      listing: Utils.searchByKeyForNewStores(event.target.value, this.state.rawListing)
    });
  }

  /* eslint-disable-next-line max-lines-per-function */
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
            listing.map(store => {
              let storeClass = Utils.isDisabled(store.key, disMap)? "disabled-store":"enabled-store";
              return (
                <div key={store.key} className="store-listing-item">
                  <div className="fieldset-caption">
                    <Link to={`${APP_ROOT}/hosted/${store.packageType}/view/${store.name}`}>
                      <span className={storeClass}>{store.packageType}-{store.name}</span>
                    </Link>
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
                          Utils.hostedOptions(store).map(option => <div key={option.title} className="options">
                                <span className="key">{option.icon} </span>
                              </div>)
                        }
                      </div>
                    </div>
                    <div className="description field"><span>{store.description}</span></div>
                  </div>
                </div>
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
