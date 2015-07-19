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
    //console.log('Application#render');
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

export default Application;
