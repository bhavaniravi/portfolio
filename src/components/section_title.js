import React, { Component } from "react";

export default class SectionTitle extends Component{
    render(){
        return(
            <div className="container">
        		<div className="main_title">
        			<h2>{this.props.title}</h2>
        			<h3>{this.props.sub_title}</h3>
        		</div>
        	</div>
        )
    }
}