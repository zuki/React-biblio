import React from 'react';
import { Row, Col } from 'react-bootstrap';

class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <Col md={12}>
          Item
        </Col>
      </Row>
    );
  }
}

export default Item;
