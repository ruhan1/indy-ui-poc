import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {StoreViewControlPanel as ControlPanel} from './StoreControlPanels.jsx';
import {DisableTimeoutHint} from './Hints.jsx';
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
    let getUrl = `/api/admin/stores/${match.params.packageType}/group/${match.params.name}`;
    jsonGet({
      url: getUrl,
      done: response => {
        let raw = response;
        let store = Utils.cloneObj(raw);
        store.disabled = raw.disabled === undefined ? false : raw.disabled;
        this.setState({
          raw: response
        });
        this.getDisTimeouts(store);
      },
      fail: errorText => {
        this.setState({
          message: JSON.parse(errorText).error
        });
      }
    });
  }

  getDisTimeouts = store => {
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
          disabledMap
        });
      },
      fail: () => {
        Utils.logMessage("disable timeout getting failed");
        this.setState({
          store
        });
      }
    });
  }

  /* eslint-disable-next-line max-lines-per-function */
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

            <div className="fieldset-caption">Constituents</div>
            <div className="fieldset">
            {
              store.constituents && store.constituents.length>0 &&

                <ol className="detail-value detail-value-list">
                  {
                    store.constituents.map(item=>{
                      let href = Utils.detailHref(item);
                      let isDisabled = Utils.isDisabled(item, this.state.disabledMap);
                      let storeClassName = isDisabled? 'disabled-store': 'enabled-store';
                      return (
                        <li key={item} className="detail-value-list-item">
                        {
                          href?
                          <Link to={href}>
                            <span className={storeClassName} >{item}</span>
                          </Link>:
                          <span>{item}</span>
                        }
                        </li>
                      );
                    })
                  }
              </ol>
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
  /* eslint-enable-next-line max-lines-per-function */
}

GroupView.propTypes={
  match: PropTypes.object
};

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
          // TODO: is this store.demo still available now?
          store.demo ?
          <span>{Utils.storeHref(store.key)}</span> :
          <span><a href={Utils.storeHref(store.key)} target="_new">{Utils.storeHref(store.key)}</a></span>
        }
      </div>
    </div>;
BasicSection.propTypes = {
  store: PropTypes.object.isRequired
};
