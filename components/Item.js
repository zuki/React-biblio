import React from 'react';
import { connectToStores } from 'fluxible/addons';
import { Grid, Row, Col } from 'react-bootstrap';
import Breadcrumbs from './Breadcrumbs';
import FlashMessage from './FlashMessage';
import ItemBiblio from './ItemBiblio';
import ItemMlt from './ItemMlt';
import SolrDocument from '../models/solr-document';
import SearchStore from '../stores/SearchStore';
import getItem from '../actions/getItem';

class Item extends React.Component {
  constructor(props, context) {
    super(props, context);

    if (this.props.params.id && this.props.query.q) {
      const params = {
        id: this.props.params.id,
        query: this.props.query.q
      };
      this.context.executeAction(getItem, params);
    }
  }

  render() {
    // console.log('Item#render');
    const {doc, error} = this.props.itemState;
    const {msgs} = this.props;

    let list = [{
      to: 'home',
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
        title: doc.getDocument().title_t,
        active: true
      });
    }

    const itemResult = (doc && !error)
      ? (
          <div>
            <Row>
              <Col md={12}>
                <h2 className="text-center">{doc.getDocument().title_t}</h2>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <ItemMlt doc={doc} msgs={msgs} />
              </Col>
              <Col md={9}>
                <ItemBiblio doc={doc} msgs={msgs} />
              </Col>
            </Row>
          </div>
        )
      : '';

    return (
      <Grid>
        <Breadcrumbs list={list} />
        <FlashMessage error={error} msgs={msgs} />
        {itemResult}
      </Grid>
    );
  }
}

Item.propTypes = {
  itemState: React.PropTypes.object.isRequired,
  doc: React.PropTypes.instanceOf(SolrDocument),
  error: React.PropTypes.object,
  msgs: React.PropTypes.object.isRequired,
  params: React.PropTypes.object,
  query: React.PropTypes.object
};

Item.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

Item = connectToStores(Item, [SearchStore], (stores) => {
  return {
    itemState: stores.SearchStore.getState()
  };
});

export default Item;
