import React from 'react';
import NavHeader from './nav/NavHeader.jsx';
import NavFooter from './nav/NavFooter.jsx';
import Container from './content/Container.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/indy.css';

const Root = () => <React.Fragment>
    <NavHeader />
    <Container />
    <NavFooter />
  </React.Fragment>;
export default Root;
