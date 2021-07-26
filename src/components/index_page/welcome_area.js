import React, { Component } from "react"
import CountUp from 'react-countup';
import { Progress } from "reactstrap";
import {ProjectBox} from "./projects";
import SectionTitle from "../section_title"
class NumericalAchieveMent extends Component {
    render() {
        return (
            <div className="col-md-4">
                <a className="well_item_a"
                    rel="noopener noreferrer"
                    target={this.props.target}
                    href={this.props.link}>
                    <div className="wel_item">
                        <i className={this.props.icon}>
                            {` ${this.props.achievement}`}
                        </i>

                        <div>
                            <h4>
                                <CountUp end={this.props.count}
                                    duration={this.props.count / 20}
                                    suffix={`+ ${this.props.label}`} />
                            </h4>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}

class SkillItem extends Component {
    render() {
        return (
            <div className="skill_item">
                <h4>{this.props.skill} <span className="counter"></span></h4>
                <Progress value={this.props.percentage} />
            </div>
        )
    }
}


// class WelcomeArea extends Component {
//     render() {
//         return (
//             <section className="welcome_area" id="about_me">
//                 <div className="container">
//                     <div className="row welcome_inner">
//                         <div className="col-lg-6">
//                             <div className="welcome_text">
//                                 <h4>Work with me</h4>
//                                 {/* <p>I am a Software Engineer with Expertise in <b>Python Backend Systems, Chatbots and Deploying ML models.</b> </p>
//                                 <p>I am a part of Google Developer Group Chennai and have given <a href="/talks">talks</a> at international conferences</p> 
//                                 <h5>Technologies</h5>
//                                 <p>Python, Flask, Docker, Kubernetes</p>
                                
//                                 <h5>Databases</h5>
//                                 <p>MySQL, Postgres, Mongo</p>

//                                 <h5>Software Engineering</h5>
//                                 <p>System Design, TDD, Git workflow</p>

//                                 <h5>Infrastructure</h5>
//                                 <p>AWS, GCP</p> */}

//                                 <div className="row">
//                                     <NumericalAchieveMent count={6}
//                                         link="#projects"
//                                         achievement="Code"
//                                         label="Projects"
//                                         icon="fa fa-rocket">
//                                     </NumericalAchieveMent>
//                                     <NumericalAchieveMent
//                                         count={18}
//                                         link="#talks"
//                                         achievement="Speak"
//                                         label="Talks"
//                                         icon="fa fa-microphone">
//                                     </NumericalAchieveMent>
//                                     <NumericalAchieveMent target="_blank"
//                                         count={45}
//                                         link="/blog"
//                                         achievement="Write"
//                                         label="Blogs"
//                                         icon="fa fa-book">
//                                     </NumericalAchieveMent>

//                                 </div>
//                             </div>
                            
//                         </div>
                
//                     </div>
//                 </div>
//             </section>

//         )
//     }
// }


export default class WelcomeArea extends Component {
    render() {
        return (
            <section className="feature_area p_120" id="services">
                <SectionTitle title="Work With Me"
                    sub_title="Are you looking for a Software Engineer who" />
                <div className="container">
                    <div className="feature_inner row">
                        <ProjectBox project={{"title": "Consult", "description": "Convert your product idea into a functional prototypes", "icon_path": null, "url": "/services", "skills": []}}></ProjectBox>
                        <ProjectBox project={{"title": "Coach", "description": "Mentor your team to level up your Software Engineering skills", "icon_path": null, "url": "/services", "skills": []}}></ProjectBox>
                        <ProjectBox project={{"title": "Community", "description": "Set your community ground up with engagement pipelines", "icon_path": null, "url": "/services", "skills": []}}></ProjectBox>
                        
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
// 			  title,
// 			  about_me,
//               tagline,
//               skills{
//                 name
//                 percentage
//               }
// 			}
// 		  }
// 		}
// 	  `
//         }
//         render={({ site }) => <WelcomeArea {...site.siteMetadata} {...props} />}
//     />
// );