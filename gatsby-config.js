module.exports = {
    siteMetadata: {
        "title":"Bhavani Ravi",
        "about_me": "🔸 Building @kissflow at @orangescape \n 🔸 Code - Speak - Write \n 🔸 Python - Chatbots - ML \n 🔸  womenintech  🔸",
        "tagline": "The Geekette"
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