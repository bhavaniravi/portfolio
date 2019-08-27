import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

class HomeImage extends React.Component {
    render(){
        console.log(this.props.data)
        return (
            <Img fixed={this.props.data.file.childImageSharp.fluid}/>
        )
    }
}


export default () => (
    <StaticQuery
      query={graphql`
      query {
        file(relativePath: { eq: "pp.jpg" }) {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fluid(maxWidth: 600, maxHeight: 600) {
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