'use strict'

import React from 'react';
import '../../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const StoreViewControlPanel = function(props)
{
  let enabled = props.enabled;
  let enableText = enabled?"Disable":"Enable";
  let enableHandler = enabled?props.handleDisable:props.handleEnable;
  return
  (
    <div className="cp-row-group">
      <div className="cp-row">
        <button onClick={enableHandler}>{enableText}</button>
      </div>
      <div className="cp-row">
        <button onClick={props.handleEdit}>Edit</button>
    	  <button onClick={props.handleCreate}>New...</button>
    	  <button name="del" onClick={props.handleRemove} className="del-button cp-button">
          Delete
        </button>
    	</div>
    </div>
  );
};
