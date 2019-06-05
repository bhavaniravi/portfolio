exports.onCreateWebpackConfig = ({
    stage,
    rules,
    loaders,
    plugins,
    actions,
  }) => {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /\.s(a|c)ss$/,
            use: [
                {loader: require.resolve('style-loader')},
                {loader: require.resolve('css-loader')}
            ],
          },
        ],
      },
    })
  }

  const path = require(`path`)
  const { createFilePath } = require(`gatsby-source-filesystem`)
  
  exports.createPages = ({ graphql, actions }) => {

    const { createPage } = actions
  
    const blogPost = path.resolve(`./src/components/blogs/blog_page.js`)
    return graphql(
      `
        {
          allMarkdownRemark(
            sort: { fields: [frontmatter___published_date], order: DESC }
            limit: 1000
            filter:{frontmatter:{draft:{eq: false},
                                 published_date:{gt: "2019-06-04"}        
                                }
                    }
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  slug
                }
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        throw result.errors
      }
  
      // Create blog posts pages.
      const posts = result.data.allMarkdownRemark.edges
  
      posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node
        createPage({
          path: "/blog/" + post.node.frontmatter.slug,
          component: blogPost,
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
          },
        })
      })
  
      return null
    })
  }
  
  exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
      const value = createFilePath({ node, getNode })
      createNodeField({
        name: `slug`,
        node,
        value,
      })
    }
  }
  