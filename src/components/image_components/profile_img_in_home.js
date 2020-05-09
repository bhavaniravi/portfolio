import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

class HomeImage extends React.Component {
    render(){
        return (
            <Img fixed={this.props.data.file.childImageSharp.fluid}/>
        )
    }
}


export default () => (
    <StaticQuery
      query={graphql`
      query {
        file(relativePath: { eq: "pp.png" }) {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fluid(maxWidth: 300, maxHeight: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
      render={data => (
        <HomeImage data={data}></HomeImage>
      )}
    />
  )