import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Utils} from '../CompUtils.js';
import {APP_ROOT} from '../ComponentConstants.js';

export default class GroupListItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hideConstituents: true
    };
    this.displayConstituents = this.displayConstituents.bind(this);
    this.hideConstituents = this.hideConstituents.bind(this);
  }

  displayConstituents(event){
    event.preventDefault();
    this.setState({
      hideConstituents: false
    });
  }

  hideConstituents(event){
    event.preventDefault();
    this.setState({
      hideConstituents: true
    });
  }

  // eslint-disable-next-line max-lines-per-function
  render(){
    let store = this.props.store;
    let storeClass = this.props.storeClass;
    let disMap = this.props.disableMap;
    let constituents = this.props.store.constituents ? Utils.reConstituents(store) : undefined;
    return (
      <div className="store-listing-item">
        <div className="fieldset-caption">
          <Link to={`${APP_ROOT}/group/${store.packageType}/view/${store.name}`}>
            <span className={storeClass}>{store.packageType}-{store.name}</span>
          </Link>
        </div>
        <div className="fieldset">
          <div>
            <div className="left-half">
              <label>Local URL:</label>
              <a href={Utils.storeHref(store.key)} target="_new">{Utils.storeHref(store.key)}</a>
            </div>
            <div className="options-field field right-half">
              <div className="inline-label">
                {store.constituents && store.constituents.length} Constituent(s) [
                <span className="option">
                  {
                    this.state.hideConstituents ?
                    <a href="#" onClick={this.displayConstituents}>+</a> :
                    <a href="#" onClick={this.hideConstituents}>-</a>
                  }
                </span>
                ]
              </div>
              {
                !this.state.hideConstituents && constituents &&

                  <ol className="content-panel subsection">
                    {
                      constituents.map(item => {
                        let itemStoreClass = Utils.isDisabled(item.key, disMap)? "disabled-store":"enabled-store";
                        return (
                          <li key={item.key}>
                            <Link to={`${APP_ROOT}/${item.type}/${item.packageType}/view/${item.name}`}>
                                <span className={itemStoreClass}>{item.key}</span>
                            </Link>
                            {
                              item.type==='remote' &&

                                <div className="subfields">
                                 <span className="description field">(Remote URL: <a target="_new" href={Utils.storeHref(item.key)}>{Utils.storeHref(item.key)}</a>)</span>
                                </div>

                            }
                          </li>
                        );
                      })
                    }
                  </ol>
              }
            </div>
          </div>
          <div className="description field"><span>{store.description}</span></div>
        </div>
      </div>
    );
  }
}

GroupListItem.propTypes={
  store: PropTypes.object.isRequired,
  storeClass: PropTypes.string,
  disableMap: PropTypes.object
};
