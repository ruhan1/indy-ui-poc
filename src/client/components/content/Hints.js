'use strict'

import React from 'react';
import '../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Hint = (props) => {
  var hint = 'unknown hint: ' + props.hintKey;
  switch(props.hintKey){
    case 'passthrough':
      hint = 'subject to a configured minimum cache timeout for performance reasons';
      break;
    case 'request_timeout':
      hint = 'subject to a configured minimum request timeout for performance reasons';
      break;
    case 'client_key':
      hint = 'required if Client Key is supplied';
      break;
  }

  return <span className="hint">({hint})</span>;
}

const PasswordMask = ()=> <span class="password-mask">********</span>;

/*
TODO: this DisableTimeoutHint and PrefetchHint has a timeout in original angular like below:
  ['$timeout',function(timer) {
    .....
    timer(..., 0)
  }]
  Not sure what this timeout is doing, will check it later
*/

const DisableTimeoutHint = (props) =>{
  let suggestion = props.children ? props.children:
    'Integer time in seconds which is used for repo automatically re-enable when set disable by errors,' +
    'positive value means time in seconds, -1 means never disable, empty or 0 means use default timeout.';

  return <span className="hint">({suggestion})</span>;
};

const PrefetchHint = (props) => {
  let suggestion = props.children ? props.children:
    'Integer to indicate the pre-fetching priority of the remote, higher means more eager to do the ' +
    'pre-fetching of the content in the repo, 0 or below means disable the pre-fecthing.';

  return <span className="hint">({suggestion})</span>;
}

export {Hint, PasswordMask, DisableTimeoutHint, PrefetchHint};
