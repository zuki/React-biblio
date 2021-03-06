import React from 'react';
import { connectToStores } from 'fluxible/addons';
import { Grid, Row, Col } from 'react-bootstrap';
import Breadcrumbs from './Breadcrumbs';
import FlashMessage from './FlashMessage';
import SearchFacets from './SearchFacets';
import SearchList from './SearchList';
import SearchStore from '../stores/SearchStore';
import SolrResult from '../models/solr-result';
import getItems from '../actions/getItems';

class Search extends React.Component {
  constructor(props, context) {
    super(props, context);

    if (this.props.query.q) {
      const params = {
        q: this.props.query.q,
        page: 1
      };
      this.context.executeAction(getItems, params);
    }
  }

  render() {
    // console.log('Search#render');
    const {result, error} = this.props.searchState;
    const {msgs} = this.props;

    let list = [
      {
        to: 'home',
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

    const searchResult = (result && !error)
      ? (
          <Row>
            <Col md={3}>
              <SearchFacets result={result} msgs={msgs} />
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
        <FlashMessage error={error} msgs={msgs} />
        {searchResult}
      </Grid>
    );
  }
}

Search.propTypes = {
  searchState: React.PropTypes.object,
  result: React.PropTypes.instanceOf(SolrResult),
  error: React.PropTypes.object,
  msgs: React.PropTypes.object.isRequired,
  query: React.PropTypes.object
};

Search.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

Search = connectToStores(Search, [SearchStore], (stores) => {
  return {
    searchState: stores.SearchStore.getState()
  };
});

export default Search;
