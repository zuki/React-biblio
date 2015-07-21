import React from 'react';
import { Navbar, Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap';
import SearchInput from './SearchInput';
import languageAction from '../actions/language';


class Navigation extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleClick(selectedKey) {
    const lang = selectedKey === 2.2 ? 'en' : 'ja';
    this.context.executeAction(languageAction, lang);
  }

  render() {
    return (
      <Navbar brand={this.props.msgs.site_title} inverse toggleNavKey={0}>
        <Nav right eventKey={0} onSelect={this.handleClick.bind(this)}>
          <NavItem eventKey={1}>
            <SearchInput />
          </NavItem>
          <DropdownButton eventKey={2} title={this.props.msgs.lang}>
            <MenuItem eventKey={2.1}>
              {this.props.msgs.ja}
            </MenuItem>
            <MenuItem eventKey={2.2}>
              {this.props.msgs.en}
            </MenuItem>
          </DropdownButton>
        </Nav>
      </Navbar>
    )
  }
}

Navigation.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

Navigation.propTypes = {
  msgs: React.PropTypes.object
};

export default Navigation;
