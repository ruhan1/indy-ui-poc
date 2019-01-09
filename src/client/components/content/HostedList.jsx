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
import {hostedOptionLegend as options} from "../ComponentConstants.js";
import {Utils} from '../CompUtils.js';
import {jsonGet} from "../../RestClient.js";

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
        Utils.logMessage("disable timeout get failed in hosted listing.");
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
    return (
      <React.Fragment>
        <PageSection>
          <TextContent>
            <Text component="h1">Hosted Respositories List</Text>
          </TextContent>
        </PageSection>
        <PageSection variant={PageSectionVariants.light}>
          <Grid gutter="md">
            <GridItem className="right-control">
              <ListControl
                useSearch={true} handleSearch={this.handleSearch}
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
                      <div>
                        <LocalURLSection storeKey={store.key} />
                      </div>
                      <div>
                        <CapabilitiesSection options={Utils.hostedOptions(store)} />
                      </div>
                      <div className="description field"><span>{store.description}</span></div>
                    </div>
                  </GridItem>
                );
              })
            }
            {
              enableDebug &&
              <GridItem span={8}>
                <ListJsonDebugger enableDebug={this.state.enableDebug} jsonObj={this.state.listing} />
              </GridItem>
            }
          </Grid>
        </PageSection>
      </React.Fragment>
    );
  }
  /* eslint-enable max-lines-per-function */
}
