import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';

class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {msgs, error} = this.props;

    if (!error) return null;

    const errMsg = msgs[error.message] ? msgs[error.message] : msgs.error_other;
    return (
      <Row>
        <Col md={12}>
          <Alert bsStyle="warning">{errMsg}</Alert>
        </Col>
      </Row>
    );
  }
}

FlashMessage.propTypes = {
  error: React.PropTypes.object,
  msgs: React.PropTypes.object.isRequired
};

export default FlashMessage;
