const _ = require("lodash")

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
            { loader: require.resolve('style-loader') },
            { loader: require.resolve('css-loader') }
          ],
        },
      ],
    },
  })
}

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const tagTemplate = path.resolve("src/components/blogs/tags.js")

function create_pages(graphql, actions, sourceName) {
  var blog_query = `
  {
    allMarkdownRemark(
      sort: { fields: [frontmatter___published_date], order: DESC }
      limit: 100
      filter: {
        fields: { sourceName: { eq: "${sourceName}" } }
        frontmatter: { draft: { eq: false } }
      }
    ) {
      edges {
        node {
          fields {
            slug
            sourceName
          }
          frontmatter {
            title
            slug
            tags
          }
        }
      }
    }
    tagsGroup: allMarkdownRemark(
      limit: 2000,
      filter:{frontmatter:{draft:{eq: false},
                           published_date:{gt: "2019-06-04"}        
                          }
              fields: { sourceName: { eq: "${sourceName}" } }
              },
      sort: { fields: [frontmatter___published_date], order: DESC }
      ) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
  
`
  const { createPage } = actions
  return graphql(blog_query).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    
      posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node
        var blogPage = path.resolve(`./src/components/blogs/blog_page.js`)
        if (post.node.fields.sourceName === "projects") {
            var blogPage = path.resolve(`./src/components/projects/project_page.js`)
        } 
        createPage({
          path: "/" + post.node.fields.sourceName + "/" + post.node.frontmatter.slug + "/",
          component: blogPage,
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
          },
        })
      })

    if (sourceName == "blog") {
    // Extract tag data from query
      const tags = result.data.tagsGroup.group
      // Make tag pages
      tags.forEach(tag => {
        createPage({
          path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
          component: tagTemplate,
          context: {
            tag: tag.fieldValue,
          },
        })
      })

    }
    return null
  })
}

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
            { loader: require.resolve('style-loader') },
            { loader: require.resolve('css-loader') }
          ],
        },
      ],
    },
  })
}


exports.createPages = ({ graphql, actions }) => {
  create_pages(graphql, actions, "projects")
  create_pages(graphql, actions, "blog")
  create_pages(graphql, actions, "talks")
  create_pages(graphql, actions, "services")
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark` || node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
