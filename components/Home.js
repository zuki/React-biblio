import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import { Grid, Row, Col } from 'react-bootstrap';

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {msgs} = this.props;
    const list = [
      {
        title: msgs.home,
        active: true
      }
    ];

    return (
      <Grid>
        <Breadcrumbs list={list} />
        <h1>{msgs.home_h1}</h1>
        <Row>
          <Col md={10} mdOffset={1}>
            {msgs.home_text}
          </Col>
        </Row>
      </Grid>
    );
  }
}

Home.propTypes = {
  msgs: React.PropTypes.object.isRequired
};

export default Home;
