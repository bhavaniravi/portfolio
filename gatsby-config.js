module.exports = {
    // pathPrefix: `/portfolio2018`,
    siteMetadata: {
        "title":"Bhavani Ravi",
        "about_me": "🔸 Building @kissflow at @orangescape \n 🔸 Code - Speak - Write \n 🔸 Python - Chatbots - ML \n 🔸  womenintech  🔸",
        "tagline": "Backend Engineer with Crazy Passion for Products",
        "social_icons":[
            {"className": "fa-twitter", "url": "https://twitter.com/geeky_bhavani"},
            {"className": "fa-medium", "url": "https://medium.com/@bhavaniravi"},
            {"className": "fa-linkedin", "url": "https://linkedin.com/bhavanir"},
            {"className": "fa-github", "url": "https://github.com/bhavaniravi"},
            {"className": "fa-stack-overflow", "url": "https://stackoverflow.com/bhavaniravi"},
        ]
      },
    plugins: [
        {
            resolve: `gatsby-source-medium`,
            options: {
              username: `@bhavaniravi`,
              limit: 200,
            },
        },
        'gatsby-plugin-sass',
        `gatsby-plugin-styled-components`
   
    ]
}