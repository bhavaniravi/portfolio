import React from "react"
import Layout from "../components/layout"
import Helmet from "react-helmet"

import "../css/bootstrap.min.css" 

export default () => (
    <Layout navFixed={true}>
        <Helmet>
            <script src="https://gumroad.com/js/gumroad-embed.js"></script>
        </Helmet>
        <div class="container gumroad-product-embed" data-outbound-embed="true">
            <a href="https://gumroad.com/l/LaFSj">Loading...</a>
        </div>
    </Layout>
)