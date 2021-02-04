---
slug: "deploying-a-chatbot-nlp-model-demystifying-rasanlu-2-server"
published_date: 2018-07-31T16:28:05.940Z
created_date: 2018-07-31T16:28:05.940Z
title: "NLP Behind Chatbots — Demystifying RasaNLU — #2 — Serve"
template: "post"
draft: false
description: "This blog is the 2nd in the series of Demystifying RasaNLU. In Part 1 we have explored the various pipeline stages that the training data goes through before getting converted into a trained ML…"
subtitle: "
Deploying chatbot NLP model
"
tags: [Machine Learning,Chatbots,NLP,Artificial Intelligence,Bots]
featuredImgPath: /media/deploying-a-chatbot-nlp-model-demystifying-rasanlu-2-server-featured.png
---
# NLP Behind Chatbots — Demystifying RasaNLU — #2 — Serve

Deploying [chatbot](https://chatbotslife.com/) NLP model

<figure>

![Related image](/media/deploying-a-chatbot-nlp-model-demystifying-rasanlu-2-server-featured.png)

</figure>

This blog is the 2nd in the series of Demystifying RasaNLU. In [**Part 1**](https://medium.com/@bhavaniravi/demystifying-rasa-nlu-1-training-91a08429c9fb) we have explored the various pipeline stages that the training data goes through before getting converted into a trained ML model.

In this part, we will explore how this trained model is served via a REST API to predict the intent and entities during runtime in [Rasa](https://medium.com/u/fb02cb4905b7).

Again if you are a newbie to the whole chatbot domain, here is where you start

1.  [Understand what’s & why’s of chatbot](https://medium.com/@bhavaniravi/chatbots-101-architecture-and-terminologies-d6205e9c5768)
2.  [Build your first chatbot with RasaNLU](https://nlu.rasa.com/tutorial.html)
3.  [Part 1 — What happens when you train you chatbot?](https://medium.com/@bhavaniravi/demystifying-rasa-nlu-1-training-91a08429c9fb)
4.  Let’s Begin part 2

## Server — What does a developer see?

RasaNLU uses the `twisted`, a python web framework to serve predictions using the trained model via APIs. The RasaNLU framework creates the configurations for the server and starts it at `localhost:5000`

```
python -m rasa_nlu.server --path projects
```

Once the server is up and running, you can query an NLP result for a sentence using `/parse` endpoint with `q` as a query parameter. The rest of the blog will cover the transitions that the query string went through to arrive at the output.

```
[http://localhost:5000/parse?q=looking](http://localhost:5000/parse?q=looking) for a mexican restaurant
```

## What happens under the hood?

1.  Load the Model MetaData
2.  Create a processing pipeline
3.  Process text through the pipeline

## 1\. Load the Model MetaData

At the end of [Part 1](https://medium.com/@bhavaniravi/demystifying-rasa-nlu-1-training-91a08429c9fb), we have discussed that the ML model gets stored in a `.pkl` file. Another important file that gets stored is the `ModelMetaData` which is the snapshot of all the pipeline transformations and its parameters that the training samples went through.

The important parameters of each pipeline component being the `name` of the component, its `class` and `contextParms.` The context attributes are specific to the component.

The following is a snippet of a generated metadata file for `SklearnIntentClassifer` component. Apart from the `name` and `class` the `context` attributes include the `classifier_file` in which model is stored, tuning parameters like `C, Kernel` which are specific to the `SkLearnIntentClassifier.`

```
{'language': 'en',   
'pipeline': [...
```
```
{'name': 'intent_classifier_sklearn',  
'classifier_file': 'intent_classifier_sklearn.pkl',  
'class': 'SklearnIntentClassifier',  
'C': [1, 2, 5, 10, 20, 100],   
'kernels': ['linear'],   
'max_cross_validation_folds': 5  
}  
...
```

## 2\. Creating Pipeline Components

Each item in the metadata’s pipeline defines an ML component. In this step, An `Interpreter` object is created using the metadata which is the same as the one we got as an output from the training step which is later used to reconstruct the processing pipeline.

```
class Interpreter:  
    def create(model_metadata):  
        **# 1. Create component builder object**  
        component_builder = components.ComponentBuilder()  
        pipeline = []  
 **# 2. For each component in metadata  
        # 2.1  Create component object  
        # 2.2  Add component to pipeline**
```
```
 for component_name in model_metadata.component_classes:  
            component = component_builder.load_component(  
                component_name, model_metadata.model_dir,  
                model_metadata, **context)  
            pipeline.append(component)  
    return **Interpreter(pipeline, context, model_metadata)**
```

## 3\. Processing the Query through the pipeline

In this step, The query string is fed into various pipeline components. These are the stages that our training data went through. But while serving the model insights are derived from the text using the saved model, instead of training the model `Interpreter`will loop through the pipeline and process the message we got via the query string.

```
metadata = self._read_model_metadata(model_name)  
interpreter = Interpreter.create(metadata, component_builder)  
for component in interpreter.pipeline:  
    component.process(message, **self.context)
```

## 3.1 Preprocessing

The preprocessing step is similar to the one in training. This step transforms the input query string to a bunch of numbers(Vectors) which is used to perform predictions on the ML model.

### **3.1.1. Tokenize word**

In this step, we use `SpacyTokenizer` to tokenize sentences into words. We do this because later in the pipeline we construct a dependency among the words to identify the user intent.

```
Input >>> 'spacy_doc' from previous step
```
```
Code >>> tokens = [Token(t.text, t.idx) for t in doc]
```
```
Output >>>   
{'tokens': [i, am, looking, for, a, mexican, restaurant]}
```

### **3.1.2. Convert words into Vectors**

As mentioned in part 1,

> An ML algorithm understands only numerical data. It is the featurizer’s job to convert tokens into word vectors. We use `SpacyFeaturizer`to achieve this. At the end of this step, we will have a list of numbers which will make sense only for ML models. Spacy’s token comes with a vector attribute which makes this conversion easy.

```
Input >>> tokens
```
```
Code >>> features = [token.vector for token in tokens]
```
```
Output >>>   
'text_features': array([ 7.84102738e-01, -2.11456835e-01,  8.09298396e-01,  1.77501714e+00,...
```

### **3.1.3. Match Regular Expressions**

Since this particular example has no regex patterns to match, It returns an empty list.

In case of a regex-based example, `RegexFeaturizer`looks for matching regular expression from the trained samples and would return 1.0 for words that match the regex pattern.

```
Input >>> tokens
```
```
Code >>>
```
```
found = []  
for i, exp in enumerate(self.known_patterns):  
    match = re.search(exp["pattern"], message.text)  
    if <match_in_token>:      
        found.append(1.0)  
    else:  
        found.append(0.0)
```
```
Output >>> []
```

## 3.2 Entity Extraction

### **3.2.1. Predict Entities using** NER_CRF EntityExtractor

The first step in entity extraction at runtime is to Create an `EntityExtractor` object using the metadata. The metadata for the restaurant chatbot from RasaNLU site would look something like this.

```
>>> metadata
```
```
{'BILOU_flag': True, 'features': [[...]],   
'max_iterations': 50, 'L1_c': 0.1, 'L2_c': 0.1, 'name': 'ner_crf', **'classifier_file': 'crf_model.pkl'**, 'class':'CRFEntityExtractor'}
```
```
>>> def load(metadata)  
        ent_tagger = joblib.load(metadata["**classifier_file**"])  
        return CRFEntityExtractor(meta, ent_tagger)
```

Creating the model object using the pickle file enables you to preserve the training information.

```
Input >>> text_features
```
```
Code >>>  
def extract_entity(message):  
    text_data = self._from_text_to_crf(message)  
    features = self._sentence_to_features(text_data)  
    ents = self.ent_tagger.predict_marginals_single(features)  
    return self._from_crf_to_json(message, ents)
```
```
Output >>>  
'entities': [{  
      'start': 20, 'end': 27, 'value': 'mexican',  
      'entity':'cuisine', 'confidence': 0.5007341271762173,  
      'extractor': 'ner_crf'  
}]
```

### **3.2.2. Extract Synonyms**

During synonym extraction, the `NERSynonymExtractor`reads the JSON file created during the training phase and matches the entities extracted in NER phase against it. If there is a match, the entity dict gets updated. The process is repeated for all the entities captured during NER. In the end, we get an updated entity list.

```
Input >>> entities   
Code >>> 
```
```
for entity in entities:  
    entity_value = entity["value"]  
    if entity_value.lower() in self.synonyms:  
        entity["value"] = self.synonyms[entity_value.lower()]
```
```
Output >>>  
'entities': [{  
      'start': 20, 'end': 27, 'value': 'mexican',  
      'entity':'cuisine', 'confidence': 0.5007341271762173,  
      'extractor': 'ner_crf'  
}]
```

## **3.3. Intent Classification**

Any ML 101 tutorial will teach you two things `fit` and `predict.` The fit is where the training happens, and now we have to predict over the trained model by calling `predict` using `SkLearnIntentClassifier.`

```
Input >>> text_features
```
```
Code >>>  
X = message.get("text_features").reshape(1, -1)  
intent_ids, probabilities = self.predict(X)  
intents = self.transform_labels_num2str(intent_ids)
```
```
Output >>>  
'intent_ranking': [  
{'name': 'restaurant_search', 'confidence': 0.7617989648263017}, {'name': 'affirm', 'confidence': 0.13003887740062095},   
{'name': 'goodbye', 'confidence': 0.05772400386318094},   
{'name': 'greet', 'confidence': 0.050438153909896435}]
```

## Final Output

<figure>

![](/media/deploying-a-chatbot-nlp-model-demystifying-rasanlu-2-server-1.png)

</figure>

The final output is your intent and entity predicted and given to you in the form of a JSON. Using this information you can perform the respective action and generate reply messages accordingly.

[_In the_ **_next part,_** We will digger deeper and understand the Entity Extractor.](https://medium.com/@bhavaniravi/entity-extraction-demistifying-rasanlu-part-3-13a460451573)

**Was this post useful to you?   
**_Hold the clap button and give a shout out to me on_ [_twitter_](https://twiiter.com/@BhavaniRavi_)_. ❤️_


