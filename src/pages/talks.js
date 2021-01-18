import React from "react"
import TalkIndex from "../components/blogs/talk_list"
import { graphql } from 'gatsby'

export default function blog_page(props) {
  return <TalkIndex title="Talks" data={props.data}></TalkIndex>
}

export const pageQuery = graphql`
query {
    allMarkdownRemark(sort: {fields: [frontmatter___published_date], order: DESC}, 
      limit: 100, 
      filter: {fields: {sourceName: {eq: "talks"}}, 
        frontmatter: {draft: {eq: false}}}) {
      edges {
        node {
          fields{
            sourceName
          }
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