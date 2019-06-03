---
slug: "chatbots-101-architecture-and-terminologies"
published_date: 2016-10-30T16:23:13.000Z
created_date: 2016-10-30T16:23:13.000Z
title: "Chatbots 101- Architecture & Terminologies"
template: "post"
draft: false
description: "In this blog we will start with what is a chatbot? and why do we need them?. From there we will explore the chatbot's architecture and common terminologies of the domain"
subtitle: "
What is a Chatbot?

In this blog we will start with what is a chatbot? and why do we need them?. From there we will explore the chatbot's architecture and common terminologies of the domain
"
tags: [Bots,Chatbots,Machine Learning,NLP]
featuredImgPath: /media/chatbots-101-architecture-and-terminologies-featured.jpg
---
## Chatbots 101— Architecture & Terminologies

<figure>

![](/media/chatbots-101-architecture-and-terminologies-featured.jpg)

</figure>

## What is a Chatbot?

> _A chatbot is a computer program designed to simulate a conversation with human users, especially over the Internet._

> _A chatbot is meant to understand a human language, respond to it like a human and learn along the way to behave more human-ly._

Siri and Google assistant are classic examples of chatbots.

## Why do we need a Chatbot?

1.  Chat is the most natural way of interaction between human and application.
2.  Bots are interactive.
3.  Chatbots add a human touch to any application you build.
4.  Bots are engaging. It is not as boring as filling up a long form.

## How are chatbots different from Apps

As I already mentioned Chatbots are the most natural way of interaction, it just feels like asking your friend for help but can still do all the activities that a has to do. Hence a chatbot is like adding a conversational interface to apps.

The technical differences between both is discussed in the next section.

## Chatbot’s Architecture

<figure>

![](/media/chatbots-101-architecture-and-terminologies-1.png)

</figure>

Chatbot architecture is very similar to the architecture of a web application. It works on the client-server model. The differentiating factor is that it works with unstructured data.

In a web application, when you fill a form the data structure is constructed by the client in such a way that your server understands but, when it comes to chatbots, the client gets a raw text from a messaging interface(slack, FB messenger, etc.,). In this case, you need a middle layer to parse the text and derive insights and call the respective backend API that performs the intended action.

### **Bot Building Platforms**

Bot building platforms provide tools that help you design unique conversation scenarios, define corresponding actions and analyze interactions.

They use a mixture of **AI and machine learning algorithms** to make the bots understand Natural language **(NLU — Natural language understanding)**, process the conversation text and extracts information **(NLP — Natural Language Processing)** and respond to the user preserving the context of the conversation **(NLG — Natural Language Generation).**

### **Few Bot building platforms**

*   [DialogFlow ](http://dialogflow.com/)— Google
*   Wit.ai — Facebook
*   [Recast.ai](https://recast.ai/)
*   [Converse.ai](http://www.converse.ai/)
*   [Rasa NLU & Rasa Core](http://rasa.com/)

## Common Terminologies

### **Intents**

An Intent is a collection of expressions(what the user says) that mean the same thing but are constructed differently. Each intent corresponds to one action your user wants to perform.

For example, An intent “greet” will have the following expressions “hi,” hello,” hey,” all meaning the same thing as a greeting or conversation initiator. The following is an intent training done in dialogflow to _get_meaning_ of a word.

<figure>

![](/media/chatbots-101-architecture-and-terminologies-2.png)

<figcaption>get_meaning intent with its various training samples</figcaption></figure>

### **Entities**

An **Entity** is a piece of information extracted from what a user says. These are the details you want the bot engine to capture in order to perform the action.

For example, When you look for a famous place in a city you would need to capture information like _the kind of place, the city_ and the personal preferences like _timings etc.,_

<figure>

![](/media/chatbots-101-architecture-and-terminologies-3.png)

</figure>

### **Actions**

An **Action** is a task that you expect your bot to do. In most cases, An external API performs this action. Since the bot platforms do not support external API calls, An external program is used to drive that functionality.

For example, When you ask your bot to order pizza for you, the bot extracts all the information(Entities) required to order pizza say, size, type, topping etc and sends it to an external API and gets a response whether the order is successful or not.

## Next Steps

No theoretical knowledge is useful unless you apply it and see things working for yourself. Every chatbot platform comes with a good set of documentation and tutorials which will guide you through building your first chatbot.

1.  [https://dialogflow.com/docs/getting-started/first-agent](https://dialogflow.com/docs/getting-started/first-agent)
2.  [https://nlu.rasa.com/tutorial.html](https://nlu.rasa.com/tutorial.html)
3.  [https://recast.ai/docs/create-your-bot](https://recast.ai/docs/create-your-bot)

## [Natural Language Processing Behind Chatbots](https://medium.com/@bhavaniravi/demystifying-rasa-nlu-1-training-91a08429c9fb)

This blog was originally published in [medium.com/@bhavaniravi](https://medium.com/@bhavaniravi)
