var React = require('react');
var _ = require('lodash');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Navigation = require('react-router').Navigation;

var Breadcrumbs = React.createClass({
  mixins: [Navigation],

  contextTypes: {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
  },

  propTypes: {
    list: React.PropTypes.array
  },

  handleClick: function(to, q, e) {
    e.preventDefault();

    if (q) {
      this.transitionTo(to, null, {q: q});
    } else {
      this.transitionTo(to);
    }
  },

  render: function() {
    //console.log('Breadcrumbs#render');
    const crumbs = _.map(this.props.list, (item, i) => {
      const active = item.active ? 'active' : '';
      const content = item.active
        ? item.title
        : (<a href='#' onClick={this.handleClick.bind(this, item.to, item.q)}>{item.title}</a>);
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
});

module.exports = Breadcrumbs;
