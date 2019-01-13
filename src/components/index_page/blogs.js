import React, { Component } from "react";
import {StaticQuery} from "gatsby";
import { graphql } from 'gatsby';

const mediumCDNUrl = `https://cdn-images-1.medium.com/`
const mediumBlogUrl = `https://medium.com/@bhavaniravi`

class BlogCategoriesTab extends Component{
    render(){
        return(
            <li className="active" data-filter="*"><a href="#">{this.props.title}</a></li>
        )
    }
}

class BlogBox extends Component{
    render(){
        return(
            <div className="col-lg-6 col-md-6 col-sm-6 brand manipul design print">
                <div className="h_gallery_item">
                    <div className="g_img_item">
                        <img className="img-fluid"
                             src={`${mediumCDNUrl}/${this.props.post.node.virtuals.previewImage.imageId}`} 
                             alt="">
                        </img>
                        <a  className="light" 
                            href={`${mediumBlogUrl}/${this.props.post.node.uniqueSlug}`}>
                            <img src="img/gallery/icon.png" alt=""/>
                        </a>
                    </div>
                    <div className="g_item_text">
                        <h4>{this.props.post.node.title}</h4>
                        <p>{this.props.post.node.virtuals.subtitle}</p>
                    </div>
                </div>
        	</div>

        )
    }
}

class BlogArea extends Component{
    render(){
        const posts = this.props.data
        return(
            <section className="home_gallery_area p_120">
        	<div className="container">
        		<div className="main_title">
        			<h2>Blogs</h2>
        			<p>Everything I know and not know about Technologies</p>
        		</div>
        		{/* <div className="isotope_fillter">
        			<ul className="gallery_filter list">
                        <BlogCategoriesTab data-filter="*" title="All"></BlogCategoriesTab>
                        <BlogCategoriesTab data-filter=".tech" title="Technologies"></BlogCategoriesTab>
                        <BlogCategoriesTab data-filter=".poetry" title="Poetry"></BlogCategoriesTab>
					</ul>
        		</div> */}
        	</div>
        	<div className="container">
        		<div className="gallery_f_inner row imageGallery1">
                {posts.map(post_data => (
                    <BlogBox post={post_data}></BlogBox>
                ))}
        		</div>
        		<div className="more_btn">
        			<a className="main_btn" href="blogs">View All</a>
        		</div>
        	</div>
        </section>
        )
    }
}



// export const pageQuery = graphql`
//   query {
//     allMediumPost(limit: 5, sort: { fields: [createdAt], order: DESC }) {
//       edges {
//         node {
//           id
//           title
//           author {
//             name
//           }
//           virtuals {
//             previewImage {
//               imageId
//             }
//           }
//         }
//       }
//     }
//   }
// `

export default ({ props }) => (
	<StaticQuery
	  query={graphql`
      query {
        allMediumPost(limit: 2, sort: { fields: [createdAt], order: DESC }) {
          edges {
            node {
              id
              title
              uniqueSlug
              author {
                name
              }
              virtuals {
                previewImage {
                  imageId
                }
                subtitle
                totalClapCount
              }
            }
          }
        }
      }
    `
  }
	  render={({ allMediumPost }) => <BlogArea data={allMediumPost.edges} {...props} />}
	/>
  );