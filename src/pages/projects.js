import React from "react"
import ProjectIndex from "../components/blogs/project_list"
import { graphql } from 'gatsby'

export default function blog_page(props) {
  return <ProjectIndex title="Projects" sub_title="The source of my Tech Experience" data={props.data}></ProjectIndex>
}

export const pageQuery = graphql`
query {
    allMarkdownRemark(
      sort: {fields: [frontmatter___published_date], order: DESC}, 
      limit: 100, 
      filter: {fields: {sourceName: {eq: "projects"}}, 
        frontmatter: {draft: {eq: false}}}) {
      edges {
        node {
          fields{
            sourceName
          }
          excerpt(pruneLength: 160)
          frontmatter {
            published_date
            title
            slug
            tags
            draft
            client
            client_url
            tech
          }
        }
      }
    }
}
`