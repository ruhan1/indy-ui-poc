'use strict'

import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {
  BackgroundImage,
  BackgroundImageSrc,
  Page,
  PageSection,
  PageSectionVariants
} from '@patternfly/react-core';

import NavHeader from './nav/NavHeader.jsx';
import RemoteList from './content/RemoteList.jsx';
// import NavFooter from './nav/NavFooter.jsx';
// import Container from './content/Container.jsx';
import '@patternfly/react-core/dist/styles/base.css';
// import './styles/indy.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

const header = <NavHeader />;

const bgImages = {
  [BackgroundImageSrc.lg]: '/assets/images/pfbg_1200.jpg',
  [BackgroundImageSrc.md]: '/assets/images/pfbg_992.jpg',
  [BackgroundImageSrc.md2x]: '/assets/images/pfbg_992@2x.jpg',
  [BackgroundImageSrc.sm]: '/assets/images/pfbg_768.jpg',
  [BackgroundImageSrc.sm2x]: '/assets/images/pfbg_768@2x.jpg',
  [BackgroundImageSrc.xl]: '/assets/images/pfbg_2000.jpg',
  [BackgroundImageSrc.xs]: '/assets/images/pfbg_576.jpg',
  [BackgroundImageSrc.xs2x]: '/assets/images/pfbg_576@2x.jpg',
  [BackgroundImageSrc.filter]: '/assets/images/background-filter.svg#image_overlay'
};

const Root = ()=>(
  <React.Fragment>
    <BackgroundImage src={bgImages} />
    <Page header={header}>
      <RemoteList />
    </Page>
  </React.Fragment>
);

export default Root;
