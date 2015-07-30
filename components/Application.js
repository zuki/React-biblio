import React from 'react';
import {connectToStores, provideContext} from 'fluxible/addons';
import { RouteHandler } from 'react-router';
import { Grid, Row } from 'react-bootstrap';
import Navigation from './Navigation';
import LanguageStore from '../stores/LanguageStore';

class Application extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Grid>
        <Row>
          <Navigation {...this.props.langState} />
        </Row>
        <Row>
          <RouteHandler {...this.props.langState}/>
        </Row>
      </Grid>
    );
  }
}

Application = provideContext(Application);

Application.propTypes = {
  msgs: React.PropTypes.object,
  langState: React.PropTypes.object
};

Application.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

Application = connectToStores(Application, [LanguageStore],
  (stores) => {
    return {
      langState: stores.LanguageStore.getState()
    };
  });

export default Application;
