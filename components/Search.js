import React from 'react';
import _ from 'lodash';
import {connectToStores, provideContext} from 'fluxible/addons';
import { Grid, Row, Col, Alert } from 'react-bootstrap';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';
import SearchStore from '../stores/SearchStore';
import SolrResult from '../models/solr-result';
import SolrQuery from '../models/solr-query';

class Search extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    console.log('Search#render');
    const errMsg = this.props.searchState.error ?
      (<Row><Col md={12}><Alert bsStyle='warning'>{this.props.searchState.error}</Alert></Col></Row>) : '';

    return (
      <Grid>
        {errMsg}
        <Row className='text-center'>
          <SearchInput />
        </Row>
        <Row>
          <SearchResult result={this.props.searchState.result} />
        </Row>
      </Grid>
    );
  }
}

Search.propTypes = {
  squery: React.PropTypes.instanceOf(SolrQuery),
  result: React.PropTypes.instanceOf(SolrResult),
  error: React.PropTypes.string
};

Search.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

Search = connectToStores(Search, [SearchStore], function (stores, props) {
  return {
    searchState: stores.SearchStore.getState()
  };
});

export default Search;
