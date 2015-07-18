import React from 'react';
import _ from 'lodash';
import {connectToStores, provideContext} from 'fluxible/addons';
import { Grid, Row, Col, Alert } from 'react-bootstrap';
import Breadcrumbs from './Breadcrumbs';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';
import SearchStore from '../stores/SearchStore';
import SolrDocument from '../models/solr-document';
import SolrResult from '../models/solr-result';
import SolrQuery from '../models/solr-query';
import getItems from '../actions/getItems';

class Search extends React.Component {
  constructor(props, context) {
    super(props, context);

    if (this.props.query.q) {
      const params = {
        q: this.props.query.q,
        page: 1
      }
      this.context.executeAction(getItems, params);
    }
  }

  render() {
    console.log('Search#render');
    const result = this.props.searchState.result;
    const errMsg = this.props.searchState.error ?
      (<Row><Col md={12}><Alert bsStyle='warning'>{this.props.searchState.error}</Alert></Col></Row>) : '';

    let list = [
      {
        url: '/',
        title: 'ホーム',
        active: true
      }
    ];
    if (result) {
      list[0].active = false;
      list.push({
        title: `検索: ${result.getSolrQuery().getQuery().q}`,
        active: true
      });
    }
    return (
      <Grid>
        <Breadcrumbs list={list} />
        {errMsg}
        <Row className='text-center'>
          <SearchInput />
        </Row>
        <Row>
          <SearchResult result={result} />
        </Row>
      </Grid>
    );
  }
}

Search.propTypes = {
  doc: React.PropTypes.instanceOf(SolrDocument),
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
