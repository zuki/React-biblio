'use strict';
import _ from 'lodash';

const FACETS_TITLES = [
  {'field': 'author_s', 'value': 'facet_author'},
  {'field': 'callnumber-first_s', 'value': 'facet_subject'},
  {'field': 'pubyear_is', 'value': 'facet_pubyear'}
];

export default class SolrResult {
  constructor(json, squery) {
    this.json = json;
    this.squery = squery;
    this.numFound = +json.response.numFound;
    this.docs = this.setHighlightedDocs(json.response.docs, json.highlighting);
    this.facets = this.setFacets(json.facet_counts.facet_fields, squery);
    this.pagination = this.setPagination(squery);
  }

  getFacetsTitles() {
    return FACETS_TITLES;
  }

  getSolrQuery() {
    return this.squery;
  }

  getNumFound() {
    return this.numFound;
  }

  setHighlightedDocs(docs, hl) {
    if (!hl) {
      return docs;
    }

    return _.map(docs, (doc) => {
      if (hl[doc.id]) {
        _.forEach(['title_t', 'author_t'], (prop) => {
          if (hl[doc.id][prop]) {
            doc[prop] = hl[doc.id][prop];
          }
        });
      }
      return doc;
    });
  }

  getDocs() {
    return this.docs;
  }

  setFacets(data, squery) {
    var facets = {};
    var facet, items;
    _.forEach(data, (val, key) => {
      items = [];
      if (squery.hasFieldQuery(key)) {
        facet = {
          'title': val[0],
          'count': 1,
          'specified': true,
          'url': squery.getQueryStringOmit(['page', 'sq'], key)
        };
        items.push(facet);
      } else {
        for(var i = 0; i < val.length; i += 2) {
          const fqvalue = typeof val[i] === 'number' ? `${key}:${val[i]}` : `${key}:"${val[i]}"`;
          facet = {
            'title': val[i],
            'count': val[i + 1],
            'specified': false,
            'url': squery.getQueryStringOmitField(['page', 'sq']) + '&fq=' + fqvalue
          };
          items.push(facet);
        }
      }
      facets[key] = items;
    });
    return facets;
  }

  getFacets() {
    return this.facets;
  }

  setPagination(squery) {
    const pagination = [];
    let i, start, end, diff;
    const url = squery.getQueryStringOmitField(['page', 'per_page', 'sq']);
    const page = +squery.getQuery().page || 1;
    const page_count = this.getPageCount();
    if (page_count <= 5) {
      start = 1;
      end = page_count + 1;
    } else {
      diff = page_count - page;
      start = (diff >= 4 ? page : page - (4 - diff));
      end = start + 5;
    }
    for (i = start; i < end; i++) {
      var active = (i === page ? true : false);
      var purl = `/?${url}&page=${i}`;
      pagination.push({url: purl, page: i, active: active});
    }
    const ret = {};
    ret.pagies = pagination;
    ret.prev = `/?${url}&page=${page - 1}`;
    ret.next = `/?${url}&page=${page + 1}`;
    return ret;
  }

  getPagination() {
    return this.pagination;
  }

  getPageCount() {
    const per_page = this.squery.getQuery().per_page;
    return this.numFound % per_page === 0 ?
      this.numFound / per_page : Math.ceil(this.numFound / per_page);
  }
}
