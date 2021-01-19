import React from "react"
import { graphql, navigate } from 'gatsby'
import Layout from "../components/layout"
import { TagCloud } from 'react-tagcloud'



function SimpleCloud (data) {
    return (<TagCloud
      minSize={12}
      maxSize={35}
      tags={data}
      onClick={tag =>  navigate(`/tags/${tag.value}`)}
    />)
}

export default function blog_page(props) {
    console.log(props)
    let tags = props.data.tagsGroup.group
    var resultArray = tags.map(function(tag) {
        return { "value": tag.fieldValue, "count": tag.totalCount};
    });
    var cloud = SimpleCloud(resultArray)
    return (<Layout navFixed={true}>
        <div className="med_blog_list_container">
                {cloud}
                </div>
            </Layout>)

}

export const pageQuery = graphql`
{
    allMarkdownRemark(
      sort: { fields: [frontmatter___published_date], order: DESC }
      limit: 100
      filter: {
        fields: {sourceName: {eq: "blogs"}},
        frontmatter: { draft: { eq: false }}
      }
    ) {
      edges {
        node {
          fields {
            slug
            sourceName
          }
          frontmatter {
            title
            slug
            tags
          }
        }
      }
    }
    tagsGroup: allMarkdownRemark(
      limit: 2000,
      filter:{frontmatter:{draft:{eq: false}}},
      sort: { fields: [frontmatter___published_date], order: DESC }
      ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`