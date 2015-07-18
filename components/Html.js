'use strict';
import React from 'react';

const Html = React.createClass({
  render() {
    return (
      <html>
        <head>
            <meta charSet="utf-8" />
            <title>{this.props.title}</title>
            <meta name="viewport" content="width=device-width, user-scalable=no" />
            <link rel="stylesheet" href="/public/css/bootstrap.min.css" />
            <link rel="stylesheet" href="/public/css/app.css" />
        </head>
        <body>
            <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
        </body>
        <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
        <script src="/public/js/client.js" defer></script>
      </html>
    );
  }
});

export default Html;
