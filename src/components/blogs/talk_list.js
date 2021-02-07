import React from "react"
import SectionTitle from "../section_title"
import Layout from "../layout"
import { TalkBox } from "../index_page/talks"


import "../../css/medium_blog.css"

if (typeof window !== `undefined`) {
    window.postsToShow = 10
}

function talk_post(props) {
    props.node.skills = []
    return (
        <a href={"/"+ props.node.fields.sourceName + "/" + props.node.frontmatter.slug}>
            <TalkBox key={props.node.slug} talk={props.node} layout="col-lg-12 col-md-12" />
            {/* <div className="talk-title">{props.node.frontmatter.title}</div> */}
        </a>
    )
}

export default class TalkIndex extends React.Component {
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
                <div className="med_blog_list_container talk_list_container">
                    <SectionTitle title={this.props.title} sub_title={this.props.sub_title}></SectionTitle>
                    {posts.slice(0, this.state.postsToShow).map(post_data => (
                        talk_post(post_data)
                    ))}
                </div>
            </Layout>
        )
    }
}

