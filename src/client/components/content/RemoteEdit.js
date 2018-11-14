'use strict'
import React from 'react';
import PropTypes from 'prop-types';
import {StoreEditControlPanel as EditControlPanel} from './StoreControlPanels.js';
import {DisableTimeoutHint, PrefetchHint, Hint, PasswordMask} from './Hints.js';
import {ViewJsonDebugger} from './Debugger.js';
import '../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Utils} from '../CompUtils.js';
import {Filters} from '../Filters.js';
import {TimeUtils} from '../../TimeUtils.js';
import {APP_ROOT} from '../ComponentConstants.js';
import {jsonGet} from '../../RestClient.js';


export default class RemoteEdit extends React.Component {
  constructor(props){
    super(props)

    let [location, match] = [props.location, props.match];
    let path = location.pathname;
    let mode = path.endsWith('remote/new')? 'new':'edit';
    let packageType='', name='';

    if(mode === 'edit'){
      [packageType, name] = [match.params.packageType, match.params.name];
    }

    this.state={
      mode: mode,
      packageType: packageType,
      name: name
    }

    console.log(this.state);

    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleSave(){
    //TODO need to implement save logic
  }
  handleCancel(){
    //TODO need to implement cancel logic
  }
  handleRemove(){
    //TODO need to implement remove logic
  }

  render(){
    return (
      <div className="container-fluid">

        <div className="control-panel">
          <EditControlPanel
            handleSave={this.handleSave}
            handleCancel={this.handleCancel}
            handleRemove={this.handleRemove} />
        </div>

        {/*
        <div className="content-panel">

          <div className="fieldset-caption">Basics</div>
          <div className="fieldset">
              <div className="detail-field">
                <label>Package Type:</label>
                <span ng-if="!editMode">
                  <select ng-model="raw.packageType">
                    <option ng-repeat="option in packageTypes" value="{{option}}">{{option}}</option>
                  </select>
                </span>
                <span ng-if="editMode" className="key">{{raw.packageType}}</span>
              </div>
              <div className="detail-field">
                <label>Name:</label>
                <span ng-if="!editMode"><input type="text" ng-model="raw.name" size="25" /></span>
                <span ng-if="editMode" className="key">{{raw.name}}</span>
              </div>

              <div className="detail-field">
                  <input type="checkbox" ng-model="raw.enabled" />
                  <label>Enabled?</label>
                  <span className="hint" ng-if="!raw.enabled && raw.disableExpiration">Set to automatically re-enable at {{raw.disableExpiration | dateFormat}}</span>
              </div>
              <div className="detail-field">
                <input type="checkbox" ng-model="store.authoritative_index" />
                <label>Authoritative content Index?</label>
                <span className="hint">Make the content index authoritative to this repository</span>
              </div>

              <div className="sub-fields">
                <div className="detail-field">
                  <label>Disable Timeout:</label>
                  <input type="text" ng-model="store.disable_timeout" />
                  <ap-disable-timeout-hint></ap-disable-timeout-hint>
                </div>
              </div>

              <div className="detail-field">
                <label>Remote URL:</label>
                <input type="text" ng-model="store.url" size="92"/>
              </div>

              <div className="sub-fields">
                <div className="detail-field">
                 <input type="checkbox" ng-model="store.is_passthrough" />
                 <label>{"Don't Cache Content"}</label>
                 <ap-hint key="passthrough"></ap-hint>
                </div>
                <div ng-if="!store.is_passthrough" className="detail-field">
                 <label>Content Cache Timeout:</label>
                 <input type="text" ng-model="raw.cache_timeout_seconds"/>
                 <ap-duration-hint></ap-duration-hint>
                </div>
                <div ng-if="!store.is_passthrough" className="detail-field">
                  <label>Metadata Cache Timeout:</label>
                  <input type="text" ng-model="raw.metadata_timeout_seconds"/>
                  <ap-duration-hint>24h 36m 00s. Negative means never timeout, 0 means using default timeout by Indy settings.</ap-duration-hint>
                </div>
              </div>

              <div className="sub-fields">
                <div className="detail-field">
                  <label>Pre-fetching Priority:</label>
                  <input type="text" ng-model="store.prefetch_priority" size="5"/>
                  <ap-pre-fetch-hint></ap-pre-fetch-hint>
                </div>
                <div className="detail-field">
                  <span><input type="checkbox" ng-model="store.prefetch_rescan"/></span>
                  <label>Allow Pre-fetching Rescan?</label>
                </div>
                <div className="detail-field">
                  <label>Pre-fetching Listing Type:</label>
                  <input type="radio" ng-model="store.prefetch_listing_type" value="html"/> <span>html</span>
                  <input type="radio" ng-model="store.prefetch_listing_type" value="koji"/> <span>koji</span>
                </div>
              </div>
          </div>


          <div className="fieldset-caption">Description</div>
          <div className="fieldset">
            <textarea rows="3" className="text-description" ng-model="store.description"></textarea>
          </div>

          <div className="fieldset-caption">Capabilities</div>
          <div className="fieldset">
            <div className="detail-field">
              <span><input type="checkbox" ng-model="store.allow_releases"/></span>
              <label>Allow Releases</label>
            </div>
            <div className="detail-field">
              <span><input type="checkbox" ng-model="store.allow_snapshots"/></span>
              <label>Allow Snapshots</label>
            </div>
          </div>

          <div className="fieldset-caption">Remote Access</div>
          <div className="fieldset">
            <div className="detail-field">
              <label>Request Timeout:</label>
              <input type="text" ng-model="raw.timeout_seconds"/>
              <ap-duration-hint></ap-duration-hint>
            </div>
            <div className="detail-hint">
              <ap-hint key="request_timeout"></ap-hint>
            </div>

            <!-- HTTP Proxy -->
            <div className="detail-field">
              <input type="checkbox" ng-model="raw.use_proxy" />
              <label>Use Proxy?</label>
            </div>
            <div className="sub-fields" ng-if="raw.use_proxy">
                <div className="detail-field">
                  <label>Proxy Host:</label>
                  <input type="text" ng-model="store.proxy_host" size="20"/>
                </div>
                <div className="detail-field">
                  <label>Proxy Port:</label>
                  <input type="text" ng-model="store.proxy_port" size="6"/>
                </div>
            </div>

            <!-- X.509 / auth -->
            <div className="detail-field">
              <input type="checkbox" ng-model="raw.use_auth" />
              <label>Use Authentication?</label>
            </div>
            <div className="sub-fields" ng-if="raw.use_auth">
                <div className="detail-field">
                  <label>Username:</label>
                  <input type="text" ng-model="store.user" size="25"/>
                </div>
                <div className="detail-field">
                  <label>Password:</label>
                  <input type="password" ng-model="store.password" size="25"/>
                </div>
                <div className="detail-field" ng-if="raw.use_proxy">
                  <label>Proxy Username:</label>
                  <input type="text" ng-model="store.proxy_user" size="20"/>
                </div>
                <div className="detail-field" ng-if="raw.use_proxy">
                  <label>Proxy Password:</label>
                  <input type="password" ng-model="store.proxy_password" size="20"/>
              </div>
            </div>

            <div className="detail-field">
              <input type="checkbox" ng-model="raw.use_x509" />
              <label>Use Custom X.509 Configuration?</label>
            </div>

            <div className="sub-fields" ng-if="raw.use_x509">
                  <div className="detail-field" ng-if="raw.use_auth">
                    <label>Client Key Password:</label>
                    <input type="password" ng-model="store.key_password"/><ap-hint key="client_key"></ap-hint>
                  </div>
                  <div className="fieldset two-col">
                    <div className="left-col" ng-if="raw.use_auth">
                      <div className="textarea-label">
                        <label>Client Key</label><span className="hint">(PEM Format)</span>
                      </div>
                      <!-- 64 columns is the original PEM line-length spec -->
                      <textarea className="cert" cols="68" ng-model="store.key_certificate_pem"></textarea>
                    </div>

                    <div className="right-col">
                      <div className="textarea-label">
                        <label>Server Certificate</label><span className="hint">(PEM Format)</span>
                      </div>
                      <!-- 64 columns is the original PEM line-length spec -->
                      <textarea className="cert" cols="68" ng-model="store.server_certificate_pem"></textarea>
                    </div>
              </div>
            </div>
          </div>
        </div>
        */}
      </div>
    );
  }

}

RemoteEdit.propTypes={
  store: PropTypes.object
}
