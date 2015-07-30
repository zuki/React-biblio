/*eslint new-cap:0 */
import React from 'react';
import debug from 'debug';
import app from './app';
import Router from 'react-router';
import { HistoryLocation } from 'react-router';
import navigateAction from './actions/navigation';
import FluxibleComponent from 'fluxible/addons/FluxibleComponent';
const bootstrapDebug = debug('Client');
const dehydratedState = window.App; // Sent from the server

window.React = React; // For chrome dev tool support
debug.enable('*');

bootstrapDebug('rehydrating app');

function RenderApp(context, Handler) {
  bootstrapDebug('React Rendering');
  const mountNode = document.getElementById('app');
  const Component = React.createFactory(Handler);
  React.render(
      React.createElement(
        FluxibleComponent,
        { context: context.getComponentContext() },
        Component()
      ),
      mountNode,
      () => {
        bootstrapDebug('React Rendered');
      }
  );
}

app.rehydrate(dehydratedState, (err, context) => {
  if (err) {
    throw err;
  }
  window.context = context;

  let firstRender = true;
  Router.run(app.getComponent(), HistoryLocation, (Handler, state) => {
    if (firstRender) {
      // Don't call the action on the first render on top of the server
      // rehydration Otherwise there is a race condition where the action
      // gets executed before render has been called, which can cause
      // the checksum to fail.
      RenderApp(context, Handler);
      firstRender = false;
    } else {
      context.executeAction(navigateAction, state, () => {
        RenderApp(context, Handler);
      });
    }
  });
});
