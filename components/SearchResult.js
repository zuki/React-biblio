import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SearchFacets from './SearchFacets';
import SearchList from './SearchList';
import SolrResult from '../models/solr-result';

class SearchResult extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    console.log('SerchResult#render');
    const result = this.props.result;
    if (!result) {
      console.log('SearchResult: RESULT NOT SET');
      return null;
    }

    return (
      <Row>
        <Col md={3}>
          <SearchFacets result={result} />
        </Col>
        <Col md={9}>
          <SearchList result={result} />
        </Col>
      </Row>
    );
  }
}

SearchResult.propTypes = {
  result: React.PropTypes.instanceOf(SolrResult)
};

SearchResult.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

export default SearchResult;
