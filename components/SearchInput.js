var React = require('react');
var Navigation = require('react-router').Navigation;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var ButtonInput = require('react-bootstrap').ButtonInput;
var getItems = require('../actions/getItems');

var SearchInput = React.createClass({
  mixins: [Navigation],

  contextTypes: {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
  },

  getDefaultProps: function() {
    return { query: '' }
  },

  getInitialState: function() {
    return { query: this.props.query };
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
  },

  render: function() {
    console.log('SearchInput#render');
    return (
      <Row>
        <Col md={12}>
          <form className="form-inline">
            <input id="query" type="text" ref="blog" value={this.state.query} size="80"
                  onChange={this.handleChange} placeholder="検索語を入力してください" autoFocus />&nbsp;
            <ButtonInput type="submit" bsStyle="primary" onClick={this.handleSubmit}>検索</ButtonInput>
            <ButtonInput type="reset" onClick={this.handleClear}>クリア</ButtonInput>
          </form>
        </Col>
      </Row>
    );
  }
});

module.exports = SearchInput;
