
function create_pages(graphql, actions, sourceName) {
  var blog_query = `
{
  allMarkdownRemark(sort: {fields: [frontmatter___published_date], order: DESC}, 
    limit: 100, 
    filter: {fields: {sourceName: {eq: "${sourceName}"}}, 
      frontmatter: {draft: {eq: false}}}) {
    edges {
      node {
        fields {
          slug
          sourceName
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
  const { createPage } = actions

  const BlogPost = path.resolve(`./src/components/blogs/blog_page.js`)
  return graphql(blog_query).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
      createPage({
        path: "/" + post.node.fields.sourceName + "/" + post.node.frontmatter.slug + "/",
        component: BlogPost,
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

exports.createPages = ({ graphql, actions }) => {
  create_pages(graphql, actions, "blog")
  // create_pages(graphql, actions, "talks")
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
