import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Brand,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownSeparator,
  Nav,
  NavItem,
  NavList,
  NavVariants,
  PageHeader,
  Toolbar,
  ToolbarGroup,
  ToolbarItem
} from '@patternfly/react-core';
import {global_breakpoint_md as breakpointMd} from '@patternfly/react-tokens';
// import accessibleStyles from '@patternfly/patternfly-next/utilities/Accessibility/accessibility.css';
// import spacingStyles from '@patternfly/patternfly-next/utilities/Spacing/spacing.css';
// import {css} from '@patternfly/react-styles';
import {APP_ROOT} from '../ComponentConstants.js';
import brandImg from '../images/indy.png';

// mock user login
// const isUserloggedIn = true;
// const username = "mock";

const navItems = {
  remote: {
    path: `${APP_ROOT}/remote`,
    activeItem: 'i-1',
    showText: 'Remote Repositories'
  },
  hosted: {
    path: `${APP_ROOT}/hosted`,
    activeItem: 'i-2',
    showText: 'Hosted Repositories'
  },
  group: {
    path: `${APP_ROOT}/group`,
    activeItem: 'i-3',
    showText: 'Group'
  }
};

export default class NavHeader extends React.Component {
  static contextTypes = {
    router: ()=>null
  };

  constructor(props) {
    super(props);
    // Set initial isNavOpen state based on window width
    const isNavOpen = typeof window !== 'undefined' && window.innerWidth >= parseInt(breakpointMd.value, 10);
    this.state = {
      isToolsDropdownOpen: false,
      isUserDropdownOpen: false,
      activeItem: '',
      isNavOpen
    };
  }

  componentDidMount(){
    let pathname = this.context.router.route.location.pathname;
    let found = false;
    for(let key in navItems){
      if(navItems[key]){
        let item = navItems[key];
        if(pathname===item.path){
          this.setState({activeItem: item.activeItem});
          found = true;
          break;
        }
      }
    }
    if(!found){
      this.setState({activeItem: ''});
    }
  }

  onToolsDropdownToggle = isToolsDropdownOpen => {
    this.setState({
      isToolsDropdownOpen
    });
  };

  onToolsDropdownSelect = () => {
    this.setState({
      isToolsDropdownOpen: !this.state.isToolsDropdownOpen
    });
  };

  onUserDropdownToggle = isUserDropdownOpen => {
    this.setState({
      isUserDropdownOpen
    });
  };

  onUserDropdownSelect = () => {
    this.setState({
      isUserDropdownOpen: !this.state.isUserDropdownOpen
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

  /* eslint-disable max-lines-per-function */
  render(){
    const {isToolsDropdownOpen, isUserDropdownOpen, activeItem} = this.state;
    const PageNav =
     <Nav onSelect={this.onNavSelect} aria-label="Nav">
       <NavList variant={NavVariants.horizontal}>
         {
           Object.entries(navItems).map(entry=>{
             let item=entry[1];
             return (
               <NavItem key={item.activeItem} itemId={item.activeItem} isActive={activeItem === item.activeItem}>
                 <Link to={item.path}>{item.showText}</Link>
               </NavItem>);
           })
         }
       </NavList>
     </Nav>;
    const PageToolBar =
      <Toolbar>
        <ToolbarGroup>
          <ToolbarItem>
            <Dropdown
              isPlain
              position="right"
              onSelect={this.onToolsDropdownSelect}
              isOpen={isToolsDropdownOpen}
              toggle={<DropdownToggle onToggle={this.onToolsDropdownToggle}>Tools</DropdownToggle>}>
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
              <DropdownSeparator />
              <DropdownItem href="rest-api.html" >
                REST API
              </DropdownItem>
            </Dropdown>
          </ToolbarItem>
          <ToolbarItem>
            <Dropdown
              isPlain
              position="right"
              onSelect={this.onUserDropdownSelect}
              isOpen={isUserDropdownOpen}
              toggle={<DropdownToggle onToggle={this.onUserDropdownToggle}>User</DropdownToggle>}>
              <DropdownItem href="/logout">
                Log out
              </DropdownItem>
            </Dropdown>
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>;
    return(
      <PageHeader
       logo={<Brand src={brandImg} alt="Indy Logo" />}
       logoProps={{href: `${APP_ROOT}`}}
       toolbar={PageToolBar}
       topNav={PageNav} />
    );
  }
  /* eslint-enable max-lines-per-function */
}

NavHeader.propTypes={
  isToolsDropdownOpen: PropTypes.bool,
  isUserDropdownOpen: PropTypes.bool,
  activeItem: PropTypes.string,
  isNavOpen: PropTypes.bool
};
