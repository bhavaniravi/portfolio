import React from "react";
import SectionTitle from "../section_title";
import Layout from "../layout";
import SEO from "../seo"
import {
  Badge,
  Nav,
  NavItem,
  TabPane,
  TabContent,
  NavLink,

} from "reactstrap";
import classnames from 'classnames';

import "../../css/medium_blog.css";

if (typeof window !== `undefined`) {
  window.postsToShow = 10;
}

export class ProjectBox extends React.Component {
  render() {
    let frontmatter = this.props.project.frontmatter;
    let excerpt = this.props.project.excerpt;
    var tags_badge = "";
    var client = "";
    var all_tags = "";

    if (frontmatter.tech) {
      tags_badge = frontmatter.tech.map((tech) => (
        <Badge color="info" style={{ marginRight: "2px" }} key={tech}>
          {tech}
        </Badge>
      ));
      all_tags = (
        <p style={{ color: "#222222", marginBottom: "20px" }}>
          <b>Tech Stack</b> :: <span> </span>
          {tags_badge}
        </p>
      );
    }
    if (frontmatter.client) {
      client = (
        <p style={{ color: "#222222", marginBottom: "10px" }}>
          <b>Client</b> :: {frontmatter.client}
        </p>
      );
    }

    return (
      <div className={this.props.layout}>
        <div
          className="feature_item talk_item"
          style={{
            backgroundColor: "rgb(243 243 243)",
            padding: "40px 25px",
          }}
        >
          <div className="row feature_title">
            <h4 className="col-sm-12">{frontmatter.title}</h4>
          </div>
          <p style={{ color: "#222222", marginBottom: "20px" }}>
            {frontmatter.description || excerpt}
          </p>
          {client}
          {all_tags}

          <button>Read More</button>
        </div>
      </div>
    );
  }
}

function project_post(props) {
  props.node.skills = [];
  return (
    <a
      key={props.node.slug}
      href={
        "/" + props.node.fields.sourceName + "/" + props.node.frontmatter.slug
      }
    >
      <ProjectBox project={props.node} layout="col-lg-12 col-md-12" />
    </a>
  );
}

export default class ProjectIndex extends React.Component {
  constructor(props) {
    let postsToShow = 10;
    if (typeof window !== `undefined`) {
      postsToShow = window.postsToShow;
    }
    let currentActiveTab = '1'

    const isBrowser = () => typeof window !== "undefined"
    if (isBrowser()) {
        var path = window.location.href.split("#")[1];
    }
    if (path && path == "opensource") { 
        currentActiveTab = '2'
    }
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      "showingMore": true,
      "postsToShow": postsToShow,
      "currentActiveTab": currentActiveTab,
    };
  }

  // Toggle active state for Tab
  toggleTab(tab) {  
    this.setState({
      "currentActiveTab": tab,
    });
  }

  update() {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight);
    if (this.state.showingMore && distanceToBottom < 100) {
      this.setState({ postsToShow: this.state.postsToShow + 6 });
    }
    this.ticking = false;
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => this.update());
    }
  };

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll);
    this.toggleTab(this.state.currentActiveTab)
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll);
    window.postsToShow = this.state.postsToShow;
  }

  render() {
    const { data } = this.props;
    const posts = data.allMarkdownRemark.group;
    return (
      <Layout navFixed={true}>
        <SEO
              title="Project Archive - Bhavani Ravi"
              subtitle="The source of my Tech Experience"
              description="All my projects are built with Python backend and React frontend. I deploy my applications in cloud."
              previewImgUrl=""
              isexternal={false}
        />
        <div className="list_container med_blog_list_container talk_list_container">
          <SectionTitle
            title={this.props.title}
            sub_title={this.props.sub_title}
          ></SectionTitle>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.currentActiveTab === '2' }) }
                onClick={() => {
                  this.toggleTab('2');
                }}
              >
                Production
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.currentActiveTab === '1' })}
                onClick={() => {
                  this.toggleTab('1');
                }}
              >
                Open Source
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.currentActiveTab}>
            <TabPane tabId="2" key="production">
              {posts[1].edges
                .slice(0, this.state.postsToShow)
                .map((post_data) => project_post(post_data))}
            </TabPane>
            <TabPane tabId="1" key="opensource">
              {posts[0].edges
                .slice(0, this.state.postsToShow)
                .map((post_data) => project_post(post_data))}
            </TabPane>
          </TabContent>
        </div>
      </Layout>
    );
  }
}
