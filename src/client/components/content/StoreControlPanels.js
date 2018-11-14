'use strict'

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const StoreEditControlPanel = ({handleSave, handleCancel, handleRemove}) =>(
  <div className="cp-row">
    <button name="save" onClick={handleSave} className="cp-button">Save</button>
    <button name="cancel" onClick={handleCancel} className="cp-button">Cancel</button>
    <button name="del" onClick={handleRemove} className="del-button cp-button">
      Delete
    </button>
  </div>
);

StoreEditControlPanel.propTypes={
  handleSave: PropTypes.func,
  handleCancel: PropTypes.func,
  handleRemove: PropTypes.func
};

const StoreViewControlPanel = function({enabled, handleDisable, handleEnable, handleEdit, handleCreate, handleRemove}){
  let enableText = enabled?"Disable":"Enable";
  let enableHandler = enabled?handleDisable:handleEnable;
  return(
    <div className="cp-row-group">
      <div className="cp-row">
        <button onClick={enableHandler}>{enableText}</button>
      </div>
      <div className="cp-row">
        <button onClick={handleEdit}>Edit</button>{'  '}
    	  <button onClick={handleCreate}>New...</button>{'  '}
    	  <button name="del" onClick={handleRemove} className="del-button cp-button">
          Delete
        </button>
    	</div>
    </div>
  );
};

StoreViewControlPanel.propTypes={
  enabled: PropTypes.bool,
  handleDisable: PropTypes.func,
  handleEnable: PropTypes.func,
  handleEdit: PropTypes.func,
  handleCreate: PropTypes.func,
  handleRemove: PropTypes.func
}

export {StoreEditControlPanel, StoreViewControlPanel};
