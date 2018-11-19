'use strict'

import React from 'react';
import {Link} from 'react-router-dom';
import {
  Avatar,
  BackgroundImage,
  BackgroundImageSrc,
  Brand,
  Button,
  ButtonVariant,
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownSeparator,
  Gallery,
  GalleryItem,
  KebabToggle,
  Nav,
  NavItem,
  NavList,
  NavVariants,
  PageHeader,
  Toolbar,
  ToolbarGroup,
  ToolbarItem
} from '@patternfly/react-core';
import { global_breakpoint_md as breakpointMd } from '@patternfly/react-tokens';
// import accessibleStyles from '@patternfly/patternfly-next/utilities/Accessibility/accessibility.css';
// import spacingStyles from '@patternfly/patternfly-next/utilities/Spacing/spacing.css';
import { css } from '@patternfly/react-styles';
import { BellIcon, CogIcon } from '@patternfly/react-icons';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {APP_ROOT} from '../ComponentConstants.js'
import brandImg from '../images/indy.png';

//mock user login
const isUserloggedIn = true;
const username = "mock";

class NavHeader extends React.Component {
  constructor(props) {
    super(props);
    // Set initial isNavOpen state based on window width
    const isNavOpen = typeof window !== 'undefined' && window.innerWidth >= parseInt(breakpointMd.value, 10);
    this.state = {
      isDropdownOpen: false,
      isKebabDropdownOpen: false,
      activeItem: 0,
      isNavOpen
    };
  }

  onDropdownToggle = isDropdownOpen => {
    this.setState({
      isDropdownOpen
    });
  };

  onDropdownSelect = event => {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    });
  };

  onKebabDropdownToggle = isKebabDropdownOpen => {
    this.setState({
      isKebabDropdownOpen
    });
  };

  onKebabDropdownSelect = event => {
    this.setState({
      isKebabDropdownOpen: !this.state.isKebabDropdownOpen
    });
  };

  onNavSelect = result => {
    this.setState({
      activeItem: result.itemId
    });
  };

  onNavToggle = () => {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  };

  render(){
    const { isDropdownOpen, isKebabDropdownOpen, activeItem, isNavOpen } = this.state;
    const PageNav = (
     <Nav aria-label="Nav">
       <NavList variant={NavVariants.horizontal}>
         <NavItem itemId={0} isActive={activeItem === 0}>
           <Link to={`${APP_ROOT}/remote`}>Remote Repositories</Link>
         </NavItem>
         <NavItem itemId={1} isActive={activeItem === 1}>
           <Link to={`${APP_ROOT}/hosted`}>Hosted Repositories</Link>
         </NavItem>
         <NavItem itemId={2} isActive={activeItem === 2}>
           <Link to={`${APP_ROOT}/group`}>Group</Link>
         </NavItem>
         <NavItem to="rest-api.html" itemId={3} isActive={activeItem === 3}>
           REST API
         </NavItem>
       </NavList>
     </Nav>
    );
    
    const PageToolbar = (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarItem>
            <Dropdown
              isPlain
              position="right"
              onSelect={this.onDropdownSelect}
              isOpen={isDropdownOpen}
              toggle={<DropdownToggle onToggle={this.onDropdownToggle}>Kyle Baker</DropdownToggle>}>
              <DropdownItem href="/api/diag/bundle">
                Diagnostic Bundle
              </DropdownItem>
              <DropdownItem href="/api/diag/repo">
                Repo Bundle
              </DropdownItem>
              <DropdownItem>
                <Link to={`${APP_ROOT}/nfc`}>Not-Found Cache</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to={`${APP_ROOT}/cache/delete`}>Delete Cache</Link>
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem>
                <Link to={`${APP_ROOT}/autoprox/calc`}>AutoProx Calculator</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to={`${APP_ROOT}/autoprox/rules`}>AutoProx Rules</Link>,
              </DropdownItem>
              <DropdownItem>
                <Link to={`${APP_ROOT}/revisions/changelog/stores`}>Store Changelogs</Link>
              </DropdownItem>
            </Dropdown>
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    );

    // const bgImages = {
    //   [BackgroundImageSrc.lg]: '/assets/images/pfbg_1200.jpg',
    //   [BackgroundImageSrc.md]: '/assets/images/pfbg_992.jpg',
    //   [BackgroundImageSrc.md2x]: '/assets/images/pfbg_992@2x.jpg',
    //   [BackgroundImageSrc.sm]: '/assets/images/pfbg_768.jpg',
    //   [BackgroundImageSrc.sm2x]: '/assets/images/pfbg_768@2x.jpg',
    //   [BackgroundImageSrc.xl]: '/assets/images/pfbg_2000.jpg',
    //   [BackgroundImageSrc.xs]: '/assets/images/pfbg_576.jpg',
    //   [BackgroundImageSrc.xs2x]: '/assets/images/pfbg_576@2x.jpg',
    //   [BackgroundImageSrc.filter]: '/assets/images/background-filter.svg#image_overlay'
    // };
    return(
      <PageHeader
       logo={<Brand src={brandImg} alt="Indy Logo" />}
       toolbar={PageToolbar}
       topNav={PageNav} />
   );
  }
};

export default NavHeader;
