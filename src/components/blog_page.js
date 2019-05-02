import {StaticQuery} from "gatsby"
import React, { Component } from "react";
// import styled from 'styled-components';
import {CSVDownload} from "react-csv";
import { graphql } from 'gatsby';
import SectionTitle from "./section_title";

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
                            <img src="https://miro.medium.com/fit/c/240/240/1*kdolELlJHa7S3-RJ7GMy4Q.png" 
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
                            <div><a>{this.props.post.node.createdAt}</a> . {Math.round(this.props.post.node.virtuals.readingTime)} mins</div></span>
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
                                {/* <Share
                                    socialConfig={{
                                        twitterHandle,
                                        config: {
                                            url: `${url}${slug}`,
                                            title,
                                        },
                                    }}
                                    tags={tags}
			                    /> */}
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
        console.log(posts)
        return (
            <div className="med_blog_list_container">
                <SectionTitle title="Bhavani's Blogs" sub_title="A Sneak Peak into my head"></SectionTitle>
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
        allMediumPost(limit:100, 
            filter: {type:{eq:"Post"}}, 
            sort: { fields: [createdAt], order: DESC }) {
          edges {
            node{
              id
              uniqueSlug
              title
              latestPublishedAt
              createdAt
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