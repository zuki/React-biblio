import React from 'react';
import { Link } from 'react-router';

class SearchItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('SearchItem#render');
    const item = this.props.item;
    const url = `/item/${item.id}?${this.props.cq}`;
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

SearchItem.propTypes = {
  key: React.PropTypes.string,
  item: React.PropTypes.object,
  cq: React.PropTypes.string
};

export default SearchItem;
