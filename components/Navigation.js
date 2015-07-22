import React from 'react';
import { Navbar, Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap';
import SearchInput from './SearchInput';
import languageAction from '../actions/language';


class Navigation extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleClick(selectedKey) {
    let lang = '';
    if (selectedKey === 2.1) {
      lang = 'ja';
    } else if (selectedKey === 2.2) {
      lang = 'en';
    }
    if (lang && lang !== this.props.lang) {
      this.context.executeAction(languageAction, lang);
    }
  }

  render() {
    const msgs = this.props.msgs;
    return (
      <Navbar brand={this.props.msgs.site_title} inverse fixedTop toggleNavKey={0}>
        <Nav right eventKey={0} onSelect={this.handleClick.bind(this)}>
          <SearchInput />
          <DropdownButton eventKey={2} title={msgs.lang}>
            <MenuItem eventKey={2.1}>
              {msgs.ja}
            </MenuItem>
            <MenuItem eventKey={2.2}>
              {msgs.en}
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
  props: React.PropTypes.object
};

export default Navigation;
