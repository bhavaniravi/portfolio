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
          <meta name="twitter:site" content="@geeky_bhavani" />
          <meta name="twitter:creator" content="@geeky_bhavani" />
          <link rel="shortcut icon" href="/img/preview_icon/favicon.ico" type="image/x-icon" />
          {this.props.headComponents}

          <script>
            (function(h,e,a,t,m,p) {
            m=e.createElement(a);
            m.async=!0;
            m.src=t;
            p=e.getElementsByTagName(a)[0];p.parentNode.insertBefore(m,p);
            })(window,document,'script','https://u.heatmap.it/log.js');
</script>


        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
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
