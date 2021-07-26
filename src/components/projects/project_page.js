import React from "react"
import { graphql } from "gatsby"
import SEO from "../seo"
import Layout from "../layout"
import "../blogs/blog_page.css"
import {Badge} from "reactstrap"
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

async function importIcons(){
  // import("../../css/font-awesome.min.css")
}

class ProjectTemplate extends React.Component {
  render() {
    importIcons()
    const post = this.props.data.markdownRemark
    var tech_badge = post.frontmatter.tech.map(tech => (
      <Badge color="secondary">{tech}</Badge>
    ));

    return (
      <Layout navFixed={true}>
        <div className="article_div">
          <article style={{ "marginTop": "130px" }}>
          <SEO
                title={post.frontmatter.title}
                description={post.frontmatter.description}
          />
            <div>
              
              <h1>{post.frontmatter.title}</h1>
              <p>{post.frontmatter.description}</p>
              <h2>Featured Skills</h2>
                <div class="blogBadge contentBadge">
                {tech_badge}
                </div>
              <h2>Client</h2>
              <div><a href={post.frontmatter.client_url} target="_blank" rel="no-referrer noopener">{post.frontmatter.client}</a></div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            
            
            
          </article>
        </div>
      </Layout >
    )
  }
}

export default ProjectTemplate

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        twitterHandle
        url
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        published_date(formatString: "MMMM DD, YYYY")
        description
        slug
        tags
        tech
        client
        client_url
      }
    }
  }
`