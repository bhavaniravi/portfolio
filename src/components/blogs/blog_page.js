import React from "react"
import { Link, graphql } from "gatsby"
import SEO from "../seo"
import Share from "../share/share"
import Layout from "../layout"
import "./blog_page.css"

class BlogPostTemplate extends React.Component {
  render() {
    const canonical = ''
    const post = this.props.data.markdownRemark
    if(post.frontmatter.is_medium){
        canonical = (<p>The blog was originally publushed in 
            <a href={this.post.frontmatter.medium_url}></a>
            </p>)
     }
    const title = post.frontmatter.title
    const { previous, next } = this.props.pageContext
    const twitterHandle = this.props.data.site.siteMetadata.twitterHandle
    return (
    <Layout navFixed={true}>
    <div className="article_div">
      <article style={{"marginTop":"130px"}}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.subtitle || post.frontmatter.description}
          previewImgUrl={post.frontmatter.featuredImgPath}
        />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr/>
        <Share
            socialConfig={{
                twitterHandle,
                config: {
                    url: `${this.props.data.site.siteMetadata.url}/${post.frontmatter.slug}`,
                    title,
                },
            }}
            tags={post.frontmatter.tags}
		/> 
        {canonical}
        <hr/>       
      </article>
      <ul
          style={{
            display: `grid`,
            "gridTemplateColumns": "1fr 1fr",
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.frontmatter.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.frontmatter.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
        </div>
       
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
        subtitle
        featuredImgPath
        published_date(formatString: "MMMM DD, YYYY")
        description
        slug
      }
    }
  }
`