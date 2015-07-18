import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import SearchInput from './SearchInput';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar brand='書誌検索' inverse toggleNavKey={0}>
        <Nav right eventKey={0}>
          <NavItem enventKey={1}>
            <SearchInput />
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default Navigation;
