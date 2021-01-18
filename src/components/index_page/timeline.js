import React,  { Component } from "react";
import {TabContent, TabPane} from "reactstrap";
import {StaticQuery} from "gatsby";
import { graphql } from 'gatsby';
import SectionTitle from "../section_title"

// class TimeLineTab extends Component{
//     render(){
//         return (
//             <li className="nav-item">
// 				<a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">{this.props.tab_heading}</a>
// 			</li>
//         )
//     }
// }

class TimeLineItem extends Component{
    render(){
        return (
            <li>
                <span></span>
                <div className="media">
                    <div className="d-flex">
                        <p>{this.props.time}</p>
                    </div>
                    <div className="media-body">
                        <h4>{this.props.title}</h4>
                        <p>{this.props.description}</p>
                    </div>
                </div>
            </li>
        )
    }
}


class TimeLine extends Component{
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1'
        };
        this.toggle = this.toggle.bind(this);
      }
    
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

    render(){
        return (
        <section id="experience" className="mytabs_area p_120">
        	<div className="container">
        		<div className="tabs_inner">
                <SectionTitle title="Experience"  
                sub_title="The Path I Travelled."/>
                    {/* <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}>
                                Experience
                            </NavLink>
                        </NavItem>
                    </Nav> */}
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <ul className="list">
                                {this.props.experience.map(timeline_data => (
                                    <TimeLineItem time={timeline_data.time} title={timeline_data.title}></TimeLineItem>
                                ))}
                            </ul>
                        </TabPane>
                    </TabContent>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="2">
                            <ul className="list">
                                <TimeLineItem time={"Aug 2016 - Apr 2018"} title={"B.E CSE @ KCG College Of Technology"}></TimeLineItem> 
                            </ul>
                        </TabPane>
                    </TabContent>
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
			  experience{
                  time
                  title
              }
			}
		  }
		}
	  `
  }
	  render={({ site }) => <TimeLine {...site.siteMetadata} {...props} />}
	/>
  );