import React from 'react';
import {Table, Alert, Panel} from 'react-bootstrap';
import SearchPagination from './SearchPagination';
import SearchItem from './SearchItem';
import SolrResult from '../models/solr-result';

class SearchList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //console.log('SerchList#render');
    const {result, msgs} = this.props;
    const sq = result.getSolrQuery().getQueryStringOmitField(['fq']);
    const items = [];
    for (let item of result.getDocs()) {
      const key = item.id
      items.push(
        <SearchItem key={key} item={item} sq={sq} />
      );
    }

    const query = result.getSolrQuery().getSearchQuery();
    const count = result.getNumFound();
    const start = query.start + 1;
    const end   = count < (query.start + query.rows) ? count : (query.start + query.rows);
    const inputed = query.q + (query.fq ? ' AND ' + query.fq : '');
    const panelHeading = `${start} - ${end} / ${count} (${msgs.search_terms}: ${inputed})`;

    return (
      <div id="results">
        <Panel header={panelHeading} bsStyle='primary' className='text-center'>
          <Table responsive fill>
            <thead>
              <tr>
                <th>{msgs.list_head_tr}</th>
                <th>{msgs.list_head_publisher}</th>
                <th>{msgs.list_head_classification}</th>
                <th className='nowrap'>{msgs.list_head_callnumber}</th>
              </tr>
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
  result: React.PropTypes.instanceOf(SolrResult).isRequired,
  msgs: React.PropTypes.object.isRequired
};

export default SearchList;
