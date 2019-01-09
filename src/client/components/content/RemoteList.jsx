import React from 'react';
import {
  Grid,
  GridItem,
  PageSection,
  PageSectionVariants,
  TextContent,
  Text
} from '@patternfly/react-core';
import {ListJsonDebugger} from './Debugger.jsx';
import {
  LocalURLSection,
  CapabilitiesSection,
  StoreNameSection
} from './CommonPageWidget.jsx';
import ListControl from "./ListControl.jsx";
import {remoteOptionLegend as options} from "../ComponentConstants.js";
import {Utils} from '../CompUtils.js';
import {jsonGet} from "../../RestClient.js";

export default class RemoteList extends React.Component {
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
      url: '/api/admin/stores/_all/remote',
      done: response => {
        this.setState({
          listing: response.items,
          rawListing: response.items
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
          Utils.logMessage("disable timeout get failed in remote listing.");
      }
    });
  }

  createNew = () => {
    // mock
  }

  handleDebug = checked => {
    this.setState({
      enableDebug: checked
    });
  }

  handleSearch = value => {
    this.setState({
      listing: Utils.searchByKeyForNewStores(value, this.state.rawListing)
    });
  }

  /* eslint-disable max-lines-per-function */
  render(){
    let {listing, disabledMap, enableDebug} = this.state;
    let orderBys = [
      {value: 'key', text: 'Name'},
      {value: 'url', text: 'Remote URL'}
    ];
    return (
      <React.Fragment>
        <PageSection>
          <TextContent>
            <Text component="h1">Remote Repositories List</Text>
          </TextContent>
        </PageSection>
        <PageSection variant={PageSectionVariants.light}>
          <Grid gutter="md">
            <GridItem className="right-control">
              <ListControl
                useSearch={true} handleSearch={this.handleSearch}
                useOrderBy={true} orderBys={orderBys}
                useLegend={true} legends={options}
                useDebug={true} handleDebug={this.handleDebug}
                handleCreateNew={this.createNew} />
            </GridItem>
            {
              listing.map(store => {
                let storeClass = Utils.isDisabled(store.key, disabledMap)? "disabled-store":"enabled-store";
                return (
                  <GridItem key={store.key} span={8}>
                    <StoreNameSection store={store} storeClass={storeClass} />
                    <div className="fieldset">
                      <div><LocalURLSection storeKey={store.key} /></div>
                      <div>
                        <div className="left-half">
                          <label>Remote URL:</label>{' '}
                          <a href={store.url} target="_new">{store.url}</a>
                        </div>
                      </div>
                      <div>
                        <CapabilitiesSection options={Utils.remoteOptions(store)} />
                      </div>
                      <div className="description"><span>{store.description}</span></div>
                    </div>
                  </GridItem>
                );
              })
            }
            {
              enableDebug &&
              <GridItem span={8}>
                <ListJsonDebugger enableDebug={enableDebug} jsonObj={listing} />
              </GridItem>
            }
          </Grid>
        </PageSection>
      </React.Fragment>
    );
  }
  /* eslint-enable max-lines-per-function */
}
