import { BaseStore } from 'fluxible/addons';
import SolrDocument from '../models/solr-document';
import SolrQuery from '../models/solr-query';
import SolrResult from '../models/solr-result';
import SolrSearch from '../models/solr-search';


class SearchStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.result = null;
        this.doc = null;
        this.error = '';
    }

    getState() {
      return {
        result: this.result,
        doc: this.doc,
        error: this.error
      };
    }

    _getItems(params) {
      const squery = new SolrQuery(params);
      this.squery = squery;
      const solr_search = new SolrSearch(squery);
      solr_search.getItems().then((json) => {
        this.result = new SolrResult(json, squery);
        this.error = '';
      }).catch((error) => {
        this.result = null;
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
        this.doc = new SolrDocument(json, squery);
        this.error = '';
      }).catch((error) => {
        this.doc = null;
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
