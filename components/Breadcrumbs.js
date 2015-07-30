import React from 'react';
import _ from 'lodash';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router';


class Breadcrumbs extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    // console.log('Breadcrumbs#render');
    const crumbs = _.map(this.props.list, (item, i) => {
      const active = item.active ? 'active' : '';
      let content;
      if (item.active) {
        content = item.title;
      } else if (item.q) {
        content = (<Link to={item.to} query={{q: item.q}}>{item.title}</Link>);
      } else {
        content = (<Link to={item.to}>{item.title}</Link>);
      }
      return (
        <li key={i} className={active}>
          {content}
        </li>
      );
    });

    return (
      <Row>
        <ol className="breadcrumb">
          {crumbs}
        </ol>
      </Row>
    );
  }
}

Breadcrumbs.propTypes = {
  list: React.PropTypes.array.isRequired
};

Breadcrumbs.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

export default Breadcrumbs;
