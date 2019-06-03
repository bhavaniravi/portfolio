---
slug: "whats-wrong-with-python-pandas"
published_date: 2019-03-10T18:10:38.033Z
created_date: 2019-03-10T18:10:38.033Z
title: "What’s Wrong With Python Pandas?"
template: "post"
draft: false
description: "In my previous blog, I nudged you to get started with pandas and showed why it is important to get a good hold of it before moving on to machine learning. But there are a few things you need to watch…"
subtitle: "
Watch out for these problems, or raise issues and fix them!
"
tags: [Data Science,Python,Pandas,Data Visualization,Analytics]
featuredImgPath: /media/whats-wrong-with-python-pandas-featured.png
---
## What’s Wrong With Python Pandas?

Watch out for these problems, or raise issues and fix them!

> Complex data and use-cases lead to complex problems.

[In my previous blog](https://medium.com/@bhavaniravi/python-pandas-tutorial-92018da85a33), I nudged you to get started with pandas and showed why it is important to get a good hold of it before moving on to machine learning. But there are a few things you need to watch out for. When I was using Pandas to deal with real-time data and create a reporting platform these issues were show stoppers. Keep an eye for these problems it might become a deal-breaker if you are looking at Pandas to build analytics pipelines or platforms.

<figure>

![](/media/whats-wrong-with-python-pandas-featured.png)

</figure>

## Where It All Started

As I mentioned, I was trying to incorporate Pandas into the data pipeline to create reports out of it. Some of the common use-cases include

1.  Selecting specific columns from Dataframe
2.  Grouping
3.  Constructing pivot tables

There is one common attribute to all these use-cases. Once the Dataframe is constructed the data needs to be sent to the front-end via an API. The closest possible thing you will look for is converting the dataframes to dictionaries and that’s **_Problem 1_**

## 1\. Converting Dataframes into Dictionaries

_We are using the same sales data that we used in the previous blogs for this part._

One of the best things about Dataframe is it's out of the box methods to convert data into required formats (CSV, JSON etc.,). `to_dict`is one such method to transform them into a python dictionary.

```
df = pd.read_csv(PATH_TO_DATA)  
df.head()
```
<figure>

![](/media/whats-wrong-with-python-pandas-1.png)

<figcaption>x</figcaption></figure>

Now, as per our use case let’s use the`to_dict` method to create a dictionary. But the excitement is lost the moment you see the result.

```
df.to_dict()
```
<figure>

![](/media/whats-wrong-with-python-pandas-2.png)

</figure>

The `to_dict` method comes with 5 different orientations, by default it is `dict` orientation. For each column, it goes through each index and creates a dict with the corresponding value

<figure>

![](/media/whats-wrong-with-python-pandas-3.png)

</figure>

For our requirement, the Orient `records` seems to be a good fit.

```
df.to_dict(orient="records")
```
<figure>

![](/media/whats-wrong-with-python-pandas-4.png)

</figure>

## 2\. Grouped DataFrames into Dictionaries

We saw how easy it was to convert a Dataframe into an API response. Similarly, you can convert any dataframe, even _grouped ones_ as a response through an API endpoint.

Let’s do some simple grouping.

```
grouped_df = df.groupby("Country").sum()
```
<figure>

![](/media/whats-wrong-with-python-pandas-5.png)

</figure>

Going by the hunch we got from using the default `to_dict` method, if we use `orient=records` we end up with OOPS!!! that doesn’t seem right!

<figure>

![](/media/whats-wrong-with-python-pandas-6.png)

</figure>
```
'records' : list like [{column -> value}, … , {column -> value}]
```

As the documentation says, `orient=record` takes only the columns into consideration. Leaving the rows containing the country details of the groupby. Which makes the resulting dict meaningless.

At this point, we have to get clear on what our final dict should look like. You might think it is obvious, but for Pandas, it’s not.

```
**Structure 1 - Country wise**  
{"Africa": {"Total": 5678, "Quanitity": 6789}}  
{"Index":{"Column": "value"}}
```

On looking up the Pandas documentation `orient="index"` will suit the requirement

<figure>

![](/media/whats-wrong-with-python-pandas-7.png)

</figure>
```
**Structure 2 - All the totals and Quatities**  
{'Total': {'Africa': 460000, ...}, "Quantity":{"Africa":..}}  
{"Column":{"Index": "value"}}
```
<figure>

![](/media/whats-wrong-with-python-pandas-8.png)

</figure>

### More Columns More Problems

As you add up more columns to your grouping, the Pandas index stacks up and the dict keys become `tuples` instead of `str` making it literally unusable. None of the `orients` like `dict, records, index` can save us this time.

<figure>

![](/media/whats-wrong-with-python-pandas-9.png)

</figure>

## 3\. JSON into Dataframes

So far we have seen data being loaded from CSV files, which means for each key there is going to be exactly one value. Since this section needs a more complicated nested data, [I have used my medium blog results via API(nested dictionaries and list)](https://jsoneditoronline.org/?id=e1a38442d3e740fa80b57c49efcc6ca8). It is common to hit these roadblocks in real-world scenarios when we load data from external APIs.

Pandas becomes a huge pain when we deal with data that is deeply nested. Each blog data is under a key called `node` and the author and statistical information are under nested keys `virtuals and author` respectively.

<figure>

![](/media/whats-wrong-with-python-pandas-10.png)

</figure>

Let’s see what happens on loading this JSON into a Dataframe. It seems obvious that we can’t utilize this Dataframe in any way since there are no columns or indexes to play around with.

<figure>

![](/media/whats-wrong-with-python-pandas-11.png)

</figure>

### Pythonic Solution

A pythonic solution to this problem is to loop through each item on JSON and use the flattened items to create a Dataframe.

```
data = None  
with open(PATH_TO_DATA) as json_data:  
data = json.load(json_data)  
data = [d["node"] for d in data]  
df = pd.DataFrame(data)  
df.head()
```

<figure>

![](/media/whats-wrong-with-python-pandas-12.png)

</figure>

The result seems much better than the one we had previously. But we still are losing the important information to nested dictionaries. The keys `author and virtuals are still nested.`For example, we cannot solve the following use cases

1.  Group blogs by the user.
2.  Find the avg number of claps.
3.  Find Avg Reading time for blogs written by users.

We can’t achieve these unless we flatten to the level of `users` and `virtuals.` Relying on the pythonic way becomes complicated since it means you are looping over all keys at all levels

### Using json_normalize

Pandas provides a method called `json_normalize` that normalizes(flattens) dictionaries at all the levels.

```
import json  
data = None  
**# Read data into a dictionary**  
with open(PATH_TO_DATA) as json_data:  
    data = json.load(json_data)
```
```
**# Normalize using json_normalize**  
df = json_normalize(data)  
df.head()
```

<figure>

![](/media/whats-wrong-with-python-pandas-13.png)

</figure>

Though it might have sounded like a feasible solution, it comes with its own set of problems.

1.  **Column Names — **The column names are the path to keys in the nested dictionaries. For you to access an element from the Dataframe you need to know the entire path. This becomes a huge pain when the nesting goes to N-levels and you have to do grouping on the same.

```
df["node.virtuals.previewImage.imageId"]
```

2\. **Missing Customizations**

*   What if you want to stop normalizing at a particular level of the nesting.
*   What if you want to ignore certain keys while normalizing. (Ignore PreviewImage key from normalizing)
*   What if you want to normalize only specific keys
*   What if you want to start normalizing data at a particular level. (eg., create a DataFrame with virtuals alone)

This blog was originally published in [medium.com/@bhavaniravi](https://medium.com/@bhavaniravi)
