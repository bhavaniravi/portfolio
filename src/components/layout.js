import React from "react"
import Helemt from "react-helmet";
import FooterArea from "./footer";
import Header from "./header"
import { withPrefix } from 'gatsby'
import 'bootstrap/dist/css/bootstrap.min.css';

export default ({ children }) => (
    <div>
    <Helemt>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <link rel="icon" href="static/img/favicon.png" type="image/png"/>
        <title>Bhavani Ravi's Portfolio</title>
        
        
        <link rel="stylesheet" href={withPrefix("bootstrap/dist/css/bootstrap.min.css")}/>
        <link rel="stylesheet" href={withPrefix("vendors/linericon/style.css")}/>
        <link rel="stylesheet" href={withPrefix("css/font-awesome.min.css")}/>
        <link rel="stylesheet" href={withPrefix("vendors/owl-carousel/owl.carousel.min.css")}/>
        <link rel="stylesheet" href={withPrefix("vendors/lightbox/simpleLightbox.css")}/>
        <link rel="stylesheet" href={withPrefix("vendors/nice-select/css/nice-select.css")}/>
        <link rel="stylesheet" href={withPrefix("vendors/animate-css/animate.css")}/>
        <link rel="stylesheet" href={withPrefix("vendors/popup/magnific-popup.css")}/>
        
        <link rel="stylesheet" href={withPrefix("css/style.css")}/>
        <link rel="stylesheet" href={withPrefix("css/responsive.css")}/>
        <link rel="stylesheet" href={withPrefix("css/medium_blog.css")}/>
       
        
    </Helemt>
        
      <Header></Header>
      {children}
      <FooterArea></FooterArea>  

      
        <script src="js/jquery-3.3.1.min.js"></script>
        <script src="js/popper.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/stellar.js"></script>
        <script src="vendors/lightbox/simpleLightbox.min.js"></script>
        <script src="vendors/nice-select/js/jquery.nice-select.min.js"></script>
        <script src="vendors/isotope/imagesloaded.pkgd.min.js"></script>
        <script src="vendors/isotope/isotope.pkgd.min.js"></script>
        <script src="vendors/owl-carousel/owl.carousel.min.js"></script>
        <script src="vendors/popup/jquery.magnific-popup.min.js"></script>
        <script src="js/jquery.ajaxchimp.min.js"></script>
        <script src="vendors/counter-up/jquery.waypoints.min.js"></script>
        <script src="vendors/counter-up/jquery.counterup.min.js"></script>
        <script src="js/mail-script.js"></script>
        <script src="js/theme.js"></script>
        </div>
)