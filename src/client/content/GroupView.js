'use strict'
import React from 'react';
import {render} from 'react-dom';
import {Utils} from '../Utils.js';
import {Filters} from '../Filters.js';
import {TimeUtils} from '../TimeUtils.js';
import '../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {APP_ROOT} from '../Constants.js';
import {jsonGet} from '../RestClient.js';
import {StoreViewControlPanel as ControlPanel} from './common/StoreControlPanels.js';
import {DisableTimeoutHint} from './common/Hints.js';
import {ViewJsonDebugger} from './common/Debugger.js';

export default class GroupView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      store: {},
      disabledMap: []
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
    jsonGet('/api/admin/stores/maven/group/build_org-freemarker-freemarker-3-x_20171206.1203',
      response => {
        this.setState({
          store: response
        });
        this.getDisTimeouts();
      },
      jqxhr => {
        this.setState({
          message: JSON.parse(jqxhr.responseText).error
        });
      }
    );
  }
  getDisTimeouts(){
    jsonGet('/api/admin/schedule/store/all/disable-timeout',
      response => {
        let disabledMap = Utils.setDisableMap(response, this.state.listing);
        this.setState({
          disabledMap: disabledMap
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
