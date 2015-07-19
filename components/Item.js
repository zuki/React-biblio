import React from 'react';
import {connectToStores, provideContext} from 'fluxible/addons';
import { Grid, Row, Col, Alert } from 'react-bootstrap';
import Breadcrumbs from './Breadcrumbs';
import ItemBiblio from './ItemBiblio';
import ItemMlt from './ItemMlt';
import SolrDocument from '../models/solr-document';
import SolrQuery from '../models/solr-query';
import SearchStore from '../stores/SearchStore';
import getItem from '../actions/getItem';

class Item extends React.Component {
  constructor(props, context) {
    super(props, context);

    if (this.props.params.id && this.props.query.q) {
      const params = {
        id: this.props.params.id,
        query: this.props.query.q
      }
      this.context.executeAction(getItem, params);
    }
  }

  render() {
    //console.log('Item#render');
    const doc = this.props.itemState.doc;
    if (!doc) {
      return null;
    }
    const error = this.props.itemState.error;
    const emessage =
      error ? (typeof error === 'object' ? error.message : error)
            : '';
    const errorRow = emessage ?
      (<Row><Col md={12}><Alert bsStyle='warning'>{emessage}</Alert></Col></Row>) : '';

    let list = [
      {
        url: '/',
        title: 'ホーム',
        active: false
      },
      {
        url: `/?q=${doc.getSolrQuery().getQuery().sq}`,
        title: `検索: ${doc.getSolrQuery().getQuery().sq}`,
        active: false
      },
      {
        title: doc.getDocument()['title_t'],
        active: true
      }
    ];

    return (
      <Grid>
        <Breadcrumbs list={list} />
        {errorRow}
        <Row>
          <Col md={12}>
            <h2 className='text-center'>{doc.getDocument()['title_t']}</h2>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <ItemMlt doc={doc} />
          </Col>
          <Col md={9}>
            <ItemBiblio doc={doc} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

Item.propTypes = {
  doc: React.PropTypes.instanceOf(SolrDocument),
  result: React.PropTypes.instanceOf(SolrDocument),
  error: React.PropTypes.string
};

Item.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

Item = connectToStores(Item, [SearchStore], function (stores, props) {
  return {
    itemState: stores.SearchStore.getState()
  };
});

export default Item;
