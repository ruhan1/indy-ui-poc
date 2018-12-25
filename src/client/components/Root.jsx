import React from 'react';
import {
  BackgroundImage,
  BackgroundImageSrc,
  Page
} from '@patternfly/react-core';

import NavHeader from './nav/NavHeader.jsx';
import Container from './content/Container.jsx';
import './styles/new-indy.css';
import '@patternfly/react-core/dist/styles/base.css';

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

const Root = ()=> <React.Fragment>
    <BackgroundImage src={bgImages} />
    <Page header={header}>
      <Container />
    </Page>
  </React.Fragment>;
export default Root;
