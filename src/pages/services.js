import React from "react"
import ServicePage from "../components/services/service_list"
import { graphql } from 'gatsby'

export default function blog_page(props) {
  return <ServicePage title="Services" sub_title="There are 3 main reasons companies hire me to work with them." data={props.data}></ServicePage>
}

export const pageQuery = graphql`
query {
    allMarkdownRemark(
      sort: {fields: [frontmatter___published_date], order: DESC}, 
      limit: 100, 
      filter: {fields: {sourceName: {eq: "services"}}}) {
      edges {
        node {
          fields{
            sourceName
          }
          excerpt(pruneLength: 160)
          html
          frontmatter {
            title
            slug
          }
        }
      }
    }
}
`