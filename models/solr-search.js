'use strict';
import request from 'superagent';
import _ from 'lodash';
import SolrQuery from './solr-query';
import Qs from 'qs';

const SOLR_URL = 'http://localhost:8983/solr/biblio/select';

export default class SolrSearch {
  constructor(squery) {
    this.squery = squery;
  }

  getItems() {
    this.squery.setHl({
      hl: true,
      'hl.fl': 'title_t,author_t'
    });
    /*
    // [FIXME] superagentがArray指定による複数フィールドの設定をしてくれない
    //   https://github.com/visionmedia/superagent/issues/670
    // qs を利用することで回避
   */
    this.squery.setFacet({
      facet: true,
      'facet.field': ['author_s', 'callnumber-first_s', 'pubyear_is'],
      'facet.mincount': 1,
      'facet.limit': 5
    });

    return new Promise((resolve, reject) => {
      request(SOLR_URL)
        .set('Accept', 'application/json')
        .set('X-Requested-With', 'XMLHttpRequest')
        .query(Qs.stringify(this.squery.getSearchQuery(), {arrayFormat: 'repeat'}))
        .end((err, data) => {
          if (err) {
            console.error(err);
            reject(err);
          } else if (!data.ok) {
            reject(new Error('error_no_good'));
          } else {
            const json = JSON.parse(data.text);
            if (+json.response.numFound === 0) {
              reject(new Error('error_no_hit'));
            } else {
              resolve(json);
            }
          }
        });
    });
  }

  getItem() {
    return new Promise((resolve, reject) => {
      this.squery.setMlt({
        mlt: true,
        'mlt.fl': ['dewey-full_ss', 'author_t'],
        'mlt.mintf': 1,
        'mlt.mindf': 1,
        'mlt.count' :10
      });
      request('http://localhost:8983/solr/biblio/select')
        .set('Accept', 'application/json')
        .set('X-Requested-With', 'XMLHttpRequest')
        .query(this.squery.getItemQuery())
        .end((err, data) => {
          if (err) {
            reject(err);
          } else if (!data.ok) {
            reject(new Error('error_no_good'));
          } else {
            const json = JSON.parse(data.text);
            if (+json.response.numFound === 0) {
              reject(new Error('error_no_hit'));
            } else {
              resolve(json);
            }
          }
        });
    });
  }
}
