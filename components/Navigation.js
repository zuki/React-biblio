import React from 'react';
import { Navbar } from 'react-bootstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar brand='書誌検索' inverse>
      </Navbar>
    )
  }
}

export default Navigation;
