import React from 'react';
import _ from 'lodash';
import { Panel, ListGroup, ListGroupItem, Badge, Glyphicon } from 'react-bootstrap';
//import { Link } from 'react-router';
import getItems from '../actions/getItems';

class SearchFacet extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(url, e) {
    e.preventDefault();

    const params = _.reduce(url.split('&'), (result, query) => {
      const kv = query.split('=');
      result[kv[0]] = kv[1];
      return result;
    }, {});
    this.context.executeAction(getItems, params);
  }

  render() {
    //console.log('SearchFacet#render');
    const items = [];
    this.props.facet.forEach((item, idx) =>{
      if (item.specified) {
        items.push(
          <ListGroupItem key={`${this.props.key}_${idx}`}>
            <Glyphicon glyph='remove' />
            <a href='#' onClick={this.handleClick.bind(this, item.url)}>{item.title}</a>
          </ListGroupItem>
        );
      } else {
        items.push(
          <ListGroupItem key={`${this.props.key}_${idx}`}>
            <a href='#' onClick={this.handleClick.bind(this, item.url)}>{item.title}</a>
            <Badge>{item.count}</Badge>
          </ListGroupItem>
        );
      }
    });

    return (
      <Panel collapsible defaultExpanded bsStyle='primary' header={this.props.title}>
        <ListGroup key={this.props.key} fill>
          {items}
        </ListGroup>
      </Panel>
    );
  }
}

SearchFacet.propTypes = {
  key: React.PropTypes.string,
  facet: React.PropTypes.array,
  title: React.PropTypes.string
};

SearchFacet.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

export default SearchFacet;
