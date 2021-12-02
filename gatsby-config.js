module.exports = {
  // pathPrefix: `/portfolio2018`,
  siteMetadata: {
    "title": "Bhavani Ravi",
    "author": "Bhavani Ravi",
    "about_me": ` `,
    twitterHandle: "@BhavaniRavi_",
    social: {
      twitter: `BhavaniRavi_`,
    },
    "previewImgUrl": "img/pp1.png",
    "tagline": `Independent Software Engineer, Instructor, Tech Blogger & Speaker`,
    "description": "A sneak peak into my head",
    "twitterHandle": '@BhavaniRavi_',
    url: 'https://bhavaniravi.com',
    siteUrl: 'https://bhavaniravi.com',

    "social_icons": [
      {
        "name": "Twitter",
        "className": "fa-twitter",
        "url": "https://twitter.com/BhavaniRavi_"
      },
      {
        "name": "LinkedIn",
        "className": "fa-linkedin",
        "url": "https://linkedin.com/in/bhavanir"
      },
      {
        "name": "Youtube",
        "className": "fa-youtube",
        "url": "https://youtube.com/bhavaniravi"
      },

      {
        "name": "Medium",
        "className": "fa-medium",
        "url": "https://medium.com/@bhavaniravi"
      },
      {
        "name": "Github",
        "className": "fa-github",
        "url": "https://github.com/bhavaniravi"
      },
      {
        "name": "RSS",
        "className": "fa-rss",
        "url": "https://bhavaniravi.com/rss.xml"
      }
    ],
  },
  plugins: [
    `gatsby-plugin-mdx`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: ['https://twitter.com', 'https://google.com',
          "https://marketingplatform.google.com/",
          "https://www.google-analytics.com/",
          "https://platform.twitter.com/",
          "https://cdn.syndication.twimg.com/"],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/blogs/`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/services/`,
        name: `services`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/opensource/`,
        name: `opensource`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/products/`,
        name: `products`,
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/talks/`,
        name: `talks`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/projects/`,
        name: `projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/media/`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/img/`,
        name: `images`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-sass`,
    // },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-79887847-2",
        defer: true,
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: "https://bhavaniravi.us19.list-manage.com/subscribe/post?u=d20357716d3689cee26657b8a&amp;id=189cad7f10",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        plugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              theme: "vscode",
            }
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
            }
          },
          {
            resolve: "@weknow/gatsby-remark-twitter",
            options: {
              debug: true,
              align: 'center',
              hideMedia: false,
            }
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
                {
                  site {
                    siteMetadata {
                      title
                      description
                      siteUrl
                      site_url: siteUrl
                    }
                  }
                }
              `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.published_date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___published_date] },
                limit: 100,
                filter:{fields: {sourceName: {eq: "blog"}}, 
                        frontmatter: {draft: {eq: false}}})
              {       
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      description
                      subtitle
                      tags
                      published_date
                    }
                  }
                }
              }
              }
                  `,
            output: "/rss.xml",
            title: "Bhavani Ravi's Blog Feed",
          },
        ],
      },
    },
    // `gatsby-remark-copy-linked-files`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-sitemap",
    'gatsby-plugin-robots-txt',
    "gatsby-plugin-react-helmet",
    `gatsby-transformer-sharp`,
    `gatsby-remark-source-name`,
  ]
}
