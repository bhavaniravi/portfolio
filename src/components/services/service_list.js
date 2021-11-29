import React from "react"
import SectionTitle from "../section_title"
import Layout from "../layout"

import "../../css/medium_blog.css"

if (typeof window !== `undefined`) {
    window.postsToShow = 10
}

export class ProjectBox extends React.Component {
    render() {
        let frontmatter = this.props.project.frontmatter
        let content = this.props.project.html
        return (
            <div className={this.props.layout} id={this.props.project.frontmatter.title.toLowerCase()}>
                <div className="feature_item talk_item" style={{
                    backgroundColor: "rgb(243 243 243)",
                    padding: "40px 25px"
                }}>
                    <div className="row feature_title">
                        <h1 className="col-sm-12">{frontmatter.title}</h1>          
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>
        )
    }
}

function project_post(props) {
    return (
        // <a href={"/"+ props.node.fields.sourceName + "/" + props.node.frontmatter.slug}>
        <ProjectBox key={props.node.slug} project={props.node} layout="col-lg-12 col-md-12" />
        
    )
}

export default class ProjectIndex extends React.Component {
    constructor(props) {
        super(props)
        let postsToShow = 10
        if (typeof window !== `undefined`) {

            postsToShow = window.postsToShow
        }

        this.state = {
            showingMore: true,
            postsToShow,
        }
    }

    update() {
        const distanceToBottom =
            document.documentElement.offsetHeight -
            (window.scrollY + window.innerHeight)
        if (this.state.showingMore && distanceToBottom < 100) {
            this.setState({ postsToShow: this.state.postsToShow + 6 })
        }
        this.ticking = false
    }

    handleScroll = () => {
        if (!this.ticking) {
            this.ticking = true
            requestAnimationFrame(() => this.update())
        }
    }

    componentDidMount() {
        window.addEventListener(`scroll`, this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener(`scroll`, this.handleScroll)
        window.postsToShow = this.state.postsToShow
    }

    render() {
        const { data } = this.props
        const posts = data.allMarkdownRemark.edges
        return (
            <Layout navFixed={true}>
                <div className="list_container med_blog_list_container talk_list_container">
                    <SectionTitle title={this.props.title} sub_title={this.props.sub_title}></SectionTitle>
                    {posts.slice(0, this.state.postsToShow).map(post_data => (
                        project_post(post_data)
                    ))}
                </div>
            </Layout>
        )
    }
}

