'use strict'

import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {
  Page,
  PageSection,
  PageSectionVariants
} from '@patternfly/react-core';
import '@patternfly/react-core/dist/styles/base.css';
import NavHeader from './nav/NavHeader.jsx';
// import NavFooter from './nav/NavFooter.jsx';
// import Container from './content/Container.jsx';

const header = <NavHeader />;

const Root = ()=>(
  <React.Fragment>
    <Page header={header}>
    </Page>
  </React.Fragment>
);

export default Root;
