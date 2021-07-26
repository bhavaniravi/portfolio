import React, { Component } from "react"
import {ProjectBox} from "../../../unused/projects";
import SectionTitle from "../section_title"
import { StaticQuery, Link } from "gatsby";

export default class BlogsArea extends Component {
    render() {
        return (
            <section className="feature_area p_120" id="services">
                <SectionTitle title="Recent Posts"/>
                <div className="container">
                    <div className="feature_inner row">
                        
                    
                    <StaticQuery
                                    query={graphql`
                                    query {
                                      allMarkdownRemark(sort: {fields: [frontmatter___published_date], order: DESC}, 
                                        limit: 3, 
                                        filter: {fields: {sourceName: {eq: "blog"}}, 
                                          frontmatter: {draft: {eq: false}, tags: {in: ["python"]}}}) {
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
                                    `}
                                    render={data => (
                                        data.allMarkdownRemark.edges.map(edge => (
                                            <ProjectBox project={{"title": edge.node.frontmatter.title, 
                                            "description": edge.node.frontmatter.description, "icon_path": null, 
                                            "skills": []}}></ProjectBox>
                        
                                        ))
                              )}  
                        />
                    </div>
                    <div className="row" style={{"justifyContent": "center"}}>
                        <Link to="/blog">
                            <button>
                                Read More
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        )
    }
}