/*eslint no-var:0, func-names: 0*/
var React = require('react');
var Navigation = require('react-router').Navigation;
var getItems = require('../actions/getItems');

var SearchInput = React.createClass({
  propTypes: {
    query: React.PropTypes.string
  },

  contextTypes: {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
  },

  mixins: [Navigation],

  getDefaultProps: function() {
    return { query: '' };
  },

  getInitialState: function() {
    return { query: this.props.query };
  },

  render: function() {
    // console.log('SearchInput#render');
    return (
      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input className="form-control" id="query" type="text" ref="blog"
            value={this.state.query} size="80" onChange={this.handleChange}
            placeholder="検索語を入力してください" autoFocus />&nbsp;
        </div>
        <button type="submit" className="btn btn-primary"
          onClick={this.handleSubmit}>検索</button>
        <button type="reset" className="btn btn-default"
          onClick={this.handleClear}>クリア</button>
      </form>
    );
  },

  handleChange: function(e) {
    this.setState({
      query: e.target.value
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.query.length === 0) return;

    this.context.executeAction(getItems, {
      q: this.state.query,
      page: 1
    });

    this.setState({
      query: ''
    });

    this.transitionTo('search');
  },

  handleClear: function(e) {
    e.preventDefault();
    this.setState({
      query: ''
    });
  }

});

module.exports = SearchInput;
