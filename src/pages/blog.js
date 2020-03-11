import React from "react"
import { graphql } from "gatsby"
import {InBuiltBlogPost} from "../components/blogs/blog_preview"
import SectionTitle from "../components/section_title"
import Layout from "../components/layout"

import "../css/medium_blog.css"

if (typeof window !== `undefined`) {
  window.postsToShow = 6
}

export default class BlogIndex extends React.Component {
  constructor(props) {
    super(props)
    let postsToShow = 6
    if (typeof window !== `undefined`) {

      postsToShow = window.postsToShow
    }

    this.state = {
      showingMore: true,
      postsToShow,
    }
  }

  update() {
      const distanceToBottom =
        document.documentElement.offsetHeight -
        (window.scrollY + window.innerHeight)
      if (this.state.showingMore && distanceToBottom < 100) {
        this.setState({ postsToShow: this.state.postsToShow + 6 })
      }
      this.ticking = false
  }

  handleScroll = () => {
      if (!this.ticking) {
        this.ticking = true
        requestAnimationFrame(() => this.update())
      }
  }

  componentDidMount() {
      window.addEventListener(`scroll`, this.handleScroll)
  }

  componentWillUnmount() {
      window.removeEventListener(`scroll`, this.handleScroll)
      window.postsToShow = this.state.postsToShow
  }

  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges
    return (
      <Layout navFixed={true}>
          <div className="med_blog_list_container">
                  <SectionTitle title="Bhavani's Blogs" sub_title="A Sneak Peak into my head"></SectionTitle>
                  {posts.slice(0, this.state.postsToShow).map(post_data => (
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
                    filter:{frontmatter:{draft:{eq: false},
                                         published_date:{gt: "2019-06-04"}        
                                        }
                            }
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
          isexternal
        }
      }
    }
  }
}
`


