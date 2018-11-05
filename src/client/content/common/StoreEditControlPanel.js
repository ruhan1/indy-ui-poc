'use strict'

import React from 'react';
import '../../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const StoreEditControlPanel = (props) =>
(
  <div className="cp-row">
    <button name="save" onClick={props.handleSave} className="cp-button">Save</button>
    <button name="cancel" onClick={props.handleCancel} className="cp-button">Cancel</button>
    <button name="del" onClick={props.handleRemove} className="del-button cp-button">
      Delete
    </button>
  </div>
);
