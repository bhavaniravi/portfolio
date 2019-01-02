import React,  { Component } from "react";

class TimeLineTab extends Component{
    render(){
        return (
            <li class="nav-item">
				<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">{this.props.tab_heading}</a>
			</li>
        )
    }
}

class TimeLineItem extends Component{
    render(){
        return (
            <li>
                <span></span>
                <div class="media">
                    <div class="d-flex">
                        <p>{this.props.time}</p>
                    </div>
                    <div class="media-body">
                        <h4>{this.props.title}</h4>
                        <p>{this.props.description}</p>
                    </div>
                </div>
            </li>
        )
    }
}


export default class TimeLine extends Component{
    render(){
        return (
        <section class="mytabs_area p_120">
        	<div class="container">
        		<div class="tabs_inner">
					<ul class="nav nav-tabs" id="myTab" role="tablist">
						<TimeLineTab tab_heading="Experience"></TimeLineTab>
                        <TimeLineTab tab_heading="Education"></TimeLineTab>
					</ul>
					<div class="tab-content" id="myTabContent">
						<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
							<ul class="list">
                                <TimeLineItem time={"May 2018 to Present"} title={"Software Engineer @ Orangescape"}></TimeLineItem>
                                <TimeLineItem time={"May 2018 to Present"} title={"Software Engineer @ Orangescape"}></TimeLineItem>
                                <TimeLineItem time={"May 2018 to Present"} title={"Software Engineer @ Orangescape"}></TimeLineItem>
							</ul>
						</div>
						<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
							<ul class="list">
                                <TimeLineItem time={"May 2018 to Present"} title={"Software Engineer @ Orangescape"}></TimeLineItem>
                                <TimeLineItem time={"May 2018 to Present"} title={"Software Engineer @ Orangescape"}></TimeLineItem>
                                <TimeLineItem time={"May 2018 to Present"} title={"Software Engineer @ Orangescape"}></TimeLineItem>
							</ul>
						</div>
					</div>
        		</div>
        	</div>
        </section>
        )
    }
}