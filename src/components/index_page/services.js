import React, { Component } from "react"
import {ProjectBox} from "../../../unused/projects";
import SectionTitle from "../section_title"
import {Link} from "gatsby"


export default class ServiceArea extends Component {
    render() {
        return (
            <section className="feature_area p_120" id="services">
                <SectionTitle title="Work With Me"
                    sub_title="Are you looking for a Software Engineer who" />
                <div className="container">
                    <div className="feature_inner row">
                        <ProjectBox project={{"title": "Consult", "description": "Convert your product idea into a functional prototypes", "icon_path": null, "url": "/services#code", "skills": []}}></ProjectBox>
                        <ProjectBox project={{"title": "Coach", "description": "Mentor your team to level up your Software Engineering skills", "icon_path": null, "url": "/services#coach", "skills": []}}></ProjectBox>
                        <ProjectBox project={{"title": "Community", "description": "Set your community ground up with engagement pipelines", "icon_path": null, "url": "/services#community", "skills": []}}></ProjectBox>
                        
                    </div>
                    <div className="row" style={{"justifyContent": "center"}}>
                        <Link to="/services">
                            <button>More Details</button>
                        </Link>
                    </div>

                </div>
            </section>
        )
    }
}