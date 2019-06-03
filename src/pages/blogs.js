import React from "react"
import { graphql } from "gatsby"
import {InBuiltBlogPost} from "../components/blogs/blog_preview"
import SectionTitle from "../components/section_title"
import Layout from "../components/layout"


export default class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges
    console.log(posts[0])
    return (
      <Layout navFixed={true}>
          <div className="med_blog_list_container">
                  <SectionTitle title="Bhavani's Blogs" sub_title="A Sneak Peak into my head"></SectionTitle>
                  {posts.map(post_data => (
                      <InBuiltBlogPost key={post_data.node.frontmatter.slug}
                      post={post_data.node}></InBuiltBlogPost>
                  ))}
          </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
query {
  allMarkdownRemark(sort: { fields: [frontmatter___published_date], order: DESC }, 
                    limit:100,
                    filter:{frontmatter:{draft:{eq: false}}}
                    ) {
    edges {
      node {
        timeToRead
        frontmatter {
          published_date
          description
          title
          slug
          subtitle
          tags
          draft
          featuredImgPath
        }
      }
    }
  }
}
`


