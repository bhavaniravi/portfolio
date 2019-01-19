import React from "react"
import Layout from "../components/layout"

import Banner from "../components/index_page/about_me"
import WelcomeArea from "../components/index_page/welcome_area"
import TimeLine from "../components/index_page/timeline";
import ProjectsArea from "../components/index_page/projects";

class IndexComponent extends React.Component{
  render(){
    return (
      <Layout navFixed={false}>
        <Banner/>
        <WelcomeArea></WelcomeArea>
        <ProjectsArea></ProjectsArea>
        <TimeLine></TimeLine>
      </Layout>
    )
  }
}

export default IndexComponent;