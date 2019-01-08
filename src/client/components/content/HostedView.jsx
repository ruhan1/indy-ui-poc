import React from 'react';
import PropTypes from 'prop-types';
import {StoreViewControlPanel as ControlPanel} from './StoreControlPanels.jsx';
import {DisableTimeoutHint} from './Hints.jsx';
// import {ViewJsonDebugger} from './Debugger.jsx';
import {Utils} from '../CompUtils.js';
import {Filters} from '../Filters.js';
import {TimeUtils} from '../../TimeUtils.js';
import {jsonGet} from '../../RestClient.js';

export default class HostedView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      store: {},
      raw: {},
      message: ''
    };
  }

  componentDidMount() {
    this.getStore();
  }

  handleDisable = () => {
    // Mock
  }

  handleEnable = () => {
    // Mock
  }

  handleEdit = () => {
    // Mock
  }

  handleCreate = () => {
    // Mock
  }

  handleRemove = () => {
    // Mock
  }

  getStore = () => {
    let match = this.props.match;
    let getUrl = `/api/admin/stores/${match.params.packageType}/hosted/${match.params.name}`;
    jsonGet({
      url: getUrl,
      done: response => {
        let raw = response;
        let store = Utils.cloneObj(raw);
        store.disabled = raw.disabled === undefined ? false : raw.disabled;
        this.setState({
          raw
        });
        this.getStoreDisableTimeout(store);
      },
      fail: errorText => {
        this.setState({
          message: JSON.parse(errorText).error
        });
      }
    });
  }

  getStoreDisableTimeout = store => {
    jsonGet({
      url: `/api/admin/schedule/store/${store.packageType}/${store.type}/${store.name}/disable-timeout`,
      done: response => {
        let newStore = Utils.cloneObj(store);
        newStore.disableExpiration = response.expiration;
        this.setState({
          store: newStore
        });
      },
      fail: () => {
        console.log("disable timeout getting failed");
        this.setState({
          store
        });
      }
    });
  }

  /* eslint-disable max-lines-per-function */
  render() {
    let store = this.state.store;
    if(!Utils.isEmptyObj(store)) {
      return (
        <div className="container-fluid">
          <div className="control-panel">
            <ControlPanel
              enabled={!store.disabled} handleEnable={this.handleEnable}
              handleDisable={this.handleDisable}
              handleEdit={this.handleEdit}
              handleCreate={this.handleCreate}
              handleRemove={this.handleRemove} />
          </div>

          <div className="content-panel">
            <div className="fieldset-caption">Basics</div>
            <BasicSection store={store} />

            <div className="fieldset-caption">Description</div>
            <div className="fieldset">
              <div className="text-field">
                <textarea readOnly className="text-description" value={store.description} />
              </div>
            </div>

            <div className="fieldset-caption">Capabilities</div>
            <div className="detail-table">
              {
                (store.allow_releases || store.allow_snapshots) &&

                  <div>
                    <div className="detail-field">
                      <span>{Filters.checkmark(store.allow_releases || store.allow_snapshots)}</span>
                      <label>Allow Uploads</label>
                    </div>
                    <div className="detail-field">
                      <span>{Filters.checkmark(store.allow_releases)}</span>
                      <label>Allow Releases</label>
                    </div>
                    <div className="detail-field">
                      <span>{Filters.checkmark(store.allow_snapshots)}</span>
                      <label>Snapshots Allowed?</label>
                    </div>
                    {
                      store.allow_snapshots &&
                      <div className="sub-fields">
                        <div className="detail-field">
                          <label>Snapshot Timeout:</label>
                          <span>{TimeUtils.secondsToDuration(store.snapshotTimeoutSeconds)}</span>
                        </div>
                      </div>
                    }
                  </div>

              }
            </div>
          </div>
          {
            // <ViewJsonDebugger enableDebug={false} storeJson={store} rawJson={raw} />
          }
        </div>
      );
    }
    return null;
  }
  /* eslint-enable max-lines-per-function */
}

HostedView.propTypes={
  match: PropTypes.object
};

/* eslint-disable max-lines-per-function */
const BasicSection = ({store})=> <div className="fieldset">
      <div className="detail-field">
          <label>Package Type:</label>
          <span className="key">{store.packageType}</span>
      </div>
      <div className="detail-field">
          <label>Name:</label>
          <span className="key">{store.name}</span>
      </div>
      <div className="detail-field">
          <span>{Filters.checkmark(!store.disabled)}</span>
          <label>Enabled?</label>
          {
            store.disabled && store.disableExpiration &&
            <span className="hint">Set to automatically re-enable at {TimeUtils.timestampToDateFormat(store.disableExpiration)}</span>
          }
      </div>
      <div className="detail-field">
        <span>{Filters.checkmark(store.readonly)}</span>
        <label>Readonly?</label>
        {
          !store.readonly &&
          <span className="hint">If set to readonly, all uploading and deleting operations to this repo are prohibited</span>
        }
      </div>
      <div className="detail-field">
        <span>{Filters.checkmark(store.authoritative_index || store.readonly)}</span>
        <label>Authoritative index enabled?</label>
        {
          !store.authoritative_index && store.readonly &&
          <span className="hint">Make the content index authoritative to this repository</span>
        }
      </div>
      <div className="sub-fields">
        <div className="detail-field">
          <label>Disable Timeout:</label>
          <span>{store.disable_timeout}</span>
          <DisableTimeoutHint />
        </div>
      </div>
      <div className="detail-field">
        <label>Local URL:</label>
        {
          // TODO: is this store.demo still available now?
          store.demo ?
          <span>{Utils.storeHref(store.key)}</span> :
          <span><a href={Utils.storeHref(store.key)} target="_new">{Utils.storeHref(store.key)}</a></span>
        }
      </div>
      {
        store.storage &&
        <div className="detail-field">
          <label>Alternative Storage Directory:</label>
          <span>{store.storage}</span>
        </div>
      }
    </div>;
  /* eslint-enable max-lines-per-function */

BasicSection.propTypes = {
  store: PropTypes.object.isRequired
};
