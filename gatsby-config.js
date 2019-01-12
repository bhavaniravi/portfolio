module.exports = {
    // pathPrefix: `/portfolio2018`,
    siteMetadata: {
        "title":"Bhavani Ravi",
        "about_me": "🔸 Building @kissflow at @orangescape \n 🔸 Code - Speak - Write \n 🔸 Python - Chatbots - ML \n 🔸  womenintech  🔸",
        "tagline": "Backend Engineer with Crazy Passion for Products"
      },
    plugins: [
        {
            resolve: `gatsby-source-medium`,
            options: {
              username: `@bhavaniravi`,
              limit: 200,
            },
        }
    ]
}