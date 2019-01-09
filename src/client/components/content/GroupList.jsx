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
import ListControl from "./ListControl.jsx";
import {Utils} from '../CompUtils.js';
import {jsonGet} from "../../RestClient.js";
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

  render(){
    let {listing, disabledMap, enableDebug} = this.state;

    return (
      <React.Fragment>
        <PageSection>
          <TextContent>
            <Text component="h1">Group List</Text>
          </TextContent>
        </PageSection>
        <PageSection variant={PageSectionVariants.light}>
          <Grid gutter="md">
            <GridItem className="right-control">
              <ListControl
                useHideAll={true} handleHideAll={this.hideAll}
                useSearch={true} handleSearch={this.handleSearch}
                useDebug={true} handleDebug={this.handleDebug}
                handleCreateNew={this.createNew} />
            </GridItem>
            {
              listing.map(store => {
                let storeClass = Utils.isDisabled(store.key, disabledMap)? "disabled-store":"enabled-store";
                return (
                  <GroupListItem key={store.key} store={store} storeClass={storeClass} disableMap={disabledMap} />
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
}
