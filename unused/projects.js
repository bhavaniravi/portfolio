import React, { Component } from "react";
import { Badge } from "reactstrap";
import SectionTitle from "../src/components/section_title"

export class ProjectBox extends Component {
    render() {
        return (
            <div className="col-lg-4 col-md-6">
                <div className="feature_item">
                    <a href={this.props.project.url}>
                        <i className={`fa ${this.props.project.icon_path}`}></i>
                        <h4>{this.props.project.title}</h4>
                        <p style={{ color: "#222" }}>{this.props.project.description}</p>
                        <br />
                        {this.props.project.skills.map(skill => (
                            <Badge color="primary" style={{
                                marginRight: "5px",
                                fontSize: "90%",
                                backgroundColor: "#8bc4f97a",
                                color: "#222"
                            }}>{skill}</Badge>
                        ))}
                    </a>
                </div>
            </div>
        )
    }
}

class ProjectsArea extends Component {
    render() {
        const projects = this.props.projects
        return (
            <section className="feature_area p_120" id="projects">
                <SectionTitle title="Projects"
                    sub_title="Things I have worked on, Learned and Experienced" />
                <div className="container">
                    <div className="feature_inner row">

                        {projects.map(project_data => (
                            <ProjectBox project={project_data}></ProjectBox>
                        ))}
                    </div>
                </div>
            </section>
        )
    }
}


// export default ({ props }) => (
//     <StaticQuery
//         query={graphql`
// 		query {
// 		  site {
// 			siteMetadata {
// 			  projects{
//                   title
//                   description
//                   url
//                   skills
//                   icon_path
//               }
// 			}
// 		  }
// 		}
// 	  `
//         }
//         render={({ site }) => <ProjectsArea {...site.siteMetadata} {...props} />}
//     />
// );