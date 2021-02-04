/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title, previewImgUrl, isexternal }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            url
            title
            description
            author
            previewImgUrl
          }
        }
      }
    `
  )
  let siteUrl = site.siteMetadata.url
  let featureImg = isexternal ? previewImgUrl : `${siteUrl}${previewImgUrl}`
  
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`${title}`}
      meta={[
        {
          name: `title`,
          content: title,
        },
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:site_name`,
          content: title,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:updatedtime`,
          content: new Date().getTime(),
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `article`,
        },
        {
          property: `og:image:width`,
          content: 300,
        },
        {
          property: `og:image:height`,
          content: 200,
        },
        {
          property: `og:image`,
          content: featureImg,
        },
        {
          property: `og:image:secure_url`,
          content: featureImg,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: "@BhavaniRavi_",
        },
        {
          name: `twitter:site`,
          content: "@BhavaniRavi_",
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
        {
          name: `twitter:image`,
          content: featureImg,
        },
        {
          name: `twitter:image:src`,
          content: featureImg,
        },
        {
          name: `twitter:image:alt`,
          content: title,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO