import React, { Component } from "react";
import {Badge} from "reactstrap";
import {StaticQuery} from "gatsby";
import { graphql } from 'gatsby';

class ProjectBox extends Component{
    render(){
        return(
            <div className="col-lg-4 col-md-6">
                <div className="feature_item">
                    <a href={this.props.project.url} target="_blank">
                        <i className={`fa ${this.props.project.icon_path}`}></i>
                        <h4>{this.props.project.name}</h4>
                        <p style={{color:"#222"}}>{this.props.project.description}</p>
                    <br/>
                    {this.props.project.skills.map(skill => (
                        <Badge color="primary" style={{
                            marginRight:"5px",
                            fontSize: "90%",
                            backgroundColor:"#8bc4f97a",
                            color:"#222"
                        }}>{skill}</Badge>
                    ))}
                    </a>
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
        	</div>
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