import {StaticQuery} from "gatsby"
import React, { Component } from "react";

const mediumCDNUrl = `https://cdn-images-1.medium.com/max/150/`
const mediumBlogUrl = `https://medium.com/@bhavaniravi`

class Article extends Component{
    render(){
        console.log(this.props.post)
        return (
            <article class="row blog_item">
            <div class="col-md-3">
                <div class="blog_info text-right">
                     <div class="post_tag">
                     {this.props.post.node.virtuals.tags.slice(0, 3).map(tag => (
                        <a href="#">{tag.name}, </a>
                    ))}
                     </div>
                     <ul class="blog_meta list">
                         <li><a href="#">{this.props.post.node.author.name}<i class="lnr lnr-user"></i></a></li>
                         <li><a href="#">{this.props.post.node.createdAt}<i class="lnr lnr-calendar-full"></i></a></li>
                         <li><a href="#">{this.props.post.node.virtuals.totalClapCount}<i class="lnr lnr-thumbs-up"></i></a></li>
                         <li><a href="#">{this.props.post.node.virtuals.responsesCreatedCount}<i class="lnr lnr-bubble"></i></a></li>
                     </ul>
                 </div>
            </div>
             <div class="col-md-9">
                 <div class="blog_post">
                     <img src={`${mediumCDNUrl}/${this.props.post.node.virtuals.previewImage.imageId}`} alt=""/>
                     <div class="blog_details">
                         <a href={`${mediumBlogUrl}/${this.props.post.node.uniqueSlug}`}
                            target="_blank" >
                            <h2>{this.props.post.node.title}</h2></a>
                         <p>{this.props.post.node.virtuals.subtitle}</p>
                         <a href={`${mediumBlogUrl}/${this.props.post.node.uniqueSlug}`} 
                            target="_blank" 
                            class="white_bg_btn">Read Blog</a>
                     </div>
                 </div>
             </div>
         </article>
        )
    }
}

class BlogPageList extends Component{
    render(){
        const posts = this.props.data
        console.log(posts)
        return (
            <div>
                {posts.map(post_data => (
                    <Article post={post_data}></Article>
                ))}
            </div>
        )
    }
}

export default ({ props }) => (
	<StaticQuery
	  query={graphql`
      query {
        allMediumPost(filter: {type:{eq:"Post"}}, sort: { fields: [createdAt], order: DESC }) {
          edges {
            node{
              id
              uniqueSlug
              title
              virtuals {
                  previewImage {
                        imageId
                        originalWidth
                        originalHeight
                  }
                totalClapCount
                subtitle
                tags {
                  name
                }
                responsesCreatedCount
              }
                  createdAt
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