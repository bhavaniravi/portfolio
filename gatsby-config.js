module.exports = {
    // pathPrefix: `/portfolio2018`,
    siteMetadata: {
        "title":"Bhavani Ravi",
        "about_me": `🔸 Building KiSSFLOW at Orangescape 🔸
                     🔸 Python - Chatbots - Machine Learning 🔸
                     🔸 Lead - Google WomenTechMakers Chennai 🔸
                     🔸 Organizer - Build2Learn.in 🔸`,
        "tagline": `A Backend Engineer with Crazy Passion for Products`,
        "social_icons":[
            {"name":"Twitter", "className": "fa-twitter", "url": "https://twitter.com/geeky_bhavani"},
            {"name":"Medium", "className": "fa-medium",  "url": "https://medium.com/@bhavaniravi"},
            {"name":"LinkedIn", "className": "fa-linkedin","url": "https://linkedin.com/in/bhavanir"},
            {"name":"Github", "className": "fa-github",  "url": "https://github.com/bhavaniravi"},
            {"name":"StackOverflow", "className": "fa-stack-overflow", "url": "https://stackoverflow.com/users/6340775/bhavani-ravi?tab=profile"},
        ],
        "talks":[
            {"name":"ML Behind Chatbots", 
            "description": "My quest to build a chatbot engine and what I understood by demystifying an opensource chatbot engine", 
            "url": "", 
            "icon_path":"fa-table", 
            "slides_link": "",
            "location":"School of AI Chennai",
            "date":"Sep 2017"
        },
        {   
            "name":"DialogFlow & Free Text", 
            "description": `I was designing iKeepLog has a unique requirement where you can’t be sure what the user is going to type — it is what I call a “free-text”. 
                           the talk covers the hacks I found to acheive it with Dialogflow`,
            "url": "", 
            "icon_path":"fa-table", 
            "slides_link": "",
            "location":"Womentechmakers IWD Chennai"
        },

        ],
        "projects":[
            {"name":"KiSSFLOW Reports", 
            "description": "A reporting platform that enables users to create reports out of the workflow apps created using KiSSFLOW", 
            "url": "https://kissflow.com", 
            "github_url": "", 
            "icon_path":"fa-table", 
            "skills":[ "Flask", "MongoDB", "Pandas", "Docker"]},
            
            {"name":"Interviewbot", 
            "description": "A chatbot that automates technical interview process, Enabling recruiters to screen applicants before setting a formal interview.", 
            "url": "https://interviewbots.com", 
            "github_url": "", 
            "icon_path":"fa-comments", 
            "skills":[ "Django", "NLP", "Microsoft LUIS", "AWS"]},
            
            {"name":"iKeepLog", 
            "description": `A chatbot that logs your work and learning everyday. 
                            PS: This project won second place in WomenTechFab hackathon`, 
            "url": "https://docs.google.com/presentation/d/1k3hE6AmTcxix5iPPXCrE38Jh44-XXi3osDqWLWlXqpw/edit?usp=sharing", 
            "github_url": "", 
            "icon_path":"fa-comments", 
            "skills":[ "Flask", "ReactJS", "Slack API", "Dialogflow"]},
            
            {"name":"Rasa Site Bot", 
            "description": `A bot that scrapes your sites FAQ page and creates a 
                            chatbot out of it`, 
            "url": "https://github.com/bhavaniravi/rasa-site-bot", 
            "github_url": "", 
            "icon_path":"fa-user", 
            "skills":[ "Flask", "NLP", "RasaHQ"]},

            {"name":"ML Behind Chatbots", 
            "description": "A Research project, where I read the whole code base of RasaNLU and created a blog series", 
            "url": "https://medium.com/series/nlp-behind-chatbots-demystifying-rasanlu-318a8adb39ed", 
            "github_url": "", 
            "icon_path":"fa-search", 
            "skills":[ "RasaNLU"]},

            {"name":"QMiner", 
            "description": `A scraper app that goes through MCQ questions 
                            and creates a knowledge base for chatbots. 
                            It was my first python project.`, 
            "url": "https://interviewbots.com", 
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