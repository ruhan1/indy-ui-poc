import React from 'react';
import PropTypes from 'prop-types';
import JSONPretty from 'react-json-pretty';

const ListJsonDebugger = ({enableDebug, jsonObj}) => enableDebug && jsonObj &&

    <div className="debug">
      JSON:
      <JSONPretty id="json-pretty" json={jsonObj}></JSONPretty>
    </div>;
ListJsonDebugger.propTypes = {
  enableDebug: PropTypes.bool,
  jsonObj: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

const ViewJsonDebugger = ({enableDebug, storeJson, rawJson}) => enableDebug &&

    <div className="debug">
    {
      storeJson &&
      <div className="debug-section">
        <span className="debug-title">JSON FROM SERVER:</span>
        <JSONPretty id="store-json-pretty" json={storeJson}></JSONPretty>
      </div>
    }
    {
      rawJson &&
      <div className="debug-section">
        <span className="debug-title">JSON FOR DISPLAY:</span>
        <JSONPretty id="raw-json-pretty" json={rawJson}></JSONPretty>
      </div>
    }
    </div>;
ViewJsonDebugger.propTypes = {
  enableDebug: PropTypes.bool,
  storeJson: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  rawJson: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export {ListJsonDebugger, ViewJsonDebugger};
