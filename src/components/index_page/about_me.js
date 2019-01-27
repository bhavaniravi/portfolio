import React from "react"
import { graphql, StaticQuery } from "gatsby"
import {TwitterFollowButton} from 'react-twitter-embed'

class Banner extends React.Component{
    render(){
        return (
          <section id="home_banner_area" className="home_banner_area">
           	<div className="container box_1620">
           		<div className="banner_inner d-flex align-items-center">
					<div className="banner_content">
						<div className="media">
							<div className="d-flex">
								<img src="img/pp.jpeg" alt=""/>
							</div>
							<div className="media-body">
								<div className="personal_text">
									<h6>Who I am I?</h6>
											<h3>{this.props.title}</h3>
											<h4>{this.props.tagline}</h4>
											<TwitterFollowButton screenName={'geeky_bhavani'}/>
											
									<ul className="list personal_social">
									{this.props.social_icons.map(social => (
										<li><a target="_blank"
														rel="noopener noreferrer" 
														href={social.url}>
														<i className={`fa ${social.className}`}></i>
												{social.name}
												</a></li>
                	))}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
            </div>

        </section>
				
				)}
				
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
				social_icons{
					url
					className
				}
			}
		  }
		}
	  `
  }
	  render={({ site }) => <Banner {...site.siteMetadata} {...props} />}
	/>
	);
	
