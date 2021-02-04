import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { TwitterFollowButton } from 'react-twitter-embed'
import HomeImage from "../image_components/profile_img_in_home"
import { socialComponents } from "../utils"


class Banner extends React.Component {
	render() {
		return (
			<section id="home_banner_area" className="home_banner_area">
				<div className="container box_1620">
					<div className="banner_inner d-flex align-items-center">
						<div className="banner_content">
							<div className="media">
								<div className="d-flex">
									<HomeImage></HomeImage>
								</div>
								<div className="media-body">
									<div className="personal_text">
										<h3>Hi, I'm {this.props.title} 👋</h3>
										<h4>{this.props.tagline}</h4>
										{/* <TwitterFollowButton screenName={'BhavaniRavi_'} /> */}

										<ul className="list personal_social">
											{socialComponents(this.props.social_icons)}
										</ul>
									</div>
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

