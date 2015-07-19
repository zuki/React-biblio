import React from 'react';
import { Link } from 'react-router';
//import getItem from '../actions/getItem';

class SearchItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  /*
  handleClick(item, e) {
    e.preventDefault();
    const params = {id: item.id, query: item.sq};
    this.context.executeAction(getItem, params);
  }
  <td><a href='#' onClick={this.handleClick.bind(this, item)} dangerouslySetInnerHTML={ta} /></td>
  */

  render() {
    //console.log('SearchItem#render');
    const item = this.props.item;
    const url = `/item/${item.id}?${this.props.sq}`;
    const ta = {__html: item.title_t + (item.author_t ? ' / ' + item.author_t : '')};
    const pub = (item.publisher_txt ? item.publisher_txt.join('; ') : '') + (item.publishDate_ss ? ', ' + item.publishDate_ss[0] : '')

    return (
      <tr key={this.props.key}>
        <td><Link to={url} dangerouslySetInnerHTML={ta} /></td>
        <td>{pub}</td>
        <td>{item.callnumber_s}</td>
        <td>{item.shelf_s}</td>
      </tr>
    );
  }
}

SearchItem.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

SearchItem.propTypes = {
  key: React.PropTypes.string,
  item: React.PropTypes.object,
  sq: React.PropTypes.string
};

export default SearchItem;
