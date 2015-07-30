/*eslint no-var:0, vars-on-top:0, func-names:0, new-cap:0 */
require('babel/register');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var serialize = require('serialize-javascript');
var navigateAction = require('./actions/navigation');
var debug = require('debug')('Server');
var React = require('react');
var app = require('./app');
var HtmlComponent = React.createFactory(require('./components/Html'));
var FluxibleComponent = require('fluxible/addons/FluxibleComponent');
var Router = require('react-router');

var server = express();
server.use(favicon(path.join(__dirname, '/build/favicon.ico')));
server.use('/public', express.static(path.join(__dirname, '/build')));

server.use(function(req, res) {
  var context = app.createContext();

  debug('Executing navigate action');
  Router.run(app.getComponent(), req.path, function(Handler, state) {
    context.executeAction(navigateAction, state, function() {
      debug('Exposing context state');
      var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

      debug('Rendering Application component into html');
      var Component = React.createFactory(Handler);
      var html = React.renderToStaticMarkup(HtmlComponent({
          state: exposed,
          markup: React.renderToString(
              React.createElement(
                  FluxibleComponent,
                  { context: context.getComponentContext() },
                  Component()
              )
          )
      }));

      debug('Sending markup');
      res.send(html);
    });
  });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
