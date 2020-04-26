import React, { Component } from "react";
import { Badge } from "reactstrap";
import { StaticQuery } from "gatsby";
import { graphql } from 'gatsby';
import SectionTitle from "../section_title";
import { formatDate } from "../utils"
import { TwitterFollowButton } from 'react-twitter-embed'

export class TalkBox extends Component {
    render() {
        let badge_style = {
            marginRight: "5px",
            fontSize: "90%",
            color: "#222",
            backgroundColor: "#e8e8e8"
        }
        let frontmatter = this.props.talk //.frontmatter

        let slide_badge = frontmatter.slides_link ? <Badge color="secondary" color="primary" href={frontmatter.slides_link} style={badge_style}>Slide</Badge> : ""
        let video_badge = frontmatter.video ? <Badge color="secondary" color="success" href={frontmatter.video} style={badge_style}>Video</Badge> : ""
        // frontmatter.skills = []
        return (
            <div className={this.props.layout}>
                <div className="feature_item" style={{
                    backgroundColor: "#f9f9ff"
                }}>
                    <div className="row feature_title">
                        <h4 className="col-sm-12">{frontmatter.title}</h4>
                    </div>
                    <p>{frontmatter.description}</p>
                    <br />
                    {frontmatter.skills.map(skill => (
                        <Badge color="secondary" style={badge_style}>{skill}</Badge>
                    ))}
                    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <div>
                            {frontmatter.location}
                        </div>
                        <div>
                            {frontmatter.date}
                        </div>
                    </div>
                    {video_badge}
                    {slide_badge}
                </div>
            </div>
        )
    }
}

class TalksArea extends Component {

    render() {
        const talks = this.props.talks
        return (
            <section className="feature_area p_120" id="talks" style={{
                backgroundColor: "white"
            }}>
                <SectionTitle title="Talks"
                    sub_title="Learning multiplies when you share what you know."></SectionTitle>
                <div className="container">
                    <div className="feature_inner row">

                        {talks.map(talk_data => (
                            <TalkBox talk={talk_data} layout="col-lg-4 col-md-6"></TalkBox>
                        ))}
                    </div>
                </div>
                <div className="container">
                    <div className="feature_inner row" style={{ justifyContent: "center", marginTop: "60px" }}>
                        <p style={{ textAlign: "center", lineHeight: "2rem" }}>Want me to speak at your next event?
                        <br />
                            Drop a DM
                        <br />
                            {/* <TwitterFollowButton screenName={'geeky_bhavani'} /> */}
                            <div className="personal_text">
                                <ul className="list personal_social" style={{ marginTop: "10px" }}>
                                    {this.props.social_icons.map(social => (
                                        <li><a target="_blank"
                                            rel="noopener noreferrer"
                                            href={social.url}>
                                            <i className={`fa ${social.className}`}></i>
                                            {social.name}
                                        </a></li>
                                    ))}

                                </ul>
                            </div>
                        </p>

                    </div>
                </div>
            </section >
        )
    }
}


export default ({ props }) => (
    <StaticQuery
        query={graphql`
		query {
		  site {
			siteMetadata {
                social_icons{
					url
					className
			    },
                talks{
                    title
                    description
                    icon_path
                    location
                    date
                    skills
                    slides_link
                    video
                }
			}
		  }
		}
	  `
        }
        render={({ site }) => <TalksArea {...site.siteMetadata} {...props} />}
    />
);