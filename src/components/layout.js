import React from "react"
import FooterArea from "./footer";
import Header from "./header"

export default ({ navFixed, children }) => (
    <React.Fragment>
      <Header navFixed={navFixed}></Header>
      <div style={{position:"relative"}}>
        {children}
        </div>
      <FooterArea></FooterArea>  
    </React.Fragment>
)