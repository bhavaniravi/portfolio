import {StaticQuery} from "gatsby"
import React, { Component } from "react";
// import styled from 'styled-components';
import { graphql } from 'gatsby';

const mediumCDNUrl = `https://miro.medium.com/fit/c/1400/420/`
const mediumBlogUrl = `https://medium.com/@bhavaniravi`


class MediumBlogPost extends Component{
    render(){
        return (
            <div className="med_post">
                <div className="med_dummy_div_iniside_post">
                    <div className="med_writer_flex">
                        <div>
                        <a target="_blank" href={mediumBlogUrl}>
                            <img src="https://miro.medium.com/fit/c/80/80/1*L26oIAuooT4cIFJeeY8c4w.jpeg" 
                            alt="" className="med_profile_pic"></img>
                        </a>
                        </div>
                        <div className="med_blog_info_div">
                            <span className="med_blog_info med_author_in_pub">
                                <div>
                                    <a target="_blank" href={mediumBlogUrl}>{this.props.post.node.author.name}</a>
                                    {/* <span> in <a href="#">Hacker Noon</a></span> */}
                                </div>
                            </span>
                            <span className="med_blog_info med_date_read_time">
                            <div><a>{this.props.post.node.latestPublishedAt}</a> . {Math.round(this.props.post.node.virtuals.readingTime)} mins</div></span>
                        </div>
                    </div>
                    <a target="_blank" href={`${mediumBlogUrl}/${this.props.post.node.uniqueSlug}`}>
                        <div>
                            <section className="med_preview_section">
                                <figure className="med_preview_img">
                                    <div className="med_preview_img_container">
                                    <div className="med_img_padding"></div>
                                    <img alt="" 
                                    src={`${mediumCDNUrl}/${this.props.post.node.virtuals.previewImage.imageId}`} 
                                    className="med_preview_img"/>
                                    </div>
                                </figure>
                                <h1 className="med_title">{this.props.post.node.title}</h1>
                                <h2 className="med_subtitle">{this.props.post.node.virtuals.subtitle}</h2>
                            </section>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}

class BlogPageList extends Component{
    render(){
        const posts = this.props.data
        return (
            <div className="med_blog_list_container">
                {posts.map(post_data => (
                    <MediumBlogPost post={post_data}></MediumBlogPost>
                ))}
            </div>
        )
    }
}

export default ({ props }) => (
	<StaticQuery
	  query={graphql`
      query {
        allMediumPost(limit:10, filter: {type:{eq:"Post"}}, sort: { fields: [latestPublishedAt], order: DESC }) {
          edges {
            node{
              id
              uniqueSlug
              title
              latestPublishedAt
              virtuals {
                totalClapCount
                subtitle
                readingTime
                responsesCreatedCount
                previewImage {
                        imageId
                }
              }
              author {
                id
                name
              }
              
            }
          }
        }
      }
    `
  }
	  render={({ allMediumPost }) => <BlogPageList data={allMediumPost.edges} {...props} />}
	/>
  );