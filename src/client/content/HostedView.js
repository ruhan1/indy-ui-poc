'use strict'
import React from 'react';
import {Utils} from '../Utils.js';
import {Filters} from '../Filters.js';
import {TimeUtils} from '../TimeUtils.js';
import '../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {jsonGet} from '../RestClient.js';
import {StoreViewControlPanel as ControlPanel} from './common/StoreControlPanels.js';
import {DisableTimeoutHint} from './common/Hints.js';
import {ViewJsonDebugger} from './common/Debugger.js';

export default class HostedView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      store: {}
    };

    this.getStore = this.getStore.bind(this);
    this.handleDisable = this.handleDisable.bind(this);
    this.handleEnable = this.handleEnable.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    this.getStore();
  }
  handleDisable(event){

  }
  handleEnable(event){

  }
  handleEdit(event){

  }
  handleCreate(event){

  }
  handleRemove(event){

  }
  getStore(){
    jsonGet('/api/admin/stores/maven/hosted/FisZYfNgpR',
      response => {
        this.setState({
          store: response
        });
      },
      jqxhr => {
        this.setState({
          message: JSON.parse(jqxhr.responseText).error
        });
      }
    );
  }

  render() {
    let store = this.state.store;
    if(!Utils.isEmptyObj(store))
    {
      let disabled = store.disabled === undefined ? false : store.disabled;
      return (
        <div className="container-fluid">
          <div className="control-panel">
            <ControlPanel
              enabled={!disabled} handleEnable={this.handleEnable}
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
                (
                  <div>
                    <div class="detail-field">
                      <span>{Filters.checkmark((store.allow_releases || store.allow_snapshots))}</span>
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
                      <div class="sub-fields">
                        <div class="detail-field">
                          <label>Snapshot Timeout:</label>
                          <span>{TimeUtils.secondsToDuration(store.snapshotTimeoutSeconds)}</span>
                        </div>
                      </div>
                    }
                  </div>
                )
              }
            </div>
          </div>
          {/* <ViewJsonDebugger enableDebug={false} storeJson={store} rawJson={raw} /> */}
        </div>
      )
    }
    return null;
  }
}

const BasicSection = (props)=>{
  let store = props.store;
  let disabled = store.disabled === undefined ? false : store.disabled;
  return (
    <div className="fieldset">
      <div className="detail-field">
          <label>Package Type:</label>
          <span className="key">{store.packageType}</span>
      </div>
      <div className="detail-field">
          <label>Name:</label>
          <span className="key">{store.name}</span>
      </div>
      <div className="detail-field">
          <span>{Filters.checkmark(!disabled)}</span>
          <label>Enabled?</label>
          {
            disabled && store.disableExpiration &&
            <span className="hint">Set to automatically re-enable at {TimeUtils.timestampToDateFormat(store.disableExpiration)}</span>
          }
      </div>
      <div class="detail-field">
        <span>{Filters.checkmark(store.readonly)}</span>
        <label>Readonly?</label>
        {
          !store.readonly &&
          <span class="hint">If set to readonly, all uploading and deleting operations to this repo are prohibited</span>
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
          //TODO: is this store.demo still available now?
          store.demo ?
          <span>{Utils.storeHref(store.key)}</span> :
          <span><a href={Utils.storeHref(store.key)} target="_new">{Utils.storeHref(store.key)}</a></span>
        }
      </div>
      {
        store.storage &&
        <div class="detail-field">
          <label>Alternative Storage Directory:</label>
          <span>{store.storage}</span>
        </div>
      }
    </div>
  );
};
