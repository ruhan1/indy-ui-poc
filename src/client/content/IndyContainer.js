'use strict'

import React from 'react';
import {render} from 'react-dom';
import {Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class IndyContainer extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (<Container />);
  }
}
