import React from 'react';
import _ from 'lodash';
import { Row, Colt } from 'react-bootstrap';

class Breadcrumbs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Breadcrumbs#render');
    const crumbs = _.map(this.props.list, (item, i) => {
      const active = item.active ? 'active' : '';
      const content = item.active
        ? item.title
        : (<a href={item.url}>{item.title}</a>);
      return (
        <li key={i} className={active}>
          {content}
        </li>
      );
    });

    return (
      <Row>
        <ol className='breadcrumb'>
          {crumbs}
        </ol>
      </Row>
    );
  }
}

Breadcrumbs.propTypes = {
  list: React.PropTypes.array
};

export default Breadcrumbs;
