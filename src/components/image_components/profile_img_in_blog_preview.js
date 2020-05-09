import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

class ProfileImage extends React.Component {
    render(){
        const style =  {
            "borderRadius": "50%",
            "display": "block",
            "verticalAlign": "middle"
        }
        return (
            <Img fixed={this.props.data.file.childImageSharp.fixed} 
            imgStyle={style}/>
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
            fixed(width: 50, height: 50) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
      render={data => (
        <ProfileImage data={data}></ProfileImage>
      )}
    />
  )