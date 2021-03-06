import React from "react"
import PropTypes from "prop-types"

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="google-site-verification" content="7AW50PusvVdoc_XrPFyKtEmfSNOIDRpXPqyANxnLl_s" />
          <title>Bhavani's Portfolio</title>
          <meta name="twitter:site" content="@BhavaniRavi_" />
          <meta name="twitter:creator" content="@BhavaniRavi_" />
          <link rel="shortcut icon" href="/img/preview_icon/favicon.ico" type="image/x-icon" />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
            // style={{"position": "relative", "minHeight":"100vh"}}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
