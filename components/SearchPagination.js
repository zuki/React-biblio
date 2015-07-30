import React from 'react';
import { Pagination } from 'react-bootstrap';
import SolrResult from '../models/solr-result';
import getItems from '../actions/getItems';

class SearchPagination extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    // console.log('Pagination#render');
    const {result} = this.props;
    const current_page = result.getSolrQuery().getQuery().page;
    const page_count = result.getPageCount();
    const pages = page_count < 5 ? page_count : 5;
    return (
      <Pagination
        prev={true}
        next={true}
        first={true}
        last={true}
        ellipsis={true}
        items={page_count}
        maxButtons={pages}
        activePage={current_page}
        onSelect={this.handleSelect.bind(this)} />
    );
  }

  handleSelect(e, selectedEvent) {
    e.preventDefault();
    this.context.executeAction(getItems, {
      q: this.props.result.squery.getQuery().q,
      page: selectedEvent.eventKey
    });
  }

}

SearchPagination.propTypes = {
  result: React.PropTypes.instanceOf(SolrResult).isRequired
};

SearchPagination.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

export default SearchPagination;
