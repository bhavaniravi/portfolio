import React from "react"
import Layout from "../components/layout"

import Banner from "../components/index_page/about_me"
import WelcomeArea from "../components/index_page/welcome_area"
import SEO from "../components/seo"
import {graphql} from "gatsby" 

import "../css/bootstrap.min.css" 
import "../css/style.css"
import "../css/responsive.css"
import "../css/font-awesome.min.css"

class IndexComponent extends React.Component{
  render(){
    const site = this.props.data.site
    return (
      <Layout navFixed={false}>
        <SEO
          title={site.siteMetadata.title}
          description={site.siteMetadata.tagline || site.frontmatter.description}
          previewImgUrl={ "/" + site.siteMetadata.previewImgUrl}
        />
        <Banner/>
        <WelcomeArea></WelcomeArea>
        {/* <TimeLine></TimeLine>  */}
        {/* <ProjectsArea></ProjectsArea> */}
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
