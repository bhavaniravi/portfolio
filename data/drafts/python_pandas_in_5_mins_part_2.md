---
slug: python-pandas-tutorial-part-2
published_date: 2019-02-07T10:31:00.748Z
created_date: 2019-02-07T10:31:00.748Z
title: Python Pandas In 5 minutes - Part 2
template: post
draft: false
description: >-
  In the last blog, I hope I have sold you the idea that Pandas is an amazing
  library for quick and easy data analysis and it’s much easier to use than you
  thought.
subtitle: _More use cases open up more functionalities.
tags:
  - python
  - machine learning
  - data science
  - data visualization
  - deep learning
featuredImgPath: 'https://cdn-images-1.medium.com/max/2560/1*DORL1J_q5VpQbj1IMxjcJw.png'
---
<header>

# Python Pandas In 5 Mins — Part 2
> _More use cases open up more functionalities._

<section data-field="description" class="p-summary">In the last blog, I hope I have sold you the idea that Pandas is an amazing library for quick and easy data analysis and it’s much easier to use than you thought.</section>

#### Use cases open up more functionalities

In the last blog, I hope I have sold you the idea that Pandas is an amazing library for quick and easy data analysis and it’s much easier to use than you thought. [If you have not read my first blog about Pandas, please go through it before you move forward.](https://medium.com/@bhavaniravi/python-pandas-tutorial-92018da85a33)

### Oops !! We missed Some Data

In the last blog, we saw basic Dataframe operations using sample sales data. Let’s assume you are a manager leading a sales team, and you were all happy about the sales trajectory and the pivot representation of the data you learned to create from our [last blog.](https://medium.com/@bhavaniravi/python-pandas-tutorial-92018da85a33)

<pre name="1c7e" id="1c7e" class="graf graf--pre graf-after--p">import numpy as np  
df.pivot_table(index=["Country"],   
               columns=["Region"],   
               values=["Quantity"],   
               aggfunc=[np.sum])</pre>

<figure name="7ca5" id="7ca5" class="graf graf--figure graf-after--pre">

<div class="aspectRatioPlaceholder is-locked" style="max-width: 513px; max-height: 326px;">![](https://cdn-images-1.medium.com/max/800/1*2Yzqv84C2dQ1H7ei46p4xw.png)</div>

<figcaption class="imageCaption">A simple pivot table</figcaption>

</figure>

That’s when you realize you have [missed sales data of a particular quarter](https://docs.google.com/spreadsheets/d/1VJNvRycV4T--Zjq915b0TCeo1C0FZZx9xaUdU2OJ9Fk/edit#gid=1973645975) because it was lost in one of the spreadsheets. Now, what do you do? You already have a report ready to go. How can you incorporate the new data into the current pivot representation without major changes?

<figure name="ed20" id="ed20" class="graf graf--figure graf-after--p">

<div class="aspectRatioPlaceholder is-locked" style="max-width: 610px; max-height: 435px;">![](https://cdn-images-1.medium.com/max/800/1*2wosYjyZukkLzRam_0hV-g.png)</div>

</figure>

If you see, the pivot table is constructed with a single Dataframe df, somehow if we can find a way to feed our new data into the `df` then we can just re-run the pivot code and voila!! we will get the report again.

So here are the steps we are going to follow,

#### 1\. Load the new spreadsheet data into a new Dataframe

<pre name="7c3e" id="7c3e" class="graf graf--pre graf-after--h4">df2 = pd.read_csv("data/Pandas - Q4 Sales.csv")  
df2.head()</pre>

#### 2\. Combine two Dataframe into a single `df` object,

**Using** `**concat**`

Pandas _Concat_ method concatenates the contents of multiple Dataframes and creates a new Dataframe.

The `axis` param of the method enables you to concatenate data along rows or columns

<pre name="e6b8" id="e6b8" class="graf graf--pre graf-after--p">result_df = pd.concat([df, df2], axis=0, sort=False)  
# axis = 0, append along rows,   
# axis = 1, append along cols</pre>

<pre name="87a4" id="87a4" class="graf graf--pre graf-after--pre">result_df.tail() # tail is similar to head returns last 10 entries</pre>

**Using** `**append**`

Unlike `concat` , the `append` method adds up data to an existing dataframe instead of creating a new Dataframe. Also, you can notice that we don’t supply any axis parameter here since append method only allows adding new entries as rows.

<pre name="5155" id="5155" class="graf graf--pre graf-after--p">result_df = df.append([df2],sort=False)  
result_df.tail()</pre>

If you take a closer look, in both cases, the data frames that need to be combined are supplied as a python list `[df1, df2].` This implies that we can combine as many Dataframes as we want

<figure name="9fa7" id="9fa7" class="graf graf--figure graf-after--p">

<div class="aspectRatioPlaceholder is-locked" style="max-width: 700px; max-height: 370px;">![](https://cdn-images-1.medium.com/max/800/1*sZBser6lydrrLqOU3QlqKw.png)</div>

</figure>

#### 3\. Re-run the pivot code

<pre name="cfe5" id="cfe5" class="graf graf--pre graf-after--h4">pivot = result_df.pivot_table(index=["Country"],   
                              columns=["Region"],   
                              values="Quantity")</pre>

<figure name="46da" id="46da" class="graf graf--figure graf-after--pre">

<div class="aspectRatioPlaceholder is-locked" style="max-width: 700px; max-height: 466px;">![](https://cdn-images-1.medium.com/max/800/1*T73GGsx5cakFKR7ubxKk8g.png)</div>

</figure>

### Charts are better than tables

You have a couple of hours for your final meeting. Your presentation is concrete, your sales are good but still, something is missing. **Charts.** For a management person who was so used to spreadsheets charts, leaving them behind is not a good idea. But, we have a short time to go back to spreadsheets, don’t we? Worry not, Pandas comes with a built-in charting framework which lets you draw graphs of our pivot representation

<figure name="6f84" id="6f84" class="graf graf--figure graf-after--p">

<div class="aspectRatioPlaceholder is-locked" style="max-width: 700px; max-height: 341px;">![](https://cdn-images-1.medium.com/max/800/1*u1U5Gh_Hfa6UOnvEtqfavg.png)</div>

</figure>

### Perfection

As a person who was known for your perfection something doesn’t sit well in you. One of the tabular representations that you have created has unnecessary information that doesn’t interest your management, and a couple of columns have names that are used internally in your company and will not ring any bell to the management.

Worry not, we can do it _all in one shot_ and pretty quick. In pandas terms, we call this method chaining.

_Method chaining enables you to perform a various transformation on the same data without storing the intermediate result._

1.  Explicit is better than implicit hence let’s **_rename “Total” to “Total Sales”_**
2.  We don’t need the date of purchase just the **_year_** and **_quarter_**
3.  We don’t need the requester of purchase, Salesperson, and Date of purchase. So let’s **_drop it._**

<pre name="72da" id="72da" class="graf graf--pre graf-after--li">result_df.rename({"Total": "Total Sales"}, axis=1)\  
         .assign(Quarter=result_df['Date of Purchase'].dt.quarter, \  
                 Year=result_df['Date of Purchase'].dt.year) \  
         .drop(["Requester", "Sales Person", "Date of Purchase"], axis=1).head()</pre>

<figure name="85c7" id="85c7" class="graf graf--figure graf-after--pre">

<div class="aspectRatioPlaceholder is-locked" style="max-width: 604px; max-height: 315px;">![](https://cdn-images-1.medium.com/max/800/1*NhFN6F7W5LOShm-SnIL0RQ.png)</div>

</figure>

### One Last Thing

With that, our final report looks good and guess what? Your management is not only happy about your sales this year but also excited about your new found love for Pandas, but there is just one last thing remaining, you need to send the final data as a CSV back to your management. But worry not we have pandas to do it for you.

<pre name="9662" id="9662" class="graf graf--pre graf-after--p">result_df.to_csv(path_or_buf="Export_Data.csv")</pre>

An _“Export_Data.csv”_ file would be created in your current path which you can happily send to your management as an email attachment.

</div>

</div>

</section>

<section name="85ef" class="section section--body">

<div class="section-divider">

* * *

</div>

<div class="section-content">

<div class="section-inner sectionLayout--insetColumn">

As you rest back on your seat, you want to automate the pandas experiment that you just did for the future sales reports. Thankfully, you have an intern who is joining you in a couple of days. It will be a great project for him to pick it up. Something in me tells that things aren’t going to be as easy as it was for you. which we will see in the next blog **_“What’s wrong with Pandas?”_**

</div>

</div>

</section>

<section name="418e" class="section section--body section--last">

<div class="section-divider">

* * *

</div>

<div class="section-content">

<div class="section-inner sectionLayout--insetColumn">

<figure name="ef59" id="ef59" class="graf graf--figure graf--layoutOutsetLeft graf--leading">

<div class="aspectRatioPlaceholder">![Image result for medium clap gif](https://cdn-images-1.medium.com/max/600/0*o8QzTSReld8b16s1)</div>

</figure>

_Did the blog nudge you to deep dive into pandas?_

**_Hold_** _the “claps” icon and give a shout on_ [_twitter_](https://twitter.com/@bhavaniravi)_._

**_Follow_** _to stay tuned on future blogs._

</div>

<div class="section-inner sectionLayout--fullWidth">

<figure name="d844" id="d844" class="graf graf--figure graf--layoutFillWidth graf-after--p graf--trailing">

<div class="aspectRatioPlaceholder is-locked">![](https://cdn-images-1.medium.com/max/2560/1*DORL1J_q5VpQbj1IMxjcJw.png)</div>

<figcaption class="imageCaption">Preview image with title</figcaption>


<footer>

[Canonical link](https://medium.com/@bhavaniravi/learn-pandas-via-usecases-part-2-e1503892191b)

</footer>