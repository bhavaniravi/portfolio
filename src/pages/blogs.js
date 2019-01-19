import React from "react"
import Layout from "../components/layout"
import BlogPageList from "../components/blog_page"

export default () => (
    <Layout navFixed={true}>
        <BlogPageList></BlogPageList>
    </Layout>
  )