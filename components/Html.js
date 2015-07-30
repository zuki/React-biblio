import React from 'react';

class Html extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>書誌検索</title>
          <meta name="viewport" content="width=device-width, user-scalable=no"/>
          <link rel="stylesheet" href="/public/css/bootstrap.min.css"/>
          <link rel="stylesheet" href="/public/css/app.css"/>
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}/>
        </body>
        <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
        <script src="/public/js/client.js" defer></script>
      </html>
    );
  }
}

Html.propTypes = {
  markup: React.PropTypes.string.isRequired,
  state: React.PropTypes.string.isRequired
};

export default Html;
