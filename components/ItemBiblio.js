import React from 'react';
import { Panel, Table } from 'react-bootstrap';
import SolrDocument from '../models/solr-document';
import _ from 'lodash';

class ItemBiblio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('ItemBiblio#render');
    const {msgs, doc} = this.props;
    const lines = _.map(doc.getDocument(), (value, key) => {
      return (<tr key={key}><th>{msgs[key]}</th><td>{value}</td></tr>);
    });

    return (
      <Panel collapsible defaultExpanded header={msgs.item_title}
        bsStyle="primary" className="text-center">
        <Table fill>
          <thead>
            <th className="nowrap">{msgs.item_head_field}</th>
            <th>{msgs.item_head_value}</th>
          </thead>
          <tbody>
            {lines}
          </tbody>
        </Table>
      </Panel>
    );
  }
}

ItemBiblio.propTypes = {
  doc: React.PropTypes.instanceOf(SolrDocument).isRequired,
  msgs: React.PropTypes.object.isRequired
};

export default ItemBiblio;
