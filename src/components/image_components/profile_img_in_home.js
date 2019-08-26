import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

class HomeImage extends React.Component {
    render(){
        console.log(this.props.data)
        return (
            <Img fixed={this.props.data.file.childImageSharp.fixed}/>
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
            fixed(width: 600, height: 600) {
              ...GatsbyImageSharpFixed
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