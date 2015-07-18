import React from 'react';
import { Row, Col, ButtonInput } from 'react-bootstrap';
import getItems from '../actions/getItems';

class SearchInput extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      query: props.query,
    };
  }

  render() {
    console.log('SearchInput#render');
    //console.log(JSON.stringify(this.props));

    return (
      <Row>
        <Col md={12}>
          <form className="form-inline">
            <input id="query" type="text" ref="blog" value={this.state.query} size="80"
                  onChange={this.handleChange.bind(this)} placeholder="検索語を入力してください" autoFocus />&nbsp;
            <ButtonInput type="submit" bsStyle="primary" onClick={this.handleSubmit.bind(this)}>検索</ButtonInput>
          </form>
        </Col>
      </Row>
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
    // emit action
    this.context.executeAction(getItems, {
      q: this.state.query,
      page: 1
    });

    this.setState({
      query: ''
    });
  }
}

SearchInput.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

SearchInput.defaultProps = { query: '' };

export default SearchInput;
