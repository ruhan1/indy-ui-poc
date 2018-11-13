'use strict'

import React from 'react';
import '../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const StoreEditControlPanel = (props) =>(
  <div className="cp-row">
    <button name="save" onClick={props.handleSave} className="cp-button">Save</button>
    <button name="cancel" onClick={props.handleCancel} className="cp-button">Cancel</button>
    <button name="del" onClick={props.handleRemove} className="del-button cp-button">
      Delete
    </button>
  </div>
);

const StoreViewControlPanel = function(props){
  let enabled = props.enabled;
  let enableText = enabled?"Disable":"Enable";
  let enableHandler = enabled?props.handleDisable:props.handleEnable;
  return(
    <div className="cp-row-group">
      <div className="cp-row">
        <button onClick={enableHandler}>{enableText}</button>
      </div>
      <div className="cp-row">
        <button onClick={props.handleEdit}>Edit</button> &nbsp;
    	  <button onClick={props.handleCreate}>New...</button> &nbsp;
    	  <button name="del" onClick={props.handleRemove} className="del-button cp-button">
          Delete
        </button>
    	</div>
    </div>
  );
}

export {StoreEditControlPanel, StoreViewControlPanel};
