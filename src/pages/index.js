import React from "react"
import Layout from "../components/layout"

import 'bootstrap/dist/css/bootstrap.min.css';

import Banner from "../components/index_page/about_me"
import WelcomeArea from "../components/index_page/welcome_area"
import TimeLine from "../components/index_page/timeline";
import BlogArea from "../components/index_page/blogs";

export default () => (
  <Layout>
      <Banner/>
      <WelcomeArea></WelcomeArea>
      <TimeLine></TimeLine>
      {/* <BlogArea></BlogArea> */}
  </Layout>
)