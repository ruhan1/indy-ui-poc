'use strict'

import React from 'react';
import '../../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import JSONPretty from 'react-json-pretty';

export const JsonDebugger = (props) =>
{
  return props.enableDebug && props.jsonObj &&
    (
      <div className="debug">
        JSON:
        <JSONPretty id="json-pretty" json={props.jsonObj}></JSONPretty>
      </div>
    );
};
