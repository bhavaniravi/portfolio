module.exports = {
    // pathPrefix: `/portfolio2018`,
    siteMetadata: {
        "title":"Bhavani Ravi",
        "about_me": `🔸 Building KiSSFLOW at Orangescape 🔸\n🔸 Python - Chatbots - Machine Learning 🔸\n🔸  Lead - Google WomenTechMakers Chennai 🔸`,
        "tagline": "Backend Engineer with Crazy Passion for Products",
        "social_icons":[
            {"className": "fa-twitter", "url": "https://twitter.com/geeky_bhavani"},
            {"className": "fa-medium", "url": "https://medium.com/@bhavaniravi"},
            {"className": "fa-linkedin", "url": "https://linkedin.com/in/bhavanir"},
            {"className": "fa-github", "url": "https://github.com/bhavaniravi"},
            {"className": "fa-stack-overflow", "url": "https://stackoverflow.com/users/6340775/bhavani-ravi?tab=profile"},
        ],
        "projects":[
            {"name":"KiSSFLOW Reports", 
            "description": "A reporting platform that enables users to create reports out of the workflow apps created using KiSSFLOW", 
            "url": "kissflow.com", 
            "github_url": "", 
            "icon_path":"fa-table", 
            "skills":["Python", "Flask", "MongoDB"]},
            {"name":"Interviewbot", 
            "description": "A chatbot that automates technical interview process, Enabling recruiters to screen applicants before setting a formal interview", 
            "url": "interviewbots.com", 
            "github_url": "", 
            "icon_path":"fa-comments", 
            "skills":["Python", "Django", "NLP", "Microsoft LUIS"]},
            {"name":"iKeepLog", 
            "description": `A chatbot that logs your work and learning everyday. 
                            The project won second place in WomenTechFab hackathon`, 
            "url": "interviewbots.com", 
            "github_url": "", 
            "icon_path":"fa-comments", 
            "skills":["Python", "Flask", "ReactJS", "Slack API", "Dialogflow"]},
            {"name":"Rasa Site Bot", 
            "description": `A chatbot that scrapes your sites FAQ page and creates a 
                            chatbot out of it`, 
            "url": "interviewbots.com", 
            "github_url": "", 
            "icon_path":"fa-user", 
            "skills":["Python", "Flask", "NLP", "RasaHQ"]},
            {"name":"ML Behind Chatbots", 
            "description": "A Research project, where I read the whole code base of RasaNLU and created a blog series", 
            "url": "", 
            "github_url": "", 
            "icon_path":"fa-search", 
            "skills":["Python", "RasaNLU"]},
            {"name":"QMiner", 
            "description": "A scraper app that goes through MCQ questions and create a knowledge base for chatbots", 
            "url": "interviewbots.com", 
            "github_url": "", 
            "icon_path":"fa-question-circle", 
            "skills":["Python", "BeautifulSoup", "MySQL"]},
        ],
        "skills":[
            {"name": "Python", "percentage": 85},
            {"name": "Flask/Django", "percentage": 85},
            {"name": "Chatbots & NLP", "percentage": 80},
            {"name": "MongoDB", "percentage": 70}
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