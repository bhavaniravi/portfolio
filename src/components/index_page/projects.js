import React, { Component } from "react";
import {Badge} from "reactstrap";
import {StaticQuery} from "gatsby";
import { graphql } from 'gatsby';

class ProjectBox extends Component{
    render(){
        return(
            <div className="col-lg-4 col-md-6">
                <div className="feature_item">
                    <div className="row feature_title">
                        <i className={`fa col-sm-2 ${this.props.project.icon_path}`}></i>
                        <h4 className="col-sm-10"
                            style={{
                                paddingTop:"20px",
                                paddingLeft:"40px"
                            }}
                        >{this.props.project.name}</h4>
                    </div>
                    <p>{this.props.project.description}</p>
                    <br/>
                    {this.props.project.skills.map(skill => (
                        <Badge color="secondary" style={{
                            marginRight:"2px"
                        }}>{skill}</Badge>
                    ))}
                </div>
        	</div>
        )
    }
}

class ProjectsArea extends Component{
    render(){
        const projects = this.props.projects
        console.log(this.props)
        return(
            <section className="feature_area p_120" id="projects">
        	<div className="container">
        		<div className="main_title">
        			<h2>Projects</h2>
        			<p>Everything I have worked on, Learned and Experienced</p>
        		</div>
        		{/* <div className="isotope_fillter">
        			<ul className="gallery_filter list">
                        <BlogCategoriesTab data-filter="*" title="All"></BlogCategoriesTab>
                        <BlogCategoriesTab data-filter=".tech" title="Technologies"></BlogCategoriesTab>
                        <BlogCategoriesTab data-filter=".poetry" title="Poetry"></BlogCategoriesTab>
					</ul>
        		</div> */}
        	</div>
        	<div className="container">
        		<div className="feature_inner row">
               
                {projects.map(project_data => (
                    <ProjectBox project={project_data}></ProjectBox>
                ))}
        		</div>
        		{/* <div className="more_btn">
        			<a className="main_btn" href="blogs">View All</a>
        		</div> */}
        	</div>
        </section>
        )
    }
}



// export const pageQuery = graphql`
//   query {
//     allMediumPost(limit: 5, sort: { fields: [createdAt], order: DESC }) {
//       edges {
//         node {
//           id
//           title
//           author {
//             name
//           }
//           virtuals {
//             previewImage {
//               imageId
//             }
//           }
//         }
//       }
//     }
//   }
// `

export default ({ props }) => (
	<StaticQuery
	  query={graphql`
		query {
		  site {
			siteMetadata {
			  projects{
                  name
                  description
                  url
                  skills
                  icon_path
              }
			}
		  }
		}
	  `
  }
	  render={({ site }) => <ProjectsArea {...site.siteMetadata} {...props} />}
	/>
  );