import React from "react"
import PropTypes from "prop-types"
import {withPrefix} from "gatsby"

export default class HTML extends React.Component {
  // componentDidMount() {
  //   if (typeof twttr.widgets !== 'undefined') {
  //     twttr.widgets.load()
  //   }
  // }

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
          <title>Bhavani's Portfolio</title>
          <meta name="description" content="A Backend engineer with crazy passion for products" />
          <meta property="og:title" content="Bhavani Ravi" />
          <meta property="og:description" content="A Backend engineer with crazy passion for products" />
          <meta property="og:image" content="/img/pp.jpeg"/>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="/img/pp.jpeg"/>
          <meta name="twitter:site" content="@geeky_bhavani" />
          <meta name="twitter:creator" content="@geeky_bhavani" />
          <link rel="shortcut icon" href="/img/preview_icon/favicon.ico" type="image/x-icon" />
          {this.props.headComponents}


        <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css"/>
        <link rel="stylesheet" type="text/css" href="/css/style.css"/>
        <link rel="stylesheet" type="text/css" href="/css/responsive.css"/>


        {/* <link rel="stylesheet" href="/vendors/owl-carousel/owl.carousel.min.css"/> */}
    
        

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

        <link rel="stylesheet" type="text/css" href="/css/font-awesome.min.css"/>
        <link rel="stylesheet" type="text/css" href="/css/medium_blog.css"/>
        <link rel="stylesheet" href="/vendors/flaticon/flaticon.css"></link> 
        <link rel="stylesheet" href="/vendors/linericon/style.css"/>
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
