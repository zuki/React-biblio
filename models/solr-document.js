'use strict';
import _ from 'lodash';

export default class SolrDocument {
  constructor(json, squery) {
    this.squery = squery;
    this.doc = this.setDocument(json.response.docs[0]);
    this.mlt = this.setMoreLikeThis(json.moreLikeThis[this.doc.id]);
  }

  setDocument(doc) {
    const SORTED_FIELDS = [
      'score',
      'id',
      'title_t',
      'author_t',
      'publisher_txt',
      'publishDate_ss',
      'physical_txt',
      'series_txt',
      'isbn_ss',
      'callnumber_s',
      'dewey-full_ss'
    ];

    return _.reduce(SORTED_FIELDS, (result, field) => {
      if (doc[field]) {
        result[field] = _.isArray(doc[field]) ?
          doc[field].join(', ') : doc[field];
      }
      return result;
    }, {});
  }

  getDocument() {
    return this.doc;
  }

  setMoreLikeThis(mlt) {
    if (mlt) {
      return _.map(mlt.docs, (item) => {
        return {
          id: item.id,
          sq: this.squery.getQuery().sq,
          url: '/item/' + item.id + '?' + this.squery.getItemQueryString(),
          text: item.title_t + (item.author_t ? ' / ' + item.author_t : '')
        };
      });
    } else {
      return [];
    }
  }

  getMoreLikeThis() {
    return this.mlt;
  }

  getSolrQuery() {
    return this.squery;
  }

}
