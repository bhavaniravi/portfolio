import React, { Component } from "react"
import {ProjectBox} from "../../../unused/projects";
import SectionTitle from "../section_title"
import {Link, StaticQuery} from "gatsby"


export default class OpenSourceArea extends Component {
    render() {
        return (
            <section className="feature_area p_120" id="services">
                <SectionTitle title="OpenSource Contributions"
                    sub_title="A collection of opensource software I contributed to" />
                <div className="container">
                    <div className="feature_inner row">
                    <StaticQuery
                                    query={graphql`
                                    query {
                                      allMarkdownRemark(sort: {fields: [frontmatter___published_date], order: DESC}, 
                                        filter: {fields: {sourceName: {eq: "opensource"}}, 
                                          frontmatter: {draft: {eq: false}}}) {
                                        edges {
                                          node {
                                            excerpt
                                            fields{
                                              sourceName
                                            }
                                            timeToRead
                                            frontmatter {
                                              title
                                              description
                                              slug
                                              subtitle
                                              skills
                                            }
                                          }
                                        }
                                      }
                                    }
                                    `}
                                    render={data => (
                                        data.allMarkdownRemark.edges.map(edge => (
                                            <ProjectBox project={{"title": edge.node.frontmatter.title, 
                                            "description": edge.node.excerpt, 
                                            "url": "/" + edge.node.fields.sourceName + "/"+ edge.node.frontmatter.slug ,
                                            "icon_path": null, 
                                            "skills": edge.node.frontmatter.skills}}></ProjectBox>
                        
                                        ))
                              )}  
                        />
                        {/* <ProjectBox project={{"title": "Apache Airflow", "description": "Airflow let's you orchestrate distributed data pipelines over Kubernetes environment", "icon_path": null, "url": "/opensource/airflow", "skills": ["code", "documentation"]}}></ProjectBox>
                        <ProjectBox project={{"title": "Python Pandas", "description": "Pandas is the famous data analysis library commonly used in DS applications", "icon_path": null, "url": "/opensource/pandas", "skills": ["code"]}}></ProjectBox>
                        <ProjectBox project={{"title": "Django All-Auth", "description": "Django-all-auth integrates differnent authentication system with a django application", "icon_path": null, "url": "/opensource/django-allauth", "skills": ["code"]}}></ProjectBox>
                        <ProjectBox project={{"title": "Rasa", "description": "Rasa is an Opensource chatbot development framework", "icon_path": null, "url": "/opensource/rasa", "skills": ["blog", "community"]}}></ProjectBox>
                        <ProjectBox project={{"title": "Docker", "description": "Docker for Python Development - A tutorial Guide for Python Developers", "icon_path": null, "url": "/opensource/docker", "skills": ["documentation"]}}></ProjectBox>
                        <ProjectBox project={{"title": "OwnFlask", "description": "Built a Flask like framework to understand internals of Flask", "icon_path": null, "url": "blog/building-own-flask-1/", "skills": ["code"]}}></ProjectBox> */}
                    </div>
                    <div className="row" style={{"justifyContent": "center"}}>
                        <Link to="/projects/#opensource">
                            <button>More Details</button>
                        </Link>
                    </div>

                </div>
            </section>
        )
    }
}