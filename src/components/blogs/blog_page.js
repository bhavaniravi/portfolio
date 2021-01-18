import React from "react"
import { Link, graphql } from "gatsby"
import SEO from "../seo"
import Share from "../share/share"
import Layout from "../layout"
import "./blog_page.css"
import { NewsLetter } from "../footer"
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

async function importIcons(){
  // import("../../css/font-awesome.min.css")
}

class BlogPostTemplate extends React.Component {
  render() {
    importIcons()
    var canonical = ''
    const post = this.props.data.markdownRemark
    if (post.frontmatter.is_medium) {
      canonical = (<p>The blog was originally publushed in
        <a href={this.post.frontmatter.medium_url}>{this.post.frontmatter.medium_url}</a>
      </p>)
    }
    const title = post.frontmatter.title
    const { previous, next } = this.props.pageContext
    const twitterHandle = this.props.data.site.siteMetadata.twitterHandle
    return (
      <Layout navFixed={true}>
        <div className="article_div">
          <article style={{ "marginTop": "130px" }}>
            <SEO
              title={post.frontmatter.title}
              subtitle={post.frontmatter.subtitle}
              description={post.frontmatter.description}
              previewImgUrl={post.frontmatter.featuredImgPath}
              isexternal={post.frontmatter.isexternal}
            />
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>
          <hr />
          <Share
            socialConfig={{
              twitterHandle,
              config: {
                url: `${this.props.data.site.siteMetadata.url}/blog/${post.frontmatter.slug}`,
                title,
              },
            }}
            tags={post.frontmatter.tags}
          />
          {canonical}
          <hr />
          <div style={{ display: "grid", justifyContent: "center" }}>
            <div className="social-header" style={{
              fontSize: "16px",
              fontWeight: "bold",
              fontFamily: "Heebo, sans-serif",
              marginBottom: "0px"
            }}>
              Join my NewsLetter!
		          </div>
            <NewsLetter></NewsLetter>
          </div>
          <hr />
          <ul
            style={{
              display: `grid`,
              "gridTemplateColumns": "1fr 1fr",
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >


            <li style={{ "textAlign": "left" }}>
              {previous && (
                <Link to={"/blog/" + previous.frontmatter.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li style={{ "textAlign": "right" }}>
              {next && (
                <Link to={"/blog/" + next.frontmatter.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>

          <em>
            <p>I recently moved my blogs from medium. Find more of my writing
                  <a target="_blank" rel="noopener noreferrer" href="https://medium.com/@bhavaniravi"> here.</a>
            </p>
          </em>

        </div>


      </Layout >
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
        isexternal
      }
    }
  }
`