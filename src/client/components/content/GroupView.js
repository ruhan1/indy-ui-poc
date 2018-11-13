'use strict'
import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import {StoreViewControlPanel as ControlPanel} from './StoreControlPanels.js';
import {DisableTimeoutHint} from './Hints.js';
import {ViewJsonDebugger} from './Debugger.js';
import '../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {APP_ROOT} from '../ComponentConstants.js';
import {Utils} from '../CompUtils.js';
import {Filters} from '../Filters.js';
import {TimeUtils} from '../../TimeUtils.js';
import {jsonGet} from '../../RestClient.js';


export default class GroupView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      raw: {},
      store: {},
      disabledMap: [],
      message: ''
    };

    this.getStore = this.getStore.bind(this);
    this.getDisTimeouts = this.getDisTimeouts.bind(this);
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
      url: '/api/admin/stores/maven/group/build_org-freemarker-freemarker-3-x_20171206.1203',
      done: response => {
        let raw = response;
        let store = Utils.cloneObj(raw);
        store.disabled = raw.disabled === undefined ? false : raw.disabled;
        this.setState({
          raw: response
        });
        this.getDisTimeouts(store);
      },
      fail: jqxhr => {
        this.setState({
          message: JSON.parse(jqxhr.responseText).error
        });
      }
    });
  }
  getDisTimeouts(store){
    jsonGet({
      url: '/api/admin/schedule/store/all/disable-timeout',
      done: response => {
        let newStore = Utils.cloneObj(store);
        let disabledMap = Utils.setDisableMap(response, this.state.listing);
        let expiration = disabledMap[store.key];
        if(expiration){
          newStore.disableExpiration = expiration;
        }
        this.setState({
          store: newStore,
          disabledMap: disabledMap
        });
      },
      fail: jqxhr => {
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

            <div className="fieldset-caption">Constituents</div>
            <div className="fieldset">
            {
              store.constituents && store.constituents.length>0 &&
              (
                <ol className="detail-value detail-value-list">
                  {
                    store.constituents.map((item)=>{
                      let href = Utils.detailHref(item);
                      let isDisabled = Utils.isDisabled(item, this.state.disabledMap);
                      let storeClassName = isDisabled? 'disabled-store': 'enabled-store';
                      return (
                        <li key={item} className="detail-value-list-item">
                        {
                          href?
                          <a href={href}>
                            <span className={storeClassName} >{item}</span>
                          </a>:
                          <span>{item}</span>
                        }
                        </li>
                      );
                    })
                  }
              	</ol>
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

const BasicSection = ({store})=>{
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
    		<span>{Filters.checkmark(store.prepend_constituent)}</span>
    		<label>Prepend Constituents?</label>
    		<span className="hint">If enabled, all new constituents which are added not manually(like promotion) will be at the top of constituents list</span>
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
    </div>
  );
};

BasicSection.propTypes = {
  store: PropTypes.object.isRequired
}
