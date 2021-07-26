import React, { Component } from "react";
import SectionTitle from "../src/components/section_title";
import { socialComponents } from "../src/components/utils"



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