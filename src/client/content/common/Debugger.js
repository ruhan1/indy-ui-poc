'use strict'

import React from 'react';
import '../../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import JSONPretty from 'react-json-pretty';

const ListJsonDebugger = (props) =>
{
  return props.enableDebug && props.jsonObj &&
  (
    <div className="debug">
      JSON:
      <JSONPretty id="json-pretty" json={props.jsonObj}></JSONPretty>
    </div>
  );
};

const ViewJsonDebugger = (props) =>
{
  return props.enableDebug &&
  (
    <div className="debug">
    {
      props.storeJson &&
      <div className="debug-section">
        <span className="debug-title">JSON FROM SERVER:</span>
        <JSONPretty id="store-json-pretty" json={props.storeJson}></JSONPretty>
      </div>
    }
    {
      props.rawJson &&
      <div className="debug-section">
        <span className="debug-title">JSON FOR DISPLAY:</span>
        <JSONPretty id="raw-json-pretty" json={props.rawJson}></JSONPretty>
      </div>
    }
    </div>
  );
}

export {ListJsonDebugger, ViewJsonDebugger};
