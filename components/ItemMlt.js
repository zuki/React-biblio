import React from 'react';
import _ from 'lodash';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import getItem from '../actions/getItem';
import SolrDocument from '../models/solr-document';

class ItemMlt extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleClick(item, e) {
    e.preventDefault();
    const params = {
      id: item.id,
      query: item.sq
    }
    this.context.executeAction(getItem, params);
  }

  render() {
    //console.log('ItemMlt#render');
    const mlt = this.props.doc.getMoreLikeThis();
    const lines = _.map(mlt, (item, i) => {
      return (
        <ListGroupItem className='text-left' key={i}>
          <a href='#' onClick={this.handleClick.bind(this, item)}>{item.text}</a>
        </ListGroupItem>
      );
    })

    return (
      <Panel collapsible defaultExpanded header={this.props.msgs.mlt_title} bsStyle='success' className='text-center'>
        <ListGroup fill>
          {lines}
        </ListGroup>
      </Panel>
    );
  }
}

ItemMlt.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

ItemMlt.propTypes = {
  doc: React.PropTypes.instanceOf(SolrDocument)
};

export default ItemMlt;
