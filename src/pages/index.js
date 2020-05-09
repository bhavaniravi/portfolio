import React from "react"
import Layout from "../components/layout"

import Banner from "../components/index_page/about_me"
import WelcomeArea from "../components/index_page/welcome_area"
import TimeLine from "../components/index_page/timeline";
import ProjectsArea from "../components/index_page/projects";
import TalksArea from "../components/index_page/talks";
import SEO from "../components/seo"
import {graphql} from "gatsby" 
import "../css/bootstrap.min.css" 
import "../css/style.css"
import "../css/responsive.css"

async function importIcons(){
  import("../css/font-awesome.min.css")
}

class IndexComponent extends React.Component{
  render(){
    const site = this.props.data.site
    // importCSS()
    importIcons()
    return (
      <Layout navFixed={false}>
        <SEO
          title={site.siteMetadata.title}
          description={site.siteMetadata.tagline || site.frontmatter.description}
          previewImgUrl={ "/" + site.siteMetadata.previewImgUrl}
        />
        <Banner/>
        <WelcomeArea></WelcomeArea>
        <TimeLine></TimeLine>
        <ProjectsArea></ProjectsArea>
        <TalksArea/>
      </Layout>
    )
  }
}

export default IndexComponent; 

export const pageQuery = graphql`
query {
  site {
    siteMetadata {
      title,
      description,
      tagline,
      previewImgUrl
    }
  }
}
`
