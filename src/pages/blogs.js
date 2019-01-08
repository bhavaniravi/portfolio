import React from "react"
import Layout from "../components/layout"
import BlogPageList from "../components/blog_page"

import 'bootstrap/dist/css/bootstrap.min.css';

export default () => (
    <Layout nav_fixed={false}>
        <BlogPageList nav_fixed={true}></BlogPageList>
    </Layout>
  )