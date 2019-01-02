
import React, { Component } from "react";

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
            <div className="col-lg-4 col-md-4 col-sm-6 brand manipul design print">
                <div className="h_gallery_item">
                    <div className="g_img_item">
                        <img className="img-fluid" src="img/gallery/project-1.jpg" alt=""></img>
                        <a className="light" href="img/gallery/project-1.jpg"><img src="img/gallery/icon.png" alt=""/></a>
                    </div>
                    <div className="g_item_text">
                        <h4>3D Helmet Design</h4>
                        <p>Client Project</p>
                    </div>
                </div>
        	</div>

        )
    }
}

export default class BlogArea extends Component{
    render(){
        return(
            <section className="home_gallery_area p_120">
        	<div className="container">
        		<div className="main_title">
        			<h2>Blogs</h2>
        			<p>Everything I know and not know about Technologies</p>
        		</div>
        		<div className="isotope_fillter">
        			<ul className="gallery_filter list">
                        <BlogCategoriesTab data-filter="*" title="All"></BlogCategoriesTab>
                        <BlogCategoriesTab data-filter=".tech" title="Technologies"></BlogCategoriesTab>
                        <BlogCategoriesTab data-filter=".poetry" title="Poetry"></BlogCategoriesTab>
					</ul>
        		</div>
        	</div>
        	<div className="container">
        		<div className="gallery_f_inner row imageGallery1">
        			<BlogBox></BlogBox>
                    <BlogBox></BlogBox>
                    <BlogBox></BlogBox>
        		</div>
        		<div className="more_btn">
        			<a className="main_btn" href="#">Load More Items</a>
        		</div>
        	</div>
        </section>
        )
    }
}