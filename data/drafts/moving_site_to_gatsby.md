---
slug: "moving-site-to-gatsby"
published_date: 2019-02-18T10:31:00.813Z
created_date: 2019-02-18T10:31:00.813Z
title: "Planning to Switch Site From Html to Gatsby?"
template: "post"
draft: false
description: "List of problems I faced when I built my portfolio with Gatsby and ReactJS"
subtitle: "AList of problems I faced when I built my portfolio with Gatsby and ReactJS"
tags: ["Javascript", "frontend", "portfolio", "ReactJs", "Gatsby"]
featuredImgPath: https://cdn-images-1.medium.com/max/1200/1*h1pmDDz3GBKLcgZCPHl4dw.png
---
# Planning to Switch Site From Html to Gatsby?
> _List of problems I faced when I built my portfolio with Gatsby and ReactJS_

<figure name="fa07" id="fa07" class="graf graf--figure graf--layoutOutsetCenter graf-after--p">

<div class="aspectRatioPlaceholder is-locked" style="max-width: 1032px; max-height: 576px;">![](https://cdn-images-1.medium.com/max/1200/1*h1pmDDz3GBKLcgZCPHl4dw.png)</div>

</figure>

The days of WordPress days are all gone now. Even after being a backend developer for 3 years, playing around with PHP still haunts me. I think this is true for most of the Python developers out there. Also, who would want a heavy site for a single page portfolio right?

### Why I Hate Wordpress?

1.  Well, Duh… It’s PHP
2.  I moved my blogs to medium, hence all I wanted was a lightweight single page site.
3.  Now that the blogs are moved to medium, I no longer have to host my site anywhere, meaning I don’t have to pay a server.
4.  At a point, the amount of time I spent with figuring out a plugin, and a template was so much that I decided I would be well off writing things on my own.

### Why Gatsby?

1.  Gatsby is a [React](https://reactjs.org/docs/getting-started.html)-based, [GraphQL](https://graphql.org/learn/) powered static site generator. Around the same time, I wanted to learn what’s what of ReactJS
2.  Though it’s a static site generator, it comes with a provision to write and host blogs. Just in case I change my mind in future I don’t have to do a complete revamp.
3.  The community is big. So if you get stuck somewhere and raise a question, Tada… will get help instantly.

### 5 Things to Keep in Mind

#### 1\. The template

I was hunting for a template that fits my personality and finally landed up in one which was completely written in HTML, CSS, and JS. I converted most of the HTML to react components but, converting the JS code to React was something that I struggled with. _Don’t Judge me I have no prior React experience._

For eg., The navigation bar controls are controlled by Bootstrap’s JS files. In order to incorporate those functionalities, I had to use [ReactStrap](https://reactstrap.github.io), a React plugin with Bootstrap components.

<figure name="3776" id="3776" class="graf graf--figure graf-after--p">

<div class="aspectRatioPlaceholder is-locked" style="max-width: 210px; max-height: 397px;">![](https://cdn-images-1.medium.com/max/800/1*y7aIih4dsFZcX2BxUwu7xA.png)</div>

</figure>

**How did it look on my template?**

<pre name="4130" id="4130" class="graf graf--pre graf-after--p"><nav class="navbar navbar-expand-lg navbar-light"></pre>

<pre name="3b24" id="3b24" class="graf graf--pre graf-after--pre">....  
</nav></pre>

**How I had to change it?**

<pre name="5d56" id="5d56" class="graf graf--pre graf-after--p">class ExtendedNavbar extends React.Component{  
    toggle() {  
         this.setState({  
             isOpen: !this.state.isOpen  
         });  
    }</pre>

<pre name="1aaa" id="1aaa" class="graf graf--pre graf-after--pre">render(){  
        <Navbar className="navbar-expand-lg" light={true}>  
            <NavbarToggler className="navbar-toggler" onClick={this.toggle}/>  
            <Collapse isOpen={this.state.isOpen} navbar id="navbarSupportedContent">  
                <Nav className="nav navbar-nav menu_nav ml-auto" navbar>...</Nav>  
            </Collapse>  
       </Navbar>  
}</pre>

#### 2\. Where’s my CSS

All that Gatsby exposes is an `index.js`file which contains a root component. For someone from a pure HTML background, I didn’t know where to add the raw CSS, I tried to add it as react imports but it threw errors at random places.

But then, I found [React Helmet](https://github.com/nfl/react-helmet) where you can add your CSS and bam !!! I could see the styles applied.

<pre name="7956" id="7956" class="graf graf--pre graf-after--p"><Helmet>  
        <title>My Title</title>  
        <meta name="description" content="Helmet application" />  
        <link to css1>  
        <link to css2>  
</Helmet></pre>

#### 3\. It works, but with a delay

I added the CSS as a part of React helmet and I could see colors on my screen. I was happy only for a day. The next day, one of my friends pointed out that my CSS is loading but with a delay and I need to fix it and it is a big deal. I went around blogs after blogs trying to fix it.

Since I was using React-helmet, The browser waits until all the React components render and then applies styles to them. The only way to fix it was to find the `<head>` tag and stick the CSS links in there. But Gatsby’s `index.js` you only render the component that needs to go into the body of your site. ie., you won’t see the usual structure of a web page which looks like this.

<pre name="1ae8" id="1ae8" class="graf graf--pre graf-after--p"><html>  
    <head></head>  
    <body></body>  
</html></pre>

Finally one of the blogs asked me to just copy the `html.js` from the default template and put it on my `src` folder. Yay!!! Now I could see `<html>` tag. Now I know where to exactly stick those CSS links.

#### 4\. Production to performance

All good. Now, It was set for production. I hosted it with GitLab pages. Things looked good but it took forever to load the page. It is a big deal because, if the page doesn’t load in 2 secs people are going to just leave. I was trying everything possible but the Google lighthouse was spitting at me for poor performance.

At a point, I gave up and cried for help, and then I found out what the issue was. It was [GitLab](https://medium.com/u/68f5136d3254)’s pages, the free hosting they provide sucks. So I had to move it from [GitLab](https://medium.com/u/68f5136d3254) to [Netlify](https://medium.com/u/5250f9d9bd2f) and guess what? Life’s Good again.

#### 5\. GraphQL

Learning GraphQL after having a hand in MongoDB was not a big deal. But GraphQL does not have a select all `select * from blogs` kind of query. Hence, you have to explicit about the parameters you want from the JSON data.

<pre name="d515" id="d515" class="graf graf--pre graf-after--p"><StaticQuery query={graphql`  
     query {  
        site {  
          siteMetadata {  
             projects{  
                 name  
                 description  
                 skills  
             }  
         }  
     }  
</StaticQuery></pre>

For eg., If I add URL to the projects, then I have to specify it in the static query for it to fetch the URL param.

There were times where I would add an additional parameter to the `siteMetaData` and refresh the site a million times, scratching my head what’s gone wrong.

The takeaway, apparently I won’t be a bad full-stack developer, but I prefer backend because that is where my heart is.

<figure name="8fd9" id="8fd9" class="graf graf--figure graf--iframe graf-after--p">

> [](https://twitter.com/BhavaniRavi_/status/1082530131216719872)

</figure>

**_Check out the portfolio at_ **[**_bhavaniravi.com_**](http://bhavaniravi.com)**_._**

<footer>

[Canonical link](https://medium.com/@bhavaniravi/creating-a-portfolio-with-gatsby-and-reactjs-beware-caa290aa5c00)

Exported from [Medium](https://medium.com) on June 1, 2019.

</footer>