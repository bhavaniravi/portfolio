---
slug: intent-classification-demystifying-rasanlu-part-4
published_date: 2018-09-06T17:45:20.801Z
created_date: 2018-09-06T17:45:20.801Z
title: Intent Classification — Demystifying RasaNLU — Part 4
template: post
draft: false
description: >-
  The series, Demystifying RasaNLU started with an aim of understanding what
  happens underneath a chatbot engine. RasaNLU being an open source framework, I
  could read through the code to understand its…
subtitle: ' Internals of a chatbot engine — Intent Classification '
tags:
  - machine learning
  - chatbots
  - bots
  - artificial intelligence
  - software development
featuredImgPath: /media/intent-classification-demystifying-rasanlu-part-4-featured.png
---
# Intent Classification — Demystifying RasaNLU — Part 4

Internals of a [chatbot](https://chatbotslife.com/) engine — Intent Classification

The series, [Demystifying RasaNLU](https://medium.com/series/nlp-behind-chatbots-demystifying-rasanlu-318a8adb39ed) started with an aim of understanding what happens underneath a chatbot engine. RasaNLU being an open source framework, I could read through the code to understand its internals.

The first two parts explains major functionalities of any bot framework, [Training](https://medium.com/@bhavaniravi/demystifying-rasa-nlu-1-training-91a08429c9fb) and [Deploying](https://medium.com/@bhavaniravi/deploying-a-chatbot-nlp-model-demystifying-rasanlu-2-server-7704afc74d1f) the Chatbot. Part 3 was aimed to arrive at a deep understanding of the machine learning aspects of [Entity Extraction](https://medium.com/@bhavaniravi/entity-extraction-demistifying-rasanlu-part-3-13a460451573). This part deep-dives into the **intent classification.**

<figure>

![](/media/intent-classification-demystifying-rasanlu-part-4-featured.png)

</figure>

Intent classification builds a machine learning model, using a prepossessed training data and classifies the user’s text message to an intended action.

For example, a message like _“Help me find a Mexican restaurant in Chennai”_ should be mapped to an action called _“restautant_search”_ with _“Mexican”_ and _“Chennai”_ as search parameters. In the previous part we have seen how to extract these parameters using _Named Entity Recognition._

## RasaNLU and Intent Classifiers

[RasaNLU](https://medium.com/u/fb02cb4905b7) supports multiple intent classifiers like `sklearn`, `mitie` and `tensorflow_embedding` that can be configured based on your use-case. For the purpose of this blog we are going to stick with `sklearn intent classifier.`

## Training Sample

RasaNLU has a specific data structure for its training data. You can visualize it as a table of sentences each associated with a tag(intent).

```
hi                                   - greet  
hello                                - greet  
bye                                  - end_conversation  
goodbye                              - end_conversation  
see you                              - end_conversation  
Suggest me some mexican restaurants  - restaurant_search  
im looking for restaurants           - restaurant_search
```

## Preprocess

For ML models to understand our text data, it needs to be in certain format. The preprocessing step takes care of this transformation. The aim of preprocessing is to arrive at a bunch of features and classes.

1.  **Tokenize text to words**

```
"Suggest me some mexican restaurants"  
["suggest", "me", "some", "mexican", "restaurants"]
```

[**2\. Convert words to features**](https://spacy.io/usage/vectors-similarity)

RasaNLU uses `spacy word2vec` to convert words to numbers. During this process the tokens are mapped in a N-Dimensional space based on its similarity with other words in spacy’s pre-trained corpus.

```
["suggest", "me", "some", "mexican", "restaurants"]  
[1.40101, 1.3003, 0.45647, 1.8934, 1.67677]
```

### 3\. Labeling Features

Intents are categorized by a label given in training data. These labels are usually the actions the intent meant to perform. Few examples of intent labels are `book_tickets, cancel_tickets` etc.,

We have converted text-samples from words to numbers for our ML model to understand it. When it comes to labels we don’t convert it into word vectors rather assign a unique number to it. This process is called as encoding.

RasaNLU uses `Sklearn's LabelEncoder` to perform this step

```
>>> labels  
[greet, good_bye, restuarant_search, good_bye]
```
```
>>> le = LabelEncoder()   
>>> y = le.fit_transform(labels)  
>>> y  
[0, 1, 2, 1 ...
```

## Classify Intents

The ML algorithm that RasaNLU uses to classify intents is the `SVM` with `GridSearchCV`. The advantage of `GridSearchCV` is that you can train `SVM` with different configurations and at the end of training it returns a trained SVM model with the best configuration.

### Configuration

The configuration defines list of all possible parameter `GridSearchCV` would train `SVM` on. `GridSearchCV` will create SVM’s with all the combinations.

```
defaults = {                                
"C": [1, 2, 5, 10, 20, 100],  
"kernels": ["linear"],                              "max_cross_validation_folds": 5}                                                                                           C = defaults["C"]                         
kernels = defaults["kernels"]
```
```
tuned_parameters = [{"C": C, "kernel": [str(k) for k in kernels]}]                                                                   
folds = defaults["max_cross_validation_folds"]                       cv_splits = max(2, min(folds, np.min(np.bincount(y)) // 5))
```

### Train

1.  Create `GridSearchCV` object with defined configuration
2.  Fit the training data using `fit` method.

After fitting the data, we will have an N-Dimensional statistical model which can classify similar texts to one of the trained intents.

```
clf = GridSearchCV(   
         SVC(C=1, probability=True, class_weight='balanced'),  
         param_grid=tuned_parameters, n_jobs=1, cv=cv_splits,         scoring='f1_weighted', verbose=1)  
clf.fit(X, y)
```

## Testing

First let’s test our ML model with one training example from our training data. Since we already have the features extracted lets feed it into `clf.predict` method. The prediction returns an numerical value which needs to be decoded to arrive at the actual intent tag.

```
**# show me few mexican restaurants**  
>>> X_test = intent_examples[24].get("text_features").reshape(1, -1)                         
>>> pred_result = clf.predict(X_test)  
>>> pred_result  
**[2]**
```
```
>>> le.inverse_transform(pred_result)  
**['restaurant_search']**
```

Apart from testing it over the training data you also need to test it over a bunch of testing data, data that the ML model have never seen before to avoid over fitting.

## Deploy

One major thing that we need to keep in mind while deploying the ML model is that the preprocessing pipeline should remain the same during training, testing and when it is in action. Any change in the pipeline parameters will have a huge impact on the end result.

Now how does RasaNLU keeps these configurations intact? [Checkout Part 2](https://medium.com/p/7704afc74d1f) where we cover more about meta-data configuration.


