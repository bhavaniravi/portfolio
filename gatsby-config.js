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
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
              trackingId: "UA-79887847-2",
            },
        },
        {
            resolve: 'gatsby-plugin-mailchimp',
            options: {
              endpoint: "https://bhavaniravi.us19.list-manage.com/subscribe/post?u=d20357716d3689cee26657b8a&amp;id=189cad7f10"
            },
        },
   
    ]
}