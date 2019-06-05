import React, { Component } from "react";
import {Badge} from "reactstrap";
import {StaticQuery} from "gatsby";
import { graphql } from 'gatsby';
import SectionTitle from "../section_title";

class TalkBox extends Component{
    render(){
        return(
            <div className="col-lg-4 col-md-6">
                <div className="feature_item" style={{
                backgroundColor:"#f9f9ff"
            }}>
                    <div className="row feature_title">
                        {/* <i className={`fa col-sm-2 ${this.props.talk.icon_path}`}></i> */}
                        <h4 className="col-sm-12">{this.props.talk.name}</h4>
                    </div>
                    <p>{this.props.talk.description}</p>
                    <br/>
                    {this.props.talk.skills.map(skill => (
                        <Badge color="secondary" style={{
                            marginRight:"5px",
                            fontSize: "90%",
                            color: "#222",
                            backgroundColor:"#e8e8e8"
                        }}>{skill}</Badge>
                    ))}
                    <div>
                        <div style={{marginTop:"20px"}}>
                            {this.props.talk.location}
                        </div>
                        <div>
                            {this.props.talk.date}
                        </div>
                    </div>
                </div>
        	</div>
        )
    }
}

class TalksArea extends Component{
    render(){
        const talks = this.props.talks
        return(
            <section className="feature_area p_120" id="talks" style={{
                backgroundColor:"white"
            }}>
            <SectionTitle title="Talks" 
            sub_title="Learning multiplies when you share what you know."></SectionTitle>
        	<div className="container">
        		<div className="feature_inner row">
               
                {talks.map(talk_data => (
                    <TalkBox talk={talk_data}></TalkBox>
                ))}
        		</div>
        		{/* <div className="more_btn">
        			<a className="main_btn" href="blogs">View All</a>
        		</div> */}
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
			  talks{
                  name
                  description
                  icon_path
                  location
                  date
                  skills
              }
			}
		  }
		}
	  `
  }
	  render={({ site }) => <TalksArea {...site.siteMetadata} {...props} />}
	/>
  );