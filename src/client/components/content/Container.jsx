'use strict'

import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text
} from '@patternfly/react-core/'
import RemoteList from './RemoteList.jsx';
import HostedList from './HostedList.jsx';
import GroupList from './GroupList.jsx';
import RemoteView from './RemoteView.jsx';
import HostedView from './HostedView.jsx';
import GroupView from './GroupView.jsx';
import RemoteEdit from './RemoteEdit.jsx';
import {APP_ROOT} from '../ComponentConstants.js'


const browseCompatible=`<!--[if lt IE 7]>
    <p className="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->`;

const isHome = false;

const Container = () => (
  <div>
     {/*browseCompatible*/}
    <React.Fragment>
      <Switch>
        <Route exact path={[`${APP_ROOT}`]} component={Home} />
        <Route exact path={`${APP_ROOT}/remote`} component={RemoteList} />
        <Route exact path={`${APP_ROOT}/hosted`} component={HostedList} />
        <Route exact path={`${APP_ROOT}/group`} component={GroupList} />

        <Route path={`${APP_ROOT}/remote/:packageType/view/:name`} component={RemoteView} />
        <Route path={`${APP_ROOT}/hosted/:packageType/view/:name`} component={HostedView} />
        <Route path={`${APP_ROOT}/group/:packageType/view/:name`} component={GroupView} />
        {
        <Route exact path={[`${APP_ROOT}/remote/new`,`${APP_ROOT}/remote/:packageType/edit/:name`]} component={RemoteEdit} />
        // <Route exact path={[`${APP_ROOT}/hosted/new`,`${APP_ROOT}/hosted/:packageType/edit/:name`]} component={HostedEdit} />
        // <Route exact path={[`${APP_ROOT}/group/new`,`${APP_ROOT}/group/:packageType/edit/:name`]} component={GroupEdit} />

        // <Route exact path={[`${APP_ROOT}/nfc`, `${APP_ROOT}/nfc/view/all`, `${APP_ROOT}/nfc/view/:packageType/:type/:name`]} component={} />
        //
        // <Route exact path={`${APP_ROOT}/logout`} component={} />
        }
      </Switch>
    </React.Fragment>

  </div>
);

const Home = () => (
  <React.Fragment>
    <PageSection>
      <TextContent>
        <Text component="h1">Welcome! Make a selection from the menu above to proceed.</Text>
      </TextContent>
    </PageSection>
  </React.Fragment>
);

export default Container;
