import React, { Component } from "react"
import CountUp from 'react-countup';
import {Progress} from "reactstrap";

class NumericalAchieveMent extends Component{
    render(){
        return (
            <div className="col-md-4">
                <div className="wel_item">
                    <i className="lnr lnr-database"></i>
                    <h4>
                        <CountUp end={this.props.count} duration={this.props.count/10}></CountUp>
                    </h4>
                    <p>{this.props.achievement}</p>
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


export default class WelcomeArea extends Component{
    render(){
        return (
            <section className="welcome_area p_120" id="about_me">
                <div className="container">
                    <div className="row welcome_inner">
                        <div className="col-lg-6">
                            <div className="welcome_text">
                                <h4>About Myself</h4>
                                <p>inappropriate behavior is often laughed off as “boys will be boys,” women face higher conduct standards especially in the workplace. That’s why it’s crucial that, as women, our behavior on the job is beyond reproach. inappropriate behavior is often laughed.</p>
                                <div className="row">
                                    <NumericalAchieveMent count={10} achievement="Talks"></NumericalAchieveMent>
                                    <NumericalAchieveMent count={20} achievement="Workshops"></NumericalAchieveMent>
                                    <NumericalAchieveMent count={30} achievement="Projects"></NumericalAchieveMent>
                                    
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