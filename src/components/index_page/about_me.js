import React from "react"
import { graphql, StaticQuery } from "gatsby"


class SocialIcon extends React.Component{
	render(){
		return (
			<li><a target="_blank" href="#"><i className="fa fa-twitter"></i></a></li>
		)
	}
}

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
									{/* <h6>Hello Everybody, I'm</h6> */}
                                    <h3>{this.props.title}</h3>
                                    <h4>{this.props.tagline}</h4>
																		<p><a href="https://twitter.com/geeky_bhavani?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @geeky_bhavani</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p>
									<ul className="list personal_social">
									{this.props.social_icons.map(social => (
                    <li><a target="_blank" href="#"><i className={`fa ${social.className}`}></i></a></li>
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
	
