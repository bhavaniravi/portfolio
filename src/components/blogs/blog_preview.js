import React, { Component } from "react";
import ProfileImage from "../image_components/profile_img_in_blog_preview"


const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };


export class InBuiltBlogPost extends Component{
    render(){
        const blog_url = `/blog/` + this.props.post.frontmatter.slug + "/"
        let referer = "no-referrer noopener"
        if (!this.props.post.frontmatter.isexternal){
            referer = "origin"
        }
        return (
            <div className="med_post">
                <div className="med_dummy_div_iniside_post">
                    <div className="med_writer_flex">
                        <div>
                        <a href={`${blog_url}`}>
                            <ProfileImage className="med_profile_pic"></ProfileImage>
                        </a>
                        </div>
                        <div className="med_blog_info_div">
                            <span className="med_blog_info med_author_in_pub">
                                <div>
                                    <a href={`${blog_url}`}>Bhavani Ravi</a>
                                </div>
                            </span>
                            <span className="med_blog_info med_date_read_time">
                            <div style={{fontSize: "12px", fontColor:"#222222"}}
                                ><a>{new Date(this.props.post.frontmatter.published_date).toLocaleDateString('en-US', DATE_OPTIONS)}
                                </a> . {this.props.post.timeToRead} mins
                            </div></span>
                        </div>
                    </div>
                    <a href={`${blog_url}`}>
                        <div>
                            <section className="med_preview_section">
                                <div className="img_container" >
                                    <div className="padding_div">
                                        <img alt="" 
                                        src={`${this.props.post.frontmatter.featuredImgPath}`} 
                                        rel={referer}
                                        className="med_preview_img"/>
                                    </div>
                                </div>
                                <h1 className="med_title">{this.props.post.frontmatter.title}</h1>
                                <h2 className="med_subtitle">{this.props.post.frontmatter.subtitle}</h2>
                            </section>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}