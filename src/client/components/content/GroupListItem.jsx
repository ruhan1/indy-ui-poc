import React from 'react';
import {Link} from 'react-router-dom';
import {GridItem} from '@patternfly/react-core';
import PropTypes from 'prop-types';
import {Utils} from '../CompUtils.js';
import {LocalURLSection} from './CommonPageWidget.jsx';
import {APP_ROOT} from '../ComponentConstants.js';

export default class GroupListItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hideConstituents: true
    };
  }

  displayConstituents = event => {
    event.preventDefault();
    this.setState({
      hideConstituents: false
    });
  }

  hideConstituents = event => {
    event.preventDefault();
    this.setState({
      hideConstituents: true
    });
  }

  /* eslint-disable max-lines-per-function */
  render(){
    let {store, storeClass, disableMap} = this.props;
    let constituents = this.props.store.constituents ? Utils.reConstituents(store) : undefined;
    return (
      <GridItem key={store.key} span={8}>
        <div className="fieldset-caption">
          <Link to={`${APP_ROOT}/group/${store.packageType}/view/${store.name}`}>
            <span className={storeClass}>{store.packageType}-{store.name}</span>
          </Link>
        </div>
        <div className="fieldset">
          <div>
            <LocalURLSection storeKey={store.key} />
          </div>
          <div>
            <div className="options-field field left-half">
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
                        let itemStoreClass = Utils.isDisabled(item.key, disableMap)? "disabled-store":"enabled-store";
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
      </GridItem>
    );
  }
  /* eslint-enable max-lines-per-function */
}

GroupListItem.propTypes={
  store: PropTypes.object.isRequired,
  storeClass: PropTypes.string,
  disableMap: PropTypes.object
};
