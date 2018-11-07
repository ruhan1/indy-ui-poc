'use strict'
import React from 'react';
import {Utils} from '../Utils.js';
import {Filters} from '../Filters.js';
import {TimeUtils} from '../TimeUtils.js';
import '../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {APP_ROOT} from '../Constants.js';
import {jsonGet} from '../RestClient.js';
import {StoreViewControlPanel as ControlPanel} from './common/StoreControlPanels.js';
import {DisableTimeoutHint, PrefetchHint, Hint, PasswordMask} from './common/Hints.js';
import {ViewJsonDebugger} from './common/Debugger.js';


export default class RemoteView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      store: {},
      raw: {},
      message: ''
    };

    this.getStore = this.getStore.bind(this);
    this.getStoreDisableTimeout = this.getStoreDisableTimeout.bind(this);
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
    jsonGet({
      url: '/api/admin/stores/maven/remote/i-maven-restlet-4',
      done: response => {
        let raw = response;
        let store = Utils.cloneObj(raw);
        store.disabled = raw.disabled === undefined ? false : raw.disabled;
        store.use_x509 = raw.server_certificate_pem || r.key_certificate_pem;
        store.use_proxy = raw.proxy_host && true;
        store.use_auth = (store.use_proxy && store.proxy_user) || store.user;
        this.setState({
          raw: raw
        });
        this.getStoreDisableTimeout(store);
      },
      fail: xhr => {
        this.setState({
          message: JSON.parse(xhr.responseText).error
        });
      }
    });
  }
  getStoreDisableTimeout(store){
    jsonGet({
      url: `/api/admin/schedule/store/${store.packageType}/${store.type}/${store.name}/disable-timeout`,
      done: response => {
        let newStore = Utils.cloneObj(store);
        newStore.disableExpiration = response.expiration;
        this.setState({
          store: newStore
        })
      },
      fail: (xhr, status, error) => {
        console.log("disable timeout getting failed");
        this.setState({
          store: store
        })
      }
    });
  }

  render() {
    let store = this.state.store;
    if(!Utils.isEmptyObj(store))
    {
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
            <div className="fieldset">
              {
                (store.allow_releases || store.allow_snapshots) &&
                (
                  <div>
                    <div className="detail-field">
                      <span>{Filters.checkmark(store.allow_releases)}</span>
                      <label>Allow Releases</label>
                    </div>
                    <div className="detail-field">
                      <span>{Filters.checkmark(store.allow_snapshots)}</span>
                      <label>Snapshots Allowed?</label>
                    </div>
                  </div>
                )
              }
            </div>

            <div className="fieldset-caption">Remote Access</div>
            <RemoteAccessSection store={store} />
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
          <span>{Filters.checkmark(!store.disabled)}</span>
          <label>Enabled?</label>
          {
            store.disabled && store.disableExpiration &&
            <span className="hint">Set to automatically re-enable at {TimeUtils.timestampToDateFormat(store.disableExpiration)}</span>
          }
      </div>
      <div className="detail-field">
        <span>{Filters.checkmark(store.authoritative_index)}</span>
        <label>Authoritative index enabled?</label>
        {
          !store.authoritative_index &&
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
      <div className="detail-field">
        <label>Remote URL:</label>
        <span><a href={store.url} target="_new">{store.url}</a></span>
      </div>
      <div className="sub-fields">
        <div className="detail-field">
          <span>{Filters.checkmark(!store.is_passthrough)}</span>
          <label>Allow Content Caching</label>
          <span><Hint hintKey="passthrough" /></span>
        </div>
        {
          !store.is_passthrough &&
          (
            <div>
              <div className="detail-field">
                <label>Content Cache Timeout:</label>
                <span>{TimeUtils.secondsToDuration(store.cache_timeout_seconds)}</span>
              </div>
              <div className="detail-field">
                <label>Metadata Cache Timeout:</label>
                <span>{TimeUtils.secondsToDuration(store.metadata_timeout_seconds, true)}</span>
              </div>
            </div>
          )
        }
      </div>

      <div className="sub-fields">
        <div className="detail-field">
          <label>Pre-fetching Priority:</label>
          <span>{store.prefetch_priority}</span>
          <PrefetchHint />
        </div>
        <div className="detail-field">
          <span>{Filters.checkmark(store.prefetch_rescan)}</span>
          <label>Allow Pre-fetching Rescan?</label>
        </div>
        <div className="detail-field">
          <label>Pre-fetching Listing Type:</label>
          <span>{store.prefetch_listing_type}</span>
        </div>
      </div>
    </div>
  );
};

const RemoteAccessSection = (props)=> {
  let store = props.store;
  return (
    <div className="fieldset">
      <div className="detail-field">
        <label>Request Timeout:</label>
        <span>{TimeUtils.secondsToDuration(store.timeout_seconds)}</span>
        <span><Hint hintKey="request_timeout" /></span>
      </div>

      {/* HTTP Proxy */}
      <div className="detail-field">
        <span>{Filters.checkmark(store.use_proxy)}</span>
        <label>Use Proxy?</label>
      </div>
      {
        store.use_proxy &&
        (
          <div className="sub-fields">
            <div className="detail-field">
              <label>Proxy Host:</label>
              <span>{store.proxy_host}</span>
            </div>
            <div className="detail-field">
              <label>Proxy Port:</label>
              <span>{store.proxy_port}</span>
            </div>
          </div>
        )
      }
      {/* X.509 / auth */}
      <div className="detail-field">
        <span>{Filters.checkmark(store.use_auth)}</span>
        <label>Use Authentication?</label>
      </div>
      {
         store.use_auth &&
         (
           <div className="sub-fields">
           {
             store.user &&
             <div className="detail-field">
               <label>Username:</label>
               <span>{store.user}</span>
             </div>
           }
           {
             store.password &&
             <div className="detail-field">
               <label>Password:</label>
               <span><PasswordMask /></span>
             </div>
           }
           {
             store.use_proxy && store.proxy_user &&
             <div className="detail-field">
               <label>Proxy Username:</label>
               <span>{store.proxy_user}</span>
             </div>
           }
           {
             store.use_proxy && store.proxy_password &&
             <div className="detail-field">
               <label>Proxy Password:</label>
               <span><PasswordMask /></span>
             </div>
           }
           </div>
         )
      }
      <div className="detail-field">
          <span>{Filters.checkmark(store.use_x509)}</span>
          <label>Use Custom X.509 Configuration?</label>
      </div>
      {
        store.use_x509 &&
        (
          <div className="sub-fields">
          {
            store.key_password &&
            <div className="detail-field">
              <label>Client Key Password:</label>
              <span><ap-password-mask></ap-password-mask></span>
            </div>
          }
            <div className="fieldset two-col">
            {
              store.key_certificate_pem &&
              <div className="left-col">
                <div className="textarea-label">
                  <label>Client Key</label><span className="hint">(PEM Format)</span>
                </div>
                {/* 64 columns is the original PEM line-length spec*/}
                <textarea readOnly className="cert" value={store.key_certificate_pem} />
              </div>
            }
            {
              store.server_certificate_pem &&
              <div className="right-col">
                <div className="textarea-label">
                  <label>Server Certificate</label><span className="hint">(PEM
                    Format)</span>
                </div>
                {/* 64 columns is the original PEM line-length spec*/}
                <textarea readOnly className="cert" value={store.server_certificate_pem} />
              </div>
            }
            </div>
          </div>
        )
      }
    </div>
  )
}
