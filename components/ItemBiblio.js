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
    const doc = this.props.doc.getDocument();
    const lines = _.map(doc, (value, key) => {
      return (<tr key={key}><th>{key}</th><td>{value}</td></tr>);
    })

    return (
      <Panel collapsible defaultExpanded header='書誌情報' bsStyle='primary' className='text-center'>
        <Table fill>
          <thead>
            <th className='nowrap'>フィールド</th>
            <th>データ</th>
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
