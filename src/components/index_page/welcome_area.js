import React, { Component } from "react"
import CountUp from 'react-countup';
import {Progress} from "reactstrap";
import {StaticQuery} from "gatsby";
import { graphql } from 'gatsby';

class NumericalAchieveMent extends Component{
    render(){
        return (
            <div className="col-md-4">
                <div className="wel_item">
                    <i className={`lnr lnr-${this.props.icon}`}>
                    {` ${this.props.achievement}`}
                    </i>

                    <div>
                    <h4>
                        <CountUp end={this.props.count} 
                        duration={this.props.count/10}  
                        suffix={` ${this.props.label}`}/> 
                    </h4>
                    </div>
                </div>
            </div>
        )
    }
}

class SkillItem extends Component{
    render(){
        return (
            <div className="skill_item">
                <h4>{this.props.skill} <span className="counter"></span></h4>
                <Progress value={this.props.percentage}/>
            </div>
        )
    }
}


class WelcomeArea extends Component{
    render(){
        return (
            <section className="welcome_area p_120" id="about_me">
                <div className="container">
                    <div className="row welcome_inner">
                        <div className="col-lg-6">
                            <div className="welcome_text">
                                <h4>About Myself</h4>
                                <p>{this.props.about_me}</p>
                                <div className="row">
                                    <NumericalAchieveMent count={10} 
                                                        achievement="Code" 
                                                        label="Projects"
                                                        icon="rocket">
                                    </NumericalAchieveMent>
                                    <NumericalAchieveMent count={20} 
                                                        achievement="Speak" 
                                                        label="Talks"
                                                        icon="mic">
                                    </NumericalAchieveMent>
                                    <NumericalAchieveMent count={30} 
                                                            achievement="Write" 
                                                            label="blogs"
                                                            icon="book">
                                    </NumericalAchieveMent>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="tools_expert">
                                <div className="skill_main">
                                    <SkillItem skill={"Python"} percentage={80}></SkillItem>
                                    <SkillItem skill={"Chatbots"} percentage={85}></SkillItem>
                                    <SkillItem skill={"Django/Flask"} percentage={95}></SkillItem>
                                    <SkillItem  skill={"MongoDB"} percentage={95}>></SkillItem>
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
			  tagline
			}
		  }
		}
	  `
  }
	  render={({ site }) => <WelcomeArea {...site.siteMetadata} {...props} />}
	/>
  );