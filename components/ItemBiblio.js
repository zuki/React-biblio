import React from 'react';
import { Panel, Table } from 'react-bootstrap';
import SolrDocument from '../models/solr-document';
import _ from 'lodash';

class ItemBiblio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //console.log('ItemBiblio#render');
    const msgs = this.props.msgs;
    const doc = this.props.doc.getDocument();
    const lines = _.map(doc, (value, key) => {
      return (<tr key={key}><th>{msgs[key]}</th><td>{value}</td></tr>);
    })

    return (
      <Panel collapsible defaultExpanded header={msgs.item_title} bsStyle='primary' className='text-center'>
        <Table fill>
          <thead>
            <th className='nowrap'>{msgs.item_head_field}</th>
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
  doc: React.PropTypes.instanceOf(SolrDocument)
};

export default ItemBiblio;
