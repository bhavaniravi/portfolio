import React from "react"
import Helmet from "react-helmet";
import FooterArea from "./footer";
import Header from "./header"
import { withPrefix } from 'gatsby'
// import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css';

export default ({ navFixed, children }) => (
    <div>
    <Helmet>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        {/* <link rel="icon" href="static/img/favicon.png" type="image/png"/> */}
        <title>Bhavani Ravi's Portfolio</title>
        
        
        {/* <link rel="stylesheet" href={withPrefix("css/bootstrap.css")}/>
        <link rel="stylesheet" href={withPrefix("vendors/linericon/style.css")}/>
        <link rel="stylesheet" href={withPrefix("css/font-awesome.min.css")}/>
        <link rel="stylesheet" href={withPrefix("vendors/owl-carousel/owl.carousel.min.css")}/>
        <link rel="stylesheet" href={withPrefix("vendors/lightbox/simpleLightbox.css")}/>
        <link rel="stylesheet" href={withPrefix("vendors/nice-select/css/nice-select.css")}/>
        <link rel="stylesheet" href={withPrefix("vendors/animate-css/animate.css")}/>
        <link rel="stylesheet" href={withPrefix("vendors/popup/magnific-popup.css")}/>
        <link rel="stylesheet" href={withPrefix("css/style.css")}/>
        <link rel="stylesheet" href={withPrefix("css/responsive.css")}/>
        <link rel="stylesheet" href={withPrefix("css/medium_blog.css")}/>         */}
    </Helmet>
    <Header navFixed={navFixed}></Header>
      {children}
      <FooterArea></FooterArea>  
    </div>
)