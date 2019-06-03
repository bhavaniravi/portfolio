---
slug: "cracking-complex-use-cases-withmongodb"
published_date: null
created_date: null
title: "Cracking Complex Use-Cases With MongoDB"
template: "post"
draft: true
description: "The primary question would be. Why would someone choose mongo over an age-old SQL? If you’re a newbie, you might think it is because MySQL is old, but that’s not the case. Google is filled with…"
subtitle: "
How I mastered MongoDB in 3 months.
"
tags: []
featuredImgPath: /media/machine-learning-nlp-vectorization-techniques-featured.png
---
## Cracking Complex Use-Cases With MongoDB

How I mastered MongoDB in 3 months.

I don’t think you need an introduction to what [MongoDB](https://medium.com/u/db5cd12199bd) is all about. Wikipedia says…

> **MongoDB** is a [free and open-source](https://en.wikipedia.org/wiki/Free_and_open-source_software "Free and open-source software") [cross-platform](https://en.wikipedia.org/wiki/Cross-platform "Cross-platform") [document-oriented database](https://en.wikipedia.org/wiki/Document-oriented_database "Document-oriented database") program. Classified as a [NoSQL](https://en.wikipedia.org/wiki/NoSQL "NoSQL") database program, MongoDB uses [JSON](https://en.wikipedia.org/wiki/JSON "JSON")-like documents with [schemata](https://en.wikipedia.org/wiki/Database_schema "Database schema").

The primary question would be. **Why would someone choose mongo over an age-old SQL**? If you’re a newbie, you might think it is because MySQL is old, but that’s not the case. Google is filled with articles and developers debating over the SQL’s and NoSQL’s of the world, Here are a few.

1.  Data these days are more unstructured than relational.
2.  It mimics the structure of API endpoints
3.  You have a schema-less design
4.  When you need more writes than reads.

## Who is this blog for?

This blog is my way of sharing to the world the hurdles I faced while trying to solve unique use cases with MongoDB. If you are starting with learning about databases or you already know MySQL and have been wondering what [MongoDB](https://medium.com/u/db5cd12199bd) is all about. Then you’re in the right place. I started pretty much there and learned a lot.

Throughout this blog, I will be comparing MongoDB to MySQL and pandas.

## Background

I was working on the SQL side of the world for the past two years and had to switch to using MongoDB as I switched to orangescape and started working on. To add to the surprise, I had to build a reporting framework that will be used by KiSSFlow to create reports on top of the apps the users create. This was quite a challenge because both KissFlow and MongoDB had a learning curve.

I started contributing to the project on August(My first pull request to KissFlow), and now we have kf-_reports-1.0_ on its way to production.

## MongoDB Installation, setup, and other things

MongoDB has a friendly out of the box solution for installation, well defined in their site. Along with Mongo, I would also suggest you install RoboMongo, a simple, lightweight GUI for Mongo.

1.  [Installation](https://docs.mongodb.com/manual/installation/)
2.  [Where to start? Getting Started](https://docs.mongodb.com/manual/tutorial/getting-started/)

These resources were not good enough for me get an idea on how to go about MongoDB. Mostly because you don’t know what kind of data to create and play around with. I need more of an exercise. [So I followed this MongoDB workbook.](http://nicholasjohnson.com/mongo/course/workbook/)

## Let’s Get The Data Right

If you’re choosing MongoDB to solve a specific use case, I 200% suggest you dump data with respect to the use case and write queries to achieve it. I learned it the hard way. Once I completed the workbook, I thought I could ace through the actual data stored in the application, but that was definitely not the case.

In real-time, the data had complex structures and multiple levels of nesting. Had I known it before I would have dug deeper and go to know the full extent of MongoDB

## Find vs. Aggregate

Find equates to MySQL select query and just that and nothing more. You cannot do joins or grouping with it.

```
Select UserID, Name, Email from UserTable where age > 100;
```
```
db.collection("User").find({age>100}, {"UserID": 1, "Name":1, "Email":1})
```

Now let’s say you want to do more than just filters and selection, Let’s say you want to group `Users` based on their year of birth, or project just the `YearOfBirth` from the `DOB` field. The find operation does not hold good for these complex functionalities. That’s when aggregate pops in.

Aggregate provides various mongo functionalities like `projection, addFields, match, grouping` to be applied on your data in the form of pipelines

Ok. Enough theory now. Let’s take a problem statement and crack it with aggregate.

```
**Group users by their birth year**
```
```
db.collection("User").aggregate([  
     {$group:{"_id":{}}}  
])
```

  

  

  

  

  

  

  

  

  

## Element Match

## Lookup

## Map

## Pipeline optimization

## Unwind and Cartesian Product

## toString

## PushToArray

## Variance 

## Mode & Median Headache

  

## The Facet Miracle

  

## Few things to keep in mind

##

This blog was originally published in [medium.com/@bhavaniravi](https://medium.com/@bhavaniravi)
