import React, { Component } from "react";
import { Badge } from "reactstrap";
import { StaticQuery } from "gatsby";
import { graphql } from 'gatsby';
import SectionTitle from "../section_title";
import { socialComponents } from "../utils"

export class TalkBox extends Component {
    render() {
        let badge_style = {
            marginRight: "5px",
            fontSize: "90%",
            color: "#222",
            backgroundColor: "#e8e8e8"
        }
        let frontmatter = this.props.talk.frontmatter
        return (
            <div className={this.props.layout}>
                <div className="feature_item talk_item" style={{
                    backgroundColor: "rgb(243 243 243)",
                    padding: "40px 25px"
                }}>
                    <div className="row feature_title">
                        <h4 className="col-sm-12">{frontmatter.title}</h4>
                    </div>
                    <p style={{color: "#222222", marginBottom: "7px"}}>{frontmatter.description}</p>
                    <p style={{color: "#222222", marginBottom: "20px"}}><b>Event ::</b> {frontmatter.location}</p>
                    <button>Video & Slides</button>
                </div>
            </div>
        )
    }
}

class TalksArea extends Component {

    render() {
        let section_margins = {
            paddingTop: "100px",
            paddingBottom: "0px",
            backgroundColor: "white"
        }
        const talks = this.props.talks
        const workshops = this.props.workshops
        return (
            <React.Fragment>
                <section className="feature_area p_120" id="talks" style={section_margins}>
                    <SectionTitle title="Talks"
                        sub_title="Learning multiplies when you share what you know."></SectionTitle>
                    <div className="container">
                        <div className="feature_inner row">

                            {talks.map(talk_data => (
                                <TalkBox talk={talk_data} layout="col-lg-4 col-md-6"></TalkBox>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="feature_area p_120" id="talks" style={section_margins}>
                    <SectionTitle title="Workshops"></SectionTitle>
                    <div className="container">
                        <div className="feature_inner row">
                            {workshops.map(workshop => (
                                <TalkBox talk={workshop} layout="col-lg-4 col-md-6"></TalkBox>
                            ))}
                        </div>
                    </div>
                </section>
                <div className="container">
                    <div className="feature_inner row" style={{ justifyContent: "center", marginTop: "60px" }}>
                        <p style={{ textAlign: "center", lineHeight: "2rem" }}>Want me to speak at your next event?
                        <br />
                            Drop a DM
                        <br />
                            <div className="personal_text">
                                <ul className="list personal_social" style={{ marginTop: "10px", marginBottom: "40px" }}>
                                    {socialComponents(this.props.social_icons)}
                                </ul>
                            </div>
                        </p>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}