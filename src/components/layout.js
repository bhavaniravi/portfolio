import React from "react"
import FooterArea from "./footer";
import Header from "./header"

// import "../css/bootstrap.min.css"
// import "../css/style.css"
// import "../css/responsive.css"


export default ({ navFixed, children }) => (
    <React.Fragment>
      <Header navFixed={navFixed}></Header>
        {children}
      <FooterArea></FooterArea>  
    </React.Fragment>
)