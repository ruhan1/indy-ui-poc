'use strict'

import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  BackgroundImage,
  BackgroundImageSrc,
  Brand,
  Button,
  ButtonVariant,
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
import {APP_ROOT} from '../ComponentConstants.js'
import brandImg from '../images/indy.png';

//mock user login
const isUserloggedIn = true;
const username = "mock";

class NavHeader extends React.Component {
  static contextTypes = {
    router: ()=>null
  };
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

  handleDropDownItemClick = e => {
    e.preventDefault();
    let path = e.target.dataset.to;
    this.context.router.history.push(path);
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
              <DropdownItem data-to={`${APP_ROOT}/nfc`} onClick={this.handleDropDownItemClick}>
                Not-Found Cache
              </DropdownItem>
              <DropdownItem data-to={`cache/delete`} onClick={this.handleDropDownItemClick}>
                Delete Cache
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem data-to={`autoprox/calc`} onClick={this.handleDropDownItemClick}>
                AutoProx Calculator
              </DropdownItem>
              <DropdownItem data-to={`autoprox/rules`} onClick={this.handleDropDownItemClick}>
                AutoProx Rules
              </DropdownItem>
              <DropdownItem data-to={`revisions/changelog/stores`} onClick={this.handleDropDownItemClick}>
                Store Changelogs
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
       logoProps={{href:`${APP_ROOT}`}}
       toolbar={PageToolbar}
       topNav={PageNav} />
   );
  }
};

export default NavHeader;
