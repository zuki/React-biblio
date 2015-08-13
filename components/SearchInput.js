import React from 'react';
import { Navigation } from 'react-router';
import ReactMixin from 'react-mixin';
import getItems from '../actions/getItems';

class SearchInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      query: props.query
    };
  }

  render() {
    // console.log('SearchInput#render');
    return (
      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input className="form-control" id="query" type="text" ref="blog"
            value={this.state.query} size="80"
            onChange={this.handleChange.bind(this)}
            placeholder="検索語を入力してください" autoFocus />&nbsp;
        </div>
        <button type="submit" className="btn btn-primary"
          onClick={this.handleSubmit.bind(this)}>検索</button>
        <button type="reset" className="btn btn-default"
          onClick={this.handleClear.bind(this)}>クリア</button>
      </form>
    );
  }

  handleChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  handleSubmit(e) {
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
  }

  handleClear(e) {
    e.preventDefault();
    this.setState({
      query: ''
    });
  }
}

SearchInput.PropTypes = {
  query: React.PropTypes.string
};

SearchInput.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

SearchInput.defaultProps = { query: '' };

ReactMixin.onClass(SearchInput, Navigation);

export default SearchInput;
