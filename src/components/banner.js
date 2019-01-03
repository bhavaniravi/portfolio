import React from "react"

export default class Banner extends React.Component{
    render(){
        return (
            <section className="home_banner_area">
           	<div className="container box_1620">
           		<div className="banner_inner d-flex align-items-center">
					<div className="banner_content">
						<div className="media">
							<div className="d-flex">
								<img src="img/pp.jpeg" alt=""/>
							</div>
							<div className="media-body">
								<div className="personal_text">
									<h6>Hello Everybody, i am</h6>
                                    <h3>{this.props.title}</h3>
                                    <h4>{this.props.tagline}</h4>
                                    <p>{this.props.about_me}</p>
									<ul className="list personal_social">
										<li><a href="#"><i className="fa fa-facebook"></i></a></li>
										<li><a href="#"><i className="fa fa-twitter"></i></a></li>
										<li><a href="#"><i className="fa fa-linkedin"></i></a></li>
										<li><a href="#"><i className="fa fa-github"></i></a></li>
										<li><a href="#"><i className="fa fa-stack-overflow"></i></a></li>
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
