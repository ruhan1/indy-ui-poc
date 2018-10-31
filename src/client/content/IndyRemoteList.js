'use strict'

import React from 'react';
import {render} from 'react-dom';
import {Utils} from '../IndyUtils.js';
import '../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// mock data
const options = [
  {icon: "S", title: "Snapshots allowed"},
  {icon: "R", title: "Releases allowed"}
];

const listing = [
  {
    "type" : "remote",
    "key" : "maven:remote:koji-org.jboss.ws-jbossws-common-tools-1.2.4.Final_redhat_1-1",
    "metadata" : {
      "koji-NVR" : "org.jboss.ws-jbossws-common-tools-1.2.4.Final_redhat_1-1",
      "origin" : "koji",
      "creation-trigger-GAV" : "org.jboss.ws:jbossws-common-tools:pom:1.2.4.Final-redhat-1"
    },
    "disabled" : false,
    "host" : "download.eng.bos.redhat.com",
    "port" : 80,
    "name" : "koji-org.jboss.ws-jbossws-common-tools-1.2.4.Final_redhat_1-1",
    "type" : "remote",
    "packageType" : "maven",
    "disable_timeout" : -1,
    "path_style" : "plain",
    "path_mask_patterns" : [ "org/jboss/ws/jbossws-common-tools/1.2.4.Final-redhat-1/jbossws-common-tools-1.2.4.Final-redhat-1.jar", "org/jboss/ws/jbossws-common-tools/1.2.4.Final-redhat-1/jbossws-common-tools-1.2.4.Final-redhat-1.pom", "org/jboss/ws/jbossws-common-tools/1.2.4.Final-redhat-1/jbossws-common-tools-1.2.4.Final-redhat-1-scm-sources.zip", "org/jboss/ws/jbossws-common-tools/1.2.4.Final-redhat-1/jbossws-common-tools-1.2.4.Final-redhat-1-sources.jar", "org/jboss/ws/jbossws-common-tools/1.2.4.Final-redhat-1/jbossws-common-tools-1.2.4.Final-redhat-1-project-sources.tar.gz", "org/jboss/ws/jbossws-common-tools/1.2.4.Final-redhat-1/jbossws-common-tools-1.2.4.Final-redhat-1-javadoc.jar" ],
    "authoritative_index" : true,
    "allow_snapshots" : true,
    "allow_releases" : true,
    "url" : "http://download.eng.bos.redhat.com/brewroot/packages/org.jboss.ws-jbossws-common-tools/1.2.4.Final_redhat_1/1/maven",
    "timeout_seconds" : 600,
    "max_connections" : 30,
    "ignore_hostname_verification" : false,
    "nfc_timeout_seconds" : 0,
    "is_passthrough" : false,
    "cache_timeout_seconds" : 0,
    "metadata_timeout_seconds" : 0,
    "proxy_port" : 0,
    "prefetch_priority" : 0,
    "prefetch_rescan" : false,
    "prefetch_listing_type" : "html"
  }, {
    "type" : "remote",
    "key" : "maven:remote:i-maven-restlet-4",
    "description" : "Implicitly created repo for: Public online Restlet repository (maven-restlet) from repository declaration removed by PME in build 516 (repo: build_org-apache-camel-camel-2-20-0-fuse-000120fuse_test_1_20180128.1929)",
    "metadata" : {
      "changelog" : "Creating extra remote repository Public online Restlet repository (maven-restlet) for build: 516 (repo: build_org-apache-camel-camel-2-20-0-fuse-000120fuse_test_1_20180128.1929)",
      "origin" : "implied-repos"
    },
    "disabled" : false,
    "host" : "maven.restlet.org",
    "port" : 80,
    "name" : "i-maven-restlet-4",
    "type" : "remote",
    "packageType" : "maven",
    "disable_timeout" : 0,
    "path_style" : "plain",
    "authoritative_index" : false,
    "allow_snapshots" : true,
    "allow_releases" : true,
    "url" : "http://maven.restlet.org",
    "timeout_seconds" : 0,
    "max_connections" : 30,
    "ignore_hostname_verification" : false,
    "nfc_timeout_seconds" : 0,
    "is_passthrough" : false,
    "cache_timeout_seconds" : 0,
    "metadata_timeout_seconds" : 0,
    "proxy_port" : 0,
    "prefetch_priority" : 0,
    "prefetch_rescan" : false,
    "prefetch_listing_type" : "html"
  }, {
    "type" : "remote",
    "key" : "maven:remote:Promote_tmp_jboss-releases20180531.044347.594+0000",
    "disabled" : false,
    "host" : "pnc-indy-branch-nightly.project-newcastle.svc.cluster.local",
    "port" : 80,
    "name" : "Promote_tmp_jboss-releases20180531.044347.594+0000",
    "type" : "remote",
    "packageType" : "maven",
    "disable_timeout" : 0,
    "path_style" : "plain",
    "authoritative_index" : false,
    "allow_snapshots" : false,
    "allow_releases" : true,
    "url" : "http://pnc-indy-branch-nightly.project-newcastle.svc.cluster.local/api/content/maven",
    "timeout_seconds" : 0,
    "max_connections" : 30,
    "ignore_hostname_verification" : false,
    "nfc_timeout_seconds" : 0,
    "is_passthrough" : false,
    "cache_timeout_seconds" : 0,
    "metadata_timeout_seconds" : 0,
    "proxy_port" : 0,
    "prefetch_priority" : 0,
    "prefetch_rescan" : false,
    "prefetch_listing_type" : "html"
  }, {
    "type" : "remote",
    "key" : "maven:remote:koji-io.dropwizard.metrics-metrics-parent-3.1.2.redhat_1-1",
    "metadata" : {
      "koji-NVR" : "io.dropwizard.metrics-metrics-parent-3.1.2.redhat_1-1",
      "origin" : "koji",
      "creation-trigger-GAV" : "io.dropwizard.metrics:metrics-core:pom:3.1.2.redhat-1"
    },
    "disabled" : false,
    "host" : "download.eng.bos.redhat.com",
    "port" : 80,
    "name" : "koji-io.dropwizard.metrics-metrics-parent-3.1.2.redhat_1-1",
    "type" : "remote",
    "packageType" : "maven",
    "disable_timeout" : -1,
    "path_style" : "plain",

    "authoritative_index" : true,
    "allow_snapshots" : true,
    "allow_releases" : true,
    "url" : "http://download.eng.bos.redhat.com/brewroot/packages/io.dropwizard.metrics-metrics-parent/3.1.2.redhat_1/1/maven",
    "timeout_seconds" : 600,
    "max_connections" : 30,
    "ignore_hostname_verification" : false,
    "nfc_timeout_seconds" : 0,
    "is_passthrough" : false,
    "cache_timeout_seconds" : 0,
    "metadata_timeout_seconds" : 0,
    "proxy_port" : 0,
    "prefetch_priority" : 0,
    "prefetch_rescan" : false,
    "prefetch_listing_type" : "html"
  }
]

export default class IndyRemoteList extends React.Component {
  constructor(props){
    super(props);
    this.createNew = this.createNew.bind(this);
  }
  createNew(){
    //mock
  }
  render(){
    return (
      <div className="container-fluid">
        <div className="control-panel">
          <div className="cp-row">
            <button onClick={this.createNew}>New...</button>
          </div>
          <div className="cp-row">
            Search: <input name="query" />
          </div>
          <div className="cp-row">
            Sort by:
            <select name="orderProp">
              <option value="key">Name</option>
              <option value="url">Remote URL</option>
            </select>
          </div>
          <div className="cp-row">
            <div className="legend">
              <div className="label">Capability Legend:</div>
              <ul>
                <li>
                  {
                    options.map(
                      option =>
                       (
                        <div key={option.title}>
                          <span className="key">{option.icon}</span>
                          <span className="value">{option.title}</span>
                        </div>
                      )
                    )
                  }
                </li>
              </ul>
            </div>
          </div>
          <div className="cp-row cp-debug">
            <input type="checkbox" name="enableDebug" checked={false} /> Debug Data
          </div>
        </div>
        <div className="content-panel">
          <div className="store-listing">
            {
              listing.map(function(store){
                return (
                  <div key={store.key} className="listing-item list-item store-listing-item listing-item-start">
                    <div className="fieldset-caption">
                        <a href={`view/remote/${store.packageType}/view/${store.name}`}>
                            <span className="enabled-store" ng-if="!isDisabled(store.key)">{store.packageType}-{store.name}</span>
                            <span className="disabled-store" ng-if="isDisabled(store.key)">{store.packageType}-{store.name}</span>
                        </a>
                    </div>
                    <div className="fieldset two-col">
                      <div className="two-col">
                        <div className="field left-half">
                          <label>Local URL:</label>
                          <a href={store.storeHref} target="_new">{store.storeHref}</a>
                        </div>
                        <div className="field right-half">
                          <label>Remote URL:</label>
                          <a href={store.url} target="_new">{store.url}</a>
                        </div>
                      </div>
                      <div className="two-col">
                        <div className="options-field field left-half">
                          <label>Capabilities:</label>
                          {
                            Utils.remoteOptions(store).map(
                              option =>
                              (
                                <div key={option.title} className="options">
                                  <span className="key">{option.icon}</span>
                                </div>
                              )
                            )
                          }
                        </div>
                      </div>
                      <div className="description field"><span>{store.description}</span></div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

        {/*
        <div ng-if="enableDebug" className="debug">
            JSON:
            <pre>{{listing | json}}</pre>
        </div>
        */}
      </div>
    );
  }
}
