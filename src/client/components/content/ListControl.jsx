

import React from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  Checkbox,
  Select,
  SelectOption,
  Button,
  ButtonVariant
} from '@patternfly/react-core';

class ListControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      enableDebug: false,
      searchValue: '',
      orderByValue: '',
      debugChecked: false
    };
  }

  handleSearchChange = value => {
    this.setState({
      searchValue: value
    });
    this.props.handleSearch(value);
  };

  handleOrderByChange = value =>{
    this.setState({
      orderByValue: value
    });
  };

  handleDebugChange = checked => {
    this.setState({
      debugChecked: checked
    });
    this.props.handleDebug(checked);
  };


  render(){
    const {enableDebug, searchValue, orderByValue, debugChecked} = this.state;
    return (
      <div className="control-panel">
        <div className="cp-row">
          <Button variant={ButtonVariant.secondary} onClick={this.props.handleCreateNew}>New...</Button>{' '}
          {
            this.props.useHideAll &&
              <Button variant={ButtonVariant.secondary} onClick={this.props.handleHideAll}>Hide All</Button>
          }
        </div>
        {
          this.props.useSearch &&
            <div className="cp-row">
              Search:{' '}
              <TextInput
              type="text"
              id="search-query"
              name="query"
              value={searchValue}
              onChange={this.handleSearchChange} />
            </div>
        }
        {
          this.props.useOrderBy && this.props.orderBys &&
            <div className="cp-row">
              Sort by:{' '}
              <Select value={this.state.orderByValue} onChange={this.handleOrderByChange} id="sortBy">
                {
                  this.props.orderBys.map(orderBy=><SelectOption key={`legend-${orderBy.value}`} value={orderBy.value} label={orderBy.text} />)
                }
              </Select>
            </div>
        }
        {
          this.props.useLegend && this.props.legends &&
            <div className="cp-row">
              <div className="legend">
                <div className="label" style={{fontSize: "75%", padding: ".2em .6em .3em"}}>Capability Legend:</div>
                <ul>
                  {
                    this.props.legends.map(option => <li key={option.title}>
                           <div>
                             <span className="key">{option.icon} </span>
                             <span>{option.title}</span>
                           </div>
                         </li>)
                  }
                </ul>
              </div>
            </div>
        }
        {
          this.props.useDebug &&
            <div className="cp-row cp-debug">
              <Checkbox
                label="Debug Data"
                isChecked={debugChecked}
                onChange={this.handleDebugChange}
                aria-label="Debug Data"
                id="debug-data"/>
            </div>
        }
      </div>
    );
  }
}

ListControl.propTypes={
  handleCreateNew: PropTypes.func,
  useHideAll: PropTypes.bool,
  handleHideAll: PropTypes.func,
  useSearch: PropTypes.bool,
  handleSearch: PropTypes.func,
  useOrderBy: PropTypes.bool,
  orderBys: PropTypes.array,
  useLegend: PropTypes.bool,
  legends: PropTypes.array,
  useDebug: PropTypes.bool,
  handleDebug: PropTypes.func
};

export default ListControl;
