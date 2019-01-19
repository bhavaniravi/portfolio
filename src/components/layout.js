import React from "react"
// import Helmet from "react-helmet";
import FooterArea from "./footer";
import Header from "./header"
// import { withPrefix } from 'gatsby'
// import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css';

export default ({ navFixed, children }) => (
    <div>
      <Header navFixed={navFixed}></Header>
        {children}
      <FooterArea></FooterArea>  
    </div>
)