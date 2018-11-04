'use strict'

import React from 'react';
import {render} from 'react-dom';
import '../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class ListControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      enableDebug: false
    }
  }

  render(){
    return (
      <div className="control-panel">
        <div className="cp-row">
          <button onClick={this.props.handleCreateNew}>New...</button>
          {
            this.props.useHideAll &&
            (
              <button onClick={this.props.handleHideAll}>Hide All</button>
            )
          }
        </div>
        {
          this.props.useSearch &&
          (
            <div className="cp-row">
              Search:&nbsp;<input name="query" />
            </div>
          )
        }
        {
          this.props.useOrderBy && this.props.orderBys &&
          (
            <div className="cp-row">
              Sort by:&nbsp;
              <select name="orderProp">
                {
                  this.props.orderBys.map(orderBy=><option key={`legend-${orderBy.value}`} value={orderBy.value}>{orderBy.text}</option>)
                }
              </select>
            </div>
          )
        }
        {
          this.props.useLegend && this.props.legends &&
          (
            <div className="cp-row">
              <div className="legend">
                <div className="label" style={{fontSize:"75%", padding: ".2em .6em .3em"}}>Capability Legend:</div>
                <ul>
                  {
                    this.props.legends.map(
                      option =>
                       (
                         <li key={option.title}>
                           <div>
                             <span className="key">{option.icon} </span>
                             <span>{option.title}</span>
                           </div>
                         </li>
                      )
                    )
                  }
                </ul>
              </div>
            </div>
          )
        }
        {
          this.props.useDebug &&
          (
            <div className="cp-row cp-debug">
              <input type="checkbox" name="enableDebug" checked={this.state.enableDebug} onChange={this.props.handleDebug} /> Debug Data
            </div>
          )
        }
      </div>
    );
  }
}