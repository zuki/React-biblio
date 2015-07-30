import React from 'react';
import _ from 'lodash';
import { Panel, ListGroup, ListGroupItem, Badge, Glyphicon }
  from 'react-bootstrap';
import getItems from '../actions/getItems';

class SearchFacet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('SearchFacet#render');
    const {key, title, facet, msgs} = this.props;
    const items = [];
    _.forEach(facet, (item, idx) => {
      if (item.specified) {
        items.push(
          <ListGroupItem key={`${key}_${idx}`}>
            <Glyphicon glyph="remove" />
            <a href="#" onClick={this.handleClick.bind(this, item.url)}>
              {item.title}
            </a>
          </ListGroupItem>
        );
      } else {
        items.push(
          <ListGroupItem key={`${key}_${idx}`}>
            <a href="#" onClick={this.handleClick.bind(this, item.url)}>
              {item.title}
            </a>
            <Badge>{item.count}</Badge>
          </ListGroupItem>
        );
      }
    });

    return (
      <Panel collapsible defaultExpanded bsStyle="primary" header={msgs[title]}>
        <ListGroup key={key} fill>
          {items}
        </ListGroup>
      </Panel>
    );
  }

  handleClick(url, e) {
    e.preventDefault();
    const params = _.reduce(url.split('&'), (result, query) => {
      const kv = query.split('=');
      if (result[kv[0]]) {
        if (_.isArray(result[kv[0]])) {
          result[kv[0]].push(kv[1]);
        } else {
          const val = result[kv[0]];
          result[kv[0]] = [val, kv[1]];
        }
      } else {
        result[kv[0]] = kv[1];
      }
      return result;
    }, {});
    this.context.executeAction(getItems, params);
  }

}

SearchFacet.propTypes = {
  key: React.PropTypes.string.isRequired,
  facet: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  msgs: React.PropTypes.object.isRequired
};

SearchFacet.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

export default SearchFacet;
