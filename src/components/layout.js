import React from "react"
import FooterArea from "./footer";
import Header from "./header"

export default ({ navFixed, children }) => (
    <React.Fragment>
      <Header navFixed={navFixed}></Header>
        {children}
      <FooterArea></FooterArea>  
    </React.Fragment>
)