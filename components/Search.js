import React from 'react';
import _ from 'lodash';
import {connectToStores, provideContext} from 'fluxible/addons';
import { Grid, Row, Col, Alert } from 'react-bootstrap';
import Breadcrumbs from './Breadcrumbs';
import SearchFacets from './SearchFacets';
import SearchList from './SearchList';
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
    //console.log('Search#render');
    const result = this.props.searchState.result;
    const error = this.props.searchState.error;
    const msgs = this.props.msgs;

    let errMsg = '';
    if (error) {
      errMsg = (typeof error === 'object') ? error.message : error;
      errMsg = msgs[errMsg] ? msgs[errMsg] : msgs['error_other'];
    }
    const errMessage = errMsg ?
      (<Row><Col md={12}><Alert bsStyle='warning'>{errMsg}</Alert></Col></Row>) : '';

    let list = [
      {
        to: 'home',
        q: '',
        title: this.props.msgs.home,
        active: true
      }
    ];
    if (result) {
      list[0].active = false;
      list.push({
        title: `${msgs.search}: ${result.getSolrQuery().getQuery().q}`,
        active: true
      });
    }

    const searchResult = (result && !errMessage)
      ? (
          <Row>
            <Col md={3}>
              <SearchFacets result={result}  msgs={msgs} />
            </Col>
            <Col md={9}>
              <SearchList result={result} msgs={msgs} />
            </Col>
          </Row>
        )
      : '';

    return (
      <Grid>
        <Breadcrumbs list={list} />
        {errMessage}
        {searchResult}
      </Grid>
    );
  }
}

Search.propTypes = {
  doc: React.PropTypes.instanceOf(SolrDocument),
  result: React.PropTypes.instanceOf(SolrResult),
  error: React.PropTypes.string,
  msgs: React.PropTypes.object
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
