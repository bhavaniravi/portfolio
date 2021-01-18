---
slug: entity-extraction-demistifying-rasanlu-part-3
published_date: 2018-08-15T18:29:25.179Z
created_date: 2018-08-15T18:29:25.179Z
title: Entity Extraction - Demistifying RasaNLU - Part 3
template: post
draft: false
description: >-
  In this blog will drill down through the entity extraction step in RasaNLU.
  This blog concentrates on the structuring of data and building an ML model.
subtitle: >2-
   How does RasaNLU perform EntityExtraction?
  In this blog will drill down through the entity extraction step in RasaNLU.
  This blog concentrates on the structuring of data and building an ML model. 
tags:
  - machine learning
  - nlp
  - chatbots
  - bots
  - artificial intelligence
featuredImgPath: >-
  /media/deploying-a-chatbot-nlp-model-demystifying-rasanlu-2-server-featured.png
---
# Entity Extraction — Demystifying Rasa NLU — Part 3

How does RasaNLU perform entity extraction?

I started Demystifying [Rasa](https://medium.com/u/fb02cb4905b7) NLU when I committed myself to #[100DaysOfMLCode](https://github.com/llSourcell/100_Days_of_ML_Code) Challenge by [Siraj Raval](https://medium.com/u/54526471f9bf). For the first 10 days, I backtracked through the code base understanding [what happens when we train the chatbot.](http://medium.com/@bhavaniravi/demystifying-rasa-nlu-1-training-91a08429c9fb) By the 25th Day, I could crack [what happens when we serve a trained model via RestAPIs.](https://medium.com/@bhavaniravi/deploying-a-chatbot-nlp-model-demystifying-rasanlu-2-server-7704afc74d1f)

With this overall understanding, I wanted to dig deeper and explore what happens during `EntityExtraction.` In this blog we will drill down through the **entity extraction** step in RasaNLU. This blog concentrates more on the structuring of data and building an ML model rather than understanding the statistical models that drive it from underneath.

<figure>

![](/media/entity-extraction-demistifying-rasanlu-part-3-0.png)

</figure>

## RasaNLU & EntityExtraction

[RasaNLU supports multiple methods to extract entities.](http://rasa.com/docs/nlu/entities/)

1.  NER CRF.
2.  NER Spacy
3.  NER Duckling
4.  NER MITIE

The [use-case of each of these extractors](http://rasa.com/docs/nlu/entities/) is explained in RasaNLU’s documentation. Spacy and Duckling are commonly used for pre-trained entities like name, place, time,date etc.,

For custom entities like a product, cuisine, types of pizza we need to use `NERCRF` or `MITIE.` In this blog, we are going to stick with `NERCRF` since it is the default extractor provided by Rasa.

## [NERCRF — Named Entity Extraction using Conditional Random Field](https://en.wikipedia.org/wiki/Conditional_random_field)

> Conditional Random Field(CRF) — a popular statistical model used in natural language processing, predicts sequences of labels for sequences of input samples.’

RasaNLU uses `sklearncrfsuite` to perform entity extraction, and you can use it outside the context of RasaNLU by following [this tutorial](http://sklearn-crfsuite.readthedocs.io/en/latest/tutorial.html).

## Training Data

```
**Training Sample**  
{  
    'intent': 'restaurant_search',   
    'entities': [  
    {'start': 31, 'end': 37, 'value': 'centre', 'entity': 'location',  
    {'start': 10, 'end': 17, 'value': 'mexican', 'entity': 'cuisine'}  
    ],   
     'text': 'show me a mexican place in the centre'  
}
```

## Preprocessing

To extract entities from the text, we need to `Tokenize` them. One thing I noticed here is that Unlike other NLP techniques, we don’t remove stop words for entity extraction. `NERCRF` is a sequential statistical model, i.e. every feature is dependent on features(tokens) before and after it and it is important to preserve the order of the word.

```
'tokens': [show, me, a, mexican, place, in, the, centre],
```

## Create `EntityExtractor Object`

The `CRFEntityExtractor` object is created with default configuration settings provided by `RasaNLU.`

```
>>> crf = CRFEntityExtractor()  
**# Default config**  
>>> crf.component_config
```
```
{'BILOU_flag': True,  
 'features': [
```
```
 ['low', 'title', 'upper', 'pos', 'pos2'],  
     ['bias', 'low', 'word3', 'word2', 'upper','title', 'digit','pos', 'pos2','pattern'],  
     ['low', 'title', 'upper', 'pos', 'pos2']],  
     'max_iterations': 50,  
     'L1_c': 1,  
     'L2_c': 0.001  
}
```

The features `low`, `title`, etc., are the features we will be extracting from the text. We will dig deeper into what each feature means later in this blog. `L1_C` and `L2_C` are parameters for the loss functions.

## Filter Training data

RasaNLU supports more than one entity extractors.A bot developer can configure it using the `extractor` key in training example. If there is no extractor mentioned, `NERCRF` is taken as the default `EntityExtractor`. Hence, filter all training samples which does not have an `extractor` parameter or the one that specifies `NERCRF.`

```
def filter_trainable_entities(self, entity_examples):  
    for ent in message.get("entities", []):  
        extractor = ent.get("extractor")  
        if **not extractor or extractor == self.name**:  
            entities.append(ent)
```

## Create Dataset

`NERCRF` uses a certain structure of training data. In this step we will transform `RasaNLU's` dataset into the one that is supported by `NERCRF.` This involves merging the entities with the training example associated with it.

### **Convert Entity**

In the training data we have entities defined as dictionaries, In this step it is transformed to list of tuples with (start\_index, end\_index and entity). This will enable us to tag the tokens easily in the next step.

```
entities =  [entity["start"], entity["end"], entity["entity"]  
                 for ent in example.get("entities", [])]
```
```
[(31, 37, ‘location’), (10, 17, ‘cuisine’)]
```

### BILOU Tagging

BILOU means (Begin, Intermediate, Last, Other, Unigram) is a text tagging format that enables entity extraction. In this step for each token if it falls under the entity offset a entity tag is attached to it. If not tag `O` will be attached to it.

```
def _bilou_tags_from_offsets(tokens, entities, missing='O'):  
    if start_token is not None and end_token is not None:  
       ** if start_token == end_token:  
            bilou[start_token] = 'U-%s' % label  
        else:  
            bilou[start_token] = 'B-%s' % label  
            for i in range(start_token + 1, end_token):  
                bilou[i] = 'I-%s' % label  
                bilou[end_token] = 'L-%s' % label**
```

RasaNLU extracts both single and multi word entities. In case of single entity the Entity is tagged with `U-Entity` , A multi word entity has starting word tagged with `B-Entity`and Last word with `L`and all intermediate word with `L` CRFEntityExtractor.

```
tokens :: [show, me, a, mexican, place, in, the, centre]  
BILOU  :: [O,    O,  O,'U-cuisine', O,   O, O, 'U-location']
```
```
tokens :: [show, me, a, mexican, place, in, New, York, City]  
BILOU  :: [O,    O,  O,'U-cuisine', O,   O, O, 'B-location','I-location','L-location' ]
```

### Text to CRF format

This is the final step of the dataset conversion where the `BILOU` tags and the tokens are merged to arrive at the following format.

```
[(token, POS_tag, entitiy, pattern)]
```

For each `token` in a training example a tuple of `token` its `POSTag`, `BILOUEntity` and `RegexPattern` in case of regex based entities.

```
>>> dataset  
[('show', None, 'O', None),  ('me', None, 'O', None),   
 ('a', None, 'O', None),     ('mexican', None, 'U-cuisine', None),   
 ('place', None, 'O', None), ('in', None, 'O', None),   
 ('the', None, 'O', None),   ('centre', None, 'U-location', None)]
```

## Create Training data

### X_Train

`NERCRF` comes with a bunch of default configurations which we would use to generate features. As we seen before the default configuration looks something like this.

```
{'BILOU_flag': True,  
 'features': [  
     **# Features to be extracted from token before**  
     ['low', 'title', 'upper', 'pos', 'pos2'],  
     **# Features to be extracted from current token**  
     ['bias', 'low', 'word3', 'word2', 'upper','title', 'digit','pos', 'pos2','pattern'],  
     **# Features to be extracted from token after** ['low', 'title', 'upper', 'pos', 'pos2']],  
     'max_iterations': 50,  
     'L1_c': 1,  
     'L2_c': 0.001  
}
```

If you look at the `features` list, we can see that there are 3 set of features. For each `token` in a `training_example` we would construct data for `tokens` before and after that particular `token`.

```
>>> X_train = [self._sentence_to_features(sent) for sent in dataset]  
>>> X_train[-1]  
[...,  
{'-1:low': 'the',     # The previous word  
'-1:title': False,    # is the prev word a title  
'-1:upper': False,    # is the prev word in uppercase  
'0:bias': 'bias',   
'0:low': 'centre',    # Current word  
'0:prefix5': 'centr',   
'0:prefix2': 'ce',   
'0:suffix5': 'entre',   
'0:suffix3': 'tre',   
'0:suffix2': 're',   
'0:upper': False,   
'0:title': False,    # is a title  
'0:digit': False,    # is a number  
0:pattern': 'N/A',   
'EOS': True}         # End of sentence  
]
```

### y_train

`Y_train` is the entity tags that we generated by BILOU tagging.

```
>>> y_train = [self._sentence_to_labels(sent) for sent in dataset]  
['O', 'O', 'O', 'U-cuisine', 'O', 'O', 'O', 'U-location']
```

## Training

Now that we have the data ready all we have to do is create the `CRF object` and `fit` it using the training data. This step happens during the training phase of RasaNLU, and the prediction(next part) happens when we deploy the model.

```
crf = sklearn_crfsuite.CRF(algorithm='lbfgs',  
                          **component_config)  
crf.fit(X_train, y_train)
```

## Prediction

During prediction, the text that the user enters is preprocessed and arrived at a format similar to the `X_train.` This preprocessed format is then fed into `CRFClassifier` to make predictions.

### Preprocessing

```
training_sample = {'text': 'show me chines restaurants in the north'}  
**# 1. Load into SpacyNLP**   
{'spacy_doc': show me chines restaurants in the north,   
'text': 'show me chines restaurants in the north'}
```
```
**# 2. Tokenize**  
{'spacy_doc': "..."  
'tokens': [show, me, chines, restaurants, in, the, north],  
'text': "..."}
```

Next step is to convert the text into CRF format. Unlike training phase, the `entity` part of the list is filled with `N/A` since we won’t have any information on whether a particular token is an entity or not.

```
**# 3. Convert Text to CRF format**
```
```
>>> text_data = crf._from_text_to_crf(test_example)  
>>> text_data  
[('show', None, 'N/A', None),   
('me', None, 'N/A', None),   
('chines', None, 'N/A', None),   
('restaurants', None, 'N/A', None),   
('in', None, 'N/A', None),   
('the', None, 'N/A', None),   
('north', None, 'N/A', None)]
```
```
**# 4. Convert CRF format to features**  
>>> features = crf._sentence_to_features(text_data)  
>>> features 
```
```
[{'BOS': True, '0:bias': 'bias', '0:low': 'show', '0:prefix5': 'show', '0:prefix2': 'sh', '0:suffix5': 'show', '0:suffix...
```

### Predict

After prediction, we will get a list with the probability of a particular token being a `BILOU-tag.` This means we can ignore the tags with `O` and construct a dictionary with only valid entity tags.

```
**# 1. Predict**  
>>> ents = crf.ent_tagger.predict_marginals_single(features)  
>>> ents
```
```
[{'O': 0.9881565662477786, 'U-location': 0.0019499979138974536, 'U-cuisine': 0.002866549564514255, 'B-cusine': 0.00126939581550308, 'L-cusine': 0.002386854107682877, 'I-cusine': 0.0014001745853175994, 'U-cusine': 0.0019704617653066633}...]
```
```
**# 2.Convert prediction result to readable format**
```
```
>>> entities = crf._from_crf_to_json(test_example, ents))  
>>> entities
```
```
[{'start': 8, 'end': 14, 'value': 'chines', 'entity': 'cuisine', 'confidence': 0.848068806858813}, {'start': 34, 'end': 39, 'value': 'north', 'entity': 'location', 'confidence': 0.9334140282928288}]
```


