import React, { Component } from "react";
import {Badge} from "reactstrap";
import {StaticQuery} from "gatsby";
import { graphql } from 'gatsby';

class TalkBox extends Component{
    render(){
        return(
            <div className="col-lg-4 col-md-6">
                <div className="feature_item" style={{
                backgroundColor:"#f9f9ff"
            }}>
                    <div className="row feature_title">
                        <i className={`fa col-sm-2 ${this.props.talk.icon_path}`}></i>
                        <h4 className="col-sm-10"
                            style={{
                                paddingTop:"20px",
                                paddingLeft:"40px"
                            }}
                        >{this.props.talk.name}</h4>
                    </div>
                    <p>{this.props.talk.description}</p>
                    <br/>
                    {/* {this.props.talk.skills.map(skill => (
                        <Badge color="secondary" style={{
                            marginRight:"5px",
                            fontSize: "90%",
                            color: "#222",
                            backgroundColor:"#e8e8e8"
                        }}>{skill}</Badge>
                    ))} */}
                    <div>
                        <div>
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
        console.log(this.props)
        return(
            <section className="feature_area p_120" id="talks" style={{
                backgroundColor:"white"
            }}>
        	<div className="container">
        		<div className="main_title">
        			<h2>Talks</h2>
        			<p>Learning multiplies when you share what you know</p>
        		</div>
        	</div>
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
              }
			}
		  }
		}
	  `
  }
	  render={({ site }) => <TalksArea {...site.siteMetadata} {...props} />}
	/>
  );