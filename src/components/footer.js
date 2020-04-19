import React, { Component } from "react"
import { TwitterFollowButton } from 'react-twitter-embed'
import addToMailchimp from 'gatsby-plugin-mailchimp'

// class SocialLink extends Component{
//     render(){
//         return(
//             <li>
//                 <a target="_blank" 
//                 rel="noopener noreferrer" 
//                 href={this.props.social_url}>
//                 <i className={`fa ${this.props.social_icon_class}`}></i></a></li>
//         )
//     }
// }


class Social extends Component {
    render() {
        return (
            <div className="col-lg-2">
                <aside className="f_widget social_widget">
                    <div className="f_title">
                        <h3>Follow Me</h3>
                    </div>
                    <p>Let us be social</p>
                    <ul className="list">
                        <TwitterFollowButton screenName={'geeky_bhavani'} />
                    </ul>
                </aside>
            </div>
        )
    }
}

export class NewsLetter extends Component {
    constructor(props) {
        // props.placeholder = "Email Address" 
        super(props);
        this.state = {
            "placeholder": "Email Address",
            "email": "",
            "submit_message": ""
        }
    }

    _handleEmailChange = e => {
        this.setState({ email: e.target.value })
    }

    _on_blur = (e) => {
        this.setState({
            placeholder: "Email Address"
        });
    }

    _on_focus = (e) => {
        this.setState({
            placeholder: ""
        });

    }

    // 2. via `async/await`
    _handleSubmit = async (e) => {
        e.preventDefault();
        const result = await addToMailchimp(this.state.email)
        this.setState({ "submit_message": result.msg })
        // I recommend setting `result` to React state
        // but you can do whatever you want
    }

    render() {
        return (
            <div id="mc_embed_signup" style={this.props.style}>
                <form onSubmit={this._handleSubmit} method="POST" className="subscribe_form relative">
                    <div className="input-group d-flex flex-row">
                        <input type="hidden" name="u" value="d20357716d3689cee26657b8a" />
                        <input type="hidden" name="id" value="189cad7f10"></input>
                        <input name="email" id="email" araia-label="Email"
                            placeholder={this.state.placeholder}
                            onFocus={this._on_focus}
                            onBlur={this._on_blur}
                            onChange={this._handleEmailChange}
                            required="" type="email" />
                        <button className="btn sub-btn" aria-label="SignUp">
                            <span className="lnr lnr-arrow-right">
                            </span>
                        </button>
                    </div>
                    <div className="mt-10" dangerouslySetInnerHTML={{ __html: this.state.submit_message }} />
                </form>
            </div>
        )
    }
}

export default class FooterArea extends Component {
    render() {
        return (
            <footer className="footer_area p_120">
                <div className="container">
                    <div className="row footer_inner">
                        <div className="col-lg-5 col-sm-6 news_widget" style={this.props.style}>
                            <div className="f_title">
                                <h3>Newsletter</h3>
                            </div>
                            <p>Stay updated with my recent blogs</p>
                            <NewsLetter></NewsLetter>
                        </div>


                        <Social></Social>
                        <div className="col-lg-5 col-sm-6" style={{ "paddingLeft": "15%" }}>
                            <p style={{ fontSize: "16px" }}>
                                Copyright &copy; {new Date().getFullYear()} &nbsp;All rights reserved &nbsp;
                                <a style={{ fontSize: "16px" }} href="twitter.com/geeky_bhavani">@geeky_bhavani</a>

                            </p>
                        </div>
                    </div>

                </div >
            </footer >
        )
    }

}