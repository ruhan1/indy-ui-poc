'use strict'
import React from 'react';
import {render} from 'react-dom';
import {Utils} from '../Utils.js';
import '../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {remoteOptionLegend as options, APP_ROOT} from "../Constants.js";
import {jsonGet} from "../RestClient.js";
import {StoreViewControlPanel as ControlPanel} from "./common/StoreViewControlPanel.js";

export default class RemoteView extends React.Component {
  constructor(props){
    super(props);
    this.state={

    };
  }

  componentDidMount(){

  }

  render() {
    return (
      <div class="container-fluid">
        <div class="control-panel">
          <ControlPanel
            enabled={true}
            handleDisable={()=>{}}
            handleEdit={()=>{}}
            handleCreate={()=>{}}
            handleRemove={()=>{}} />
        </div>
        {/*
        <div class="content-panel" ng-include="'partials/includes/remote-view.html'">
        </div>
        <div ng-if="enableDebug" class="debug">
            <div class="debug-section">
                <span class="debug-title">JSON FROM SERVER:</span>
              <pre>{{store | json}}</pre>
            </div>
            <div class="debug-section">
                <span class="debug-title">JSON FOR DISPLAY:</span>
              <pre>{{raw | json}}</pre>
            </div>
        </div>
        */}
      </div>
    )
  }
}
