import React, {Component} from "react"

class SocialLink extends Component{
    render(){
        return(
            <li>
                <a target="_blank" 
                rel="noopener noreferrer" 
                href={this.props.social_url}>
                <i className={`fa ${this.props.social_icon_class}`}></i></a></li>
        )
    }
}


class Social extends Component{
    render(){
        return(
            <div className="col-lg-2">
                <aside className="f_widget social_widget">
                    <div className="f_title">
                        <h3>Follow Me</h3>
                    </div>
                    <p>Let us be social</p>
                    <ul className="list">
                        <SocialLink social_icon_class="fa-facebook" social_url="#"></SocialLink>
                        <SocialLink social_icon_class="fa-twitter" social_url="#"></SocialLink>
                    </ul>
                </aside>
            </div>
        )
    }
}

class NewsLetter extends Component{
    constructor(props){
        // props.placeholder = "Email Address" 
        super(props);
        this.state = {"placeholder": "Email Address"}
    }

    _on_blur = (e) => {
        this.setState({
            placeholder: "Email Address"
        });
    }

    _on_focus = (e) =>{
        this.setState({
            placeholder: ""
        });

    }

    render(){
        console.log(this.state.placeholder)
        return (
            <div className="col-lg-5 col-sm-6">
                <aside className="f_widget news_widget">
                    <div className="f_title">
                        <h3>Newsletter</h3>
                    </div>
                    <p>Stay updated with my recent blogs</p>
                    <div id="mc_embed_signup">
                        <form target="_blank" action="#mail_chimp_url_goes_here" method="get" className="subscribe_form relative">
                            <div className="input-group d-flex flex-row">
                                <input name="EMAIL" 
                                placeholder={this.state.placeholder} 
                                onFocus={this._on_focus}
                                onBlur={this._on_blur}
                                required="" type="email"/>
                                <button className="btn sub-btn"><span className="lnr lnr-arrow-right"></span></button>		
                            </div>				
                            <div className="mt-10 info"></div>
                        </form>
                    </div>
                </aside>
            </div>
        )
    }
}

export default class FooterArea extends Component{
    render(){
        return(
            <footer className="footer_area p_120">
        	<div className="container">
        		<div className="row footer_inner">
        			{/* <div className="col-lg-5 col-sm-6">
        				<aside className="f_widget ab_widget">
        					<div className="f_title">
        						<h3>About Me</h3>
        					</div>
        					<p>Do you want to be even more successful? Learn to love learning and growth. The more effort you put into improving your skills,</p>
        					<p><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p>
        				</aside>
        			</div> */}
        			<NewsLetter></NewsLetter>
        			<Social></Social>
        		</div>
        	</div>
        </footer>
        )
    }
}