import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import { Grid, Row, Col } from 'react-bootstrap';
import SolrDocument from '../models/solr-document';
import SolrResult from '../models/solr-result';

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const list = [
      {
        title: this.props.msgs.home,
        active: true
      }
    ];

    return (
      <Grid>
        <Breadcrumbs list={list} />
        <h1>{this.props.msgs.home_h1}</h1>
        <Row>
          <Col md={10} mdOffset={1}>
            {this.props.msgs.home_text}
          </Col>
        </Row>
      </Grid>
    );
  }
}

Home.propTypes = {
  doc: React.PropTypes.instanceOf(SolrDocument),
  result: React.PropTypes.instanceOf(SolrResult),
  error: React.PropTypes.string,
  msgs: React.PropTypes.object
};

export default Home;
