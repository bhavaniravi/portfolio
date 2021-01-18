---
slug: machine-learning-nlp-vectorization-techniques
published_date: 2019-05-30T11:28:31.037Z
created_date: 2019-05-30T11:28:31.037Z
title: Machine Learning — NLP Vectorization Techniques
template: post
draft: false
description: >-
  Whenever you start with any ML algorithm that involves text you should convert
  the text into a bunch of numbers. This is obvious because ML algorithms
  usually build a probabilistic model(which is…
subtitle: ' Whenever you start with any ML algorithm that involves text you should convert the text into a bunch of numbers. This is obvious because… '
tags:
  - machine learning
  - natural language processing
  - deep learning
  - chatbots
  - nlp
featuredImgPath: /media/machine-learning-nlp-vectorization-techniques-featured.png
---
# Machine Learning — NLP Vectorization Techniques

Whenever you start with any ML algorithm that involves text you should convert the text into a bunch of numbers. This is obvious because ML algorithms usually build a probabilistic model(which is math) and math can deal only with numbers.

> The process of converting NLP text into numbers is called vectorization in machine learning.

### Word Vocabulary

Vocabulary is the list of all the words you are dealing with. If your dataset can contain 1000 documents then your word vocabulary would be a list of unique words from the document. For a generalized chatbot, your vocabulary will have all the words in the language dictionary. For a customer success bot, it will have a language understanding as well as the words with respect to the products or services you provide.

### Bag of words(BoW)

The simplest and most powerful vectorization technique. Given a bunch of sentences BoW is creating a table of words with it’s associateda score denoting it_s_ contribution to the document.

The scoring can be done based on any of the following scoring techniques

1.  Word Count — (No of occurrences)
2.  Word Frequency — (No. of occurrences/Total number of words)
3.  TFIDF Vectorizer — The word that occurs the least carries the most information about the document

#### Applications 

BoW is used in spam filtering. Given an email and frequency of words in the email, the simplest approach would be to figure out whether the most occurring words are spammy. TFIDF is used in topic modeling and document tagging.

BoW also found itself a spot with computer vision where the image features are treated as a word vectors and preserved in a sparse matrix.

### Word2Vec

Word2Vec is a strategy where words are represented as a bunch of numbers. These numbers(Vectors) are not assigned in random they are assigned in such a way that two similar words are closer together in a vector space.

<figure>

![](https://cdn-images-1.medium.com/max/800/1*70iOJhTnYxj7Wc08TMbFaw.png)

</figure>

#### Applications

1.  Parts of speech tagging
2.  Entity Extraction
3.  Chatbots


<figure name="dec2" id="dec2" class="graf graf--figure graf--layoutOutsetCenter graf-after--li">

![](https://cdn-images-1.medium.com/max/1200/0*JlO7wQeJDLTUTw8q)

</figure>

### References

1.  [https://en.wikipedia.org/wiki/Bag-of-words_model](https://en.wikipedia.org/wiki/Bag-of-words_model)
2.  [https://en.wikipedia.org/wiki/Bag-of-words_model_in_computer_vision](https://en.wikipedia.org/wiki/Bag-of-words_model_in_computer_vision)
3.  [https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction](https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction)
4.  [https://blog.acolyer.org/2016/04/21/the-amazing-power-of-word-vectors/](https://blog.acolyer.org/2016/04/21/the-amazing-power-of-word-vectors/)

<hr/>