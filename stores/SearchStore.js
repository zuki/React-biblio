import { BaseStore } from 'fluxible/addons';
import SolrDocument from '../models/solr-document';
import SolrQuery from '../models/solr-query';
import SolrResult from '../models/solr-result';
import SolrSearch from '../models/solr-search';


class SearchStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.squery = new SolrQuery({});
        this.result = null;
        this.error = '';
    }

    getState() {
      return {
        squery: this.squery,
        result: this.result,
        error: this.error
      };
    }

    _getItems(params) {
      //const squery = new SolrQuery({q: params.query, page: params.page});
      const squery = new SolrQuery(params);
      this.squery = squery;
      const solr_search = new SolrSearch(squery);
      solr_search.getItems().then((json) => {
        console.log('getItems');
        console.log(json);
        this.result = new SolrResult(json, squery);
      }).catch((error) => {
        this.error = error;
      }).then(() => {
        this.emitChange();
      });
    }

    _getItem(params) {
      const squery = new SolrQuery({q: `id:${params.id}`, sq: params.query});
      this.squery = squery;
      const solr_search = new SolrSearch(squery);
      solr_search.getItem().then((json) => {
        this.result = new SolrDocument(json, squery);
      }).catch((error) => {
        this.error = error;
      }).then(() => {
        this.emitChange();
      });
    }
}

SearchStore.storeName = 'SearchStore';
SearchStore.handlers = {
    'GET_ITEMS'    : '_getItems',
    'GET_ITEM'     : '_getItem'
};

export default SearchStore;
