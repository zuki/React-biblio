'use strict';
import _ from 'lodash';
import objectAssign from 'object-assign';

export default class SolrQuery {
  constructor(query) {
    this.solr_default = {
      fl: '*,score',
      df: 'text',
      wt: 'json'
    };
    this.query = objectAssign({
      q: '',
      fq: '',
      sq: '',
      page: 1,
      per_page: 10
    }, query);
    this.hl = {};
    this.facet = {};
    this.mlt = {};
  }

  getSearchQuery() {
    var page = +this.query.page || 1;
    var rows = +this.query.per_page || 10;
    var start = (page - 1) * rows;

    const queries = {
      q: this.query.q,
      fq: this.query.fq || '',
      start: start,
      rows: rows
    };
    // [FIXME] superagentがArray指定による複数フィールドの設定をしてくれない
    //return objectAssign({}, queries, this.solr_default, this.hl, this.facet, this.mlt);
    return objectAssign({}, queries, this.solr_default, this.hl, this.mlt);
  }

  getItemQuery(){
    return objectAssign({}, {q: this.query.q}, this.solr_default, this.mlt);
  }

  setQuery(query) {
    this.query = objectAssign(this.query, query);
  }

  setHl(hl) {
    this.hl = hl;
  }

  setFacet(facet) {
    this.facet = facet;
  }

  setMlt(mlt) {
    this.mlt = mlt;
  }

  getQueryString() {
    return this.getQueryStringOmit();
  }

  getQueryStringOmitField(omit) {
    const qs = this.getQueryStringOmit(omit);
    return qs;
    //return this.getQueryStringOmit(omit);
  }

  getQueryStringOmit(omit_fields = null, omit_value = null) {
    return _.compact(
      _.flattenDeep(
        _.map(this.query, (v, k) => {
          if (omit_fields && _.includes(omit_fields, k)) {
            return null;
          } else {
            return _.map([].concat(v), (v2) => {
              if (!v2 || (omit_value && _.startsWith(v2, omit_value))) {
                return null;
              } else {
                return `${k}=${v2}`;
              }
            });
          }
        })
      )
    ).join('&');
  }

  getItemQueryString() {
    return this.getQueryStringOmitField(['q', 'fq', 'sq']) + `&q=${this.query.sq}`;
  }

  hasFieldQuery(field) {
    let ret = false;
    if (this.query.fq) {
      const selected = _.filter([].concat(this.query.fq), (fq) => {
        return _.startsWith(fq, field);
      });
      if (selected && selected.length === 1) {
        ret = true;
      }
    }
    return ret;
  }

  getQuery() {
    return this.query;
  }

  getFacet() {
    return this.facet;
  }

  getMlt() {
    return this.mlt;
  }
}
