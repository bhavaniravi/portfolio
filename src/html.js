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
          <meta property="og:title" content="Bhavani Ravi's Portfolio" />
          <meta property="og:description" content="A Backend engineer with crazy passion for products" />
          <meta property="og:image" content="/img/pp.jpeg"/>
          <link rel="shortcut icon" href="/img/preview_icon/favicon.ico" type="image/x-icon" />
          {this.props.headComponents}


        <link rel="stylesheet" href="/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="/css/style.css"/>
        <link rel="stylesheet" href="/css/responsive.css"/>
        <link rel="stylesheet" href="/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="/css/medium_blog.css"/> 
        <link rel="stylesheet" href="/vendors/linericon/style.css"/>

        {/* <link rel="preload" href="/css/bootstrap.min.css"/>
        <link rel="preload" href="/css/style.css"/>
        <link rel="preload" href="/css/responsive.css"/> */}
        

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
        {/* <script
                dangerouslySetInnerHTML={{
                    __html: `window.twttr = (function(d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0],
                            t = window.twttr || {};
                        if (d.getElementById(id)) return t;
                        js = d.createElement(s);
                        js.id = id;
                        js.src = "https://platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    
                        t._e = [];
                        t.ready = function(f) {
                            t._e.push(f);
                        };
                    
                        return t;
                    }(document, "script", "twitter-wjs"));`,
                }}
            /> */}
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
