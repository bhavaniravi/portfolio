import React, { Component } from "react";

export default class SectionTitle extends Component{
    render(){
        return(
            <div className="container">
        		<div className="main_title">
        			<h1>{this.props.title}</h1>
        			<h2>{this.props.sub_title}</h2>
        		</div>
        	</div>
        )
    }
}