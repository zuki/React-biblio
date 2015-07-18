import React from 'react';
import {Table, Alert, Panel} from 'react-bootstrap';
import SearchPagination from './SearchPagination';
import SearchItem from './SearchItem';
import SolrResult from '../models/solr-result';

class SearchList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    console.log('SerchList#render');
    const result = this.props.result;
    const cq = result.getSolrQuery().getQueryStringOmitField(['fq']);
    const items = [];
    for (let item of result.getDocs()) {
      const key = item.id
      items.push(
        <SearchItem key={key} item={item} cq={cq} />
      );
    }

    /*
    const style = {
      display: items.length === 0 ? 'none' : 'block'
    };
    */
    const query = result.getSolrQuery().getSearchQuery();
    const count = result.getNumFound();
    const start = query.start + 1;
    const end   = count < (query.start + query.rows) ? count : (query.start + query.rows);
    const inputed = query.q + (query.fq ? ' AND ' + query.fq : '');
    const panelHeading = `${start} - ${end} / ${count} (検索語: ${inputed})`;

    return (
      <div id="results">
        <Panel header={panelHeading} bsStyle='primary' className='text-center'>
          <Table responsive fill>
            <thead>
              <tr><th>タイトル / 著者</th><th>出版事項</th><th>分類</th><th>配架場所</th></tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </Table>
        </Panel>
        <div  className='text-center'>
          <SearchPagination result={result} />
        </div>
      </div>
    );
  }
}

SearchList.propTypes = {
  result: React.PropTypes.instanceOf(SolrResult)
};

SearchList.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

export default SearchList;
