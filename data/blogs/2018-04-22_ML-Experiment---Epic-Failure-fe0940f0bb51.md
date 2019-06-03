---
slug: "ml-experiment-epic-failure"
published_date: 2018-04-22T10:00:07.000Z
created_date: 2018-04-22T10:00:07.000Z
title: "ML Experiment & Epic Failure"
template: "post"
draft: false
description: "From the moment ML gained its hype, many of us jumped in and started learning it. Traversing from Andrew Ng to Siraj Raval, linear algebra to deep learning and neural nets, I have seen it all, but it…"
subtitle: "
I always love to write about my failed experiments so that people who experiment a lot will know that they are not alone. This blog is one…
"
tags: [Machine Learning,Sklearn,Python,Deep Learning,Ml Experiment]
featuredImgPath: /media/chatbots-101-architecture-and-terminologies-featured.jpg
---
## ML Experiment & Epic Failure

> _I always love to write about my failed experiments so that people who experiment a lot will know that they are not alone. This blog is one of those ML experiments that show how not to do certain things._

From the moment ML gained its hype, many of us jumped in and started learning it. Traversing from [Andrew Ng](https://www.coursera.org/learn/machine-learning) to [Siraj Raval](https://www.youtube.com/channel/UCWN3xxRkmTPmbKwht9FuE5A), linear algebra to deep learning and neural nets, I have seen it all, but it didn’t get me anywhere. I haven’t hit my eureka moment even after going through series of tutorials and folders full of ML projects.

For you to hit the magic moment of where it all makes sense to you, you have to see it working the magic in front of you, which never really happened neither to the ML models I created nor to me.

## **Stepping stones to ML**

1.  Get the dataset
2.  Preprocess — Cleaning, fillNaN, LabelEncoding, OneHotEncoding
3.  Find whether it is a regression/classification/clustering problem
4.  Train test split
5.  Fit — predict/classify
6.  Accuracy score, Confusion Matrix

I have done this all over and over again over a different set of data. Result? Huge list of folders of ML projects not getting me anywhere.

> _Experts would have told me to call myself an expert but I had other ideas 😛_

The main problem I had was that the datasets were not intuitive enough as they were not from a domain that I closely work with. I was waiting for a right real-time dataset that I understand entirely, and I got one.

Every step from here on is a stepping stone towards my Epic failure. It is all those little decisions that I made along the way which led me through the path towards the dead end showing me the biggest ML enlightenment.

## **Getting the Dataset**

I had conducted this 2 day Python workshop at Forge accelerator, Coimbatore. At the end of 2 days, I collected feedback from them. The moment I saw the collected data I was mentally classifying them as good job/bad job and I knew I got my first intuitive ML project to work on.

**Mistake 1**

I had only 26 students in my workshop. It means my dataset was really really small to work with any minimalistic ML algorithm.

**Realization**

Any dataset should for an ML experiment be of size 50.

## **Understanding the dataset**

The next day I was sitting with the CSV file open I was scrolling through left to right, and I could categorize it as good, bad, avg. Now I wanted to see whether an ML model can do that.

**Mistake 2**

I was thinking of it as a clustering problem. The fact that I completely missed here was that I have gone through enough samples of good & bad reviews to categorize it which makes it a classification problem.

**Realization**

Classifying the use case as clustering or classification or regression is a huge problem while learning ML. I now understand why all the ML courses out there take so much effort in explaining these concepts.

## **Preprocessing**

The feedback data is of 2 parts. One is numerical ratings, and the other is reviews in the text. For any text-based dataset, the preprocessing step involves converting them into numerical data.

**Mistake 3**

I fed all the numerical ratings into a labelEncoder and then into OneHotEncoder thinking that they represent a range of categories of data from Very Bad to Very Good.

**Realization**

It should remain a numerical value because it does not define a category, rather it is a weightage to the review. There is no need to OneHotEncode these values.

**Mistake 4**

For the reviews text, I fed it into TextBlob sentiment classifier and converted them to zeros and ones based on whether it is good or a bad review.

**Realization**

I knew that in order to work with a text-based data you have to convert it into numerical data. In this context the numerical data should be vectors representing the review statements rather than a classified score of good or bad.

## **Clustering**

You can never go wrong in this step. Now that the data was ready I fed it inside a KNN clustering algorithm with 2 bins. After clustering, I got an output of 0’s and 1’s. Matching it with existing sentiment analyzed data I couldn’t conclude it was working fine. So I decided to move on and visualize it to see what’s going on.

## **Visualization**

This is the step where every mistake that I mentioned above came to limelight. I plotted few features and the centroids, and I got an image that looks something like this.

<figure>

![](/media/ml-experiment-epic-failure-0.png)

<figcaption>visualized results</figcaption></figure>

From this picture, you can see that the X values are accumulated at the ends of the graphs falling either at 0 or 1, and there is no point in clustering them.

Hence I came to a most intuitive understanding of a Machine learning concept:

> [_You can’t perform KMeans clustering on categorical data_](https://datascience.stackexchange.com/questions/22/k-means-clustering-for-mixed-numeric-and-categorical-data?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)

This blog was originally published in [medium.com/@bhavaniravi](https://medium.com/@bhavaniravi)
