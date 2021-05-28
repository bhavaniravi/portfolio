import React from "react"
import Layout from "../components/layout"
import Helmet from "react-helmet"

import "../css/bootstrap.min.css" 

export default () => (
    <Layout navFixed={true}>
        <Helmet>
            <script rel="preload" src="https://gumroad.com/js/gumroad-embed.js" as="script"></script>
        </Helmet>
        <div class="article_div gumroad-product-embed" 
        style={{ "marginTop": "130px", "marginBottom": "100px" }} data-outbound-embed="true">
            <a href="https://gumroad.com/l/LaFSj">
                Hold on... This is gonna take a moment...</a>
        </div>
    </Layout>
)