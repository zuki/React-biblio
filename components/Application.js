'use strict';
import React from 'react';
import {connectToStores, provideContext} from 'fluxible/addons';
import { RouteHandler } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import Navigation from './Navigation';
import ApplicationStore from '../stores/ApplicationStore';
import SearchStore from '../stores/SearchStore';

class Application extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    console.log('Application#render');
    //console.log(JSON.stringify(this.props.searchState));
    return (
      <Grid>
        <Row>
          <Navigation />
        </Row>
        <Row>
          <RouteHandler />
        </Row>
      </Grid>
    );
  }
}

Application = provideContext(Application);

/*
Application.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

Application = connectToStores(Application, [SearchStore], function (stores, props) {
  return {
    searchState: stores.SearchStore.getState()
  };
});
*/

export default Application;
