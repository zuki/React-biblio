import React from 'react';
import SearchFacet from './SearchFacet';
import SolrResult from '../models/solr-result';

class SearchFacets extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    // console.log('SearchFacets#render');
    const {result, msgs} = this.props;
    const facets = result.getFacets();
    const ftitles = result.getFacetsTitles();
    const lists = [];
    for (let ftitle of ftitles) {
      const title = ftitle.value;
      const key = ftitle.field;
      const facet = facets[key];
      lists.push(
        <SearchFacet key={key} title={title} facet={facet} msgs={msgs} />
      );
    }

    return (
      <div>
        {lists}
      </div>
    );
  }
}

SearchFacets.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

SearchFacets.propTypes = {
  result: React.PropTypes.instanceOf(SolrResult).isRequired,
  msgs: React.PropTypes.object.isRequired
};

export default SearchFacets;
