import React, { Component } from "react"
import CountUp from 'react-countup';
import { Progress } from "reactstrap";
import { StaticQuery } from "gatsby";
import { graphql } from 'gatsby';

class NumericalAchieveMent extends Component {
    render() {
        return (
            <div className="col-md-4">
                <a className="well_item_a"
                    rel="noopener noreferrer"
                    target={this.props.target}
                    href={this.props.link}>
                    <div className="wel_item">
                        <i className={`lnr lnr-${this.props.icon}`}>
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


class WelcomeArea extends Component {
    render() {
        return (
            <section className="welcome_area p_120" id="about_me">
                <div className="container">
                    <div className="row welcome_inner">
                        <div className="col-lg-6">
                            <div className="welcome_text">
                                <h4>What do I do?</h4>
                                {/* {this.props.about_me.map(me => (
                                    <p>{me}</p>
                                ))} */}
                                <p>{`${this.props.about_me}`}</p>
                                <div className="row">
                                    <NumericalAchieveMent count={6}
                                        link="#projects"
                                        achievement="Code"
                                        label="Projects"
                                        icon="rocket">
                                    </NumericalAchieveMent>
                                    <NumericalAchieveMent
                                        count={18}
                                        link="#talks"
                                        achievement="Speak"
                                        label="Talks"
                                        icon="mic">
                                    </NumericalAchieveMent>
                                    <NumericalAchieveMent target="_blank"
                                        count={45}
                                        link="/blog"
                                        achievement="Write"
                                        label="Blogs"
                                        icon="book">
                                    </NumericalAchieveMent>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="tools_expert">
                                <div className="skill_main">
                                    {this.props.skills.map(skill => (
                                        <SkillItem skill={skill.name} percentage={skill.percentage}></SkillItem>
                                    ))}
                                </div>
                            </div>
                        </div>
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
			  title,
			  about_me,
              tagline,
              skills{
                name
                percentage
              }
			}
		  }
		}
	  `
        }
        render={({ site }) => <WelcomeArea {...site.siteMetadata} {...props} />}
    />
);