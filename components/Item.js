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
    const error = this.props.itemState.error;
    const msgs = this.props.msgs;

    let errMsg = '';
    if (error) {
      errMsg = (typeof error === 'object') ? error.message : error;
      errMsg = msgs[errMsg] ? msgs[errMsg] : msgs['error_other'];
    }
    const errMessage = errMsg ?
      (<Row><Col md={12}><Alert bsStyle='warning'>{errMsg}</Alert></Col></Row>) : '';

    let list = [{
      to: 'home',
      q: '',
      title: this.props.msgs.home,
      active: true
    }];
    if (doc) {
      list[0].active = false;
      list.push({
        to: 'search',
        q: `${doc.getSolrQuery().getQuery().sq}`,
        title: `${this.props.msgs.search}: ${doc.getSolrQuery().getQuery().sq}`,
        active: false
      });
      list.push({
        title: doc.getDocument()['title_t'],
        active: true
      });
    }

    const itemResult = (doc && !errMessage)
      ? (
          <div>
            <Row>
              <Col md={12}>
                <h2 className='text-center'>{doc.getDocument()['title_t']}</h2>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <ItemMlt doc={doc} msgs={this.props.msgs} />
              </Col>
              <Col md={9}>
                <ItemBiblio doc={doc} msgs={this.props.msgs} />
              </Col>
            </Row>
          </div>
        )
      : '';

    return (
      <Grid>
        <Breadcrumbs list={list} />
        {errMessage}
        {itemResult}
      </Grid>
    );
  }
}

Item.propTypes = {
  doc: React.PropTypes.instanceOf(SolrDocument),
  result: React.PropTypes.instanceOf(SolrDocument),
  error: React.PropTypes.string,
  msgs: React.PropTypes.object
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
