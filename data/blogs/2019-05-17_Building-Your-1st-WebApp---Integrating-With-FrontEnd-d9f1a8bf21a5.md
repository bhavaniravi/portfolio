---
slug: "building-your-1st-webapp-integrating-with-frontend"
published_date: 2019-05-17T02:53:27.342Z
created_date: 2019-05-17T02:53:27.342Z
title: "Building Your 1st WebApp — Integrating With FrontEnd"
template: "post"
draft: false
description: "This is the 3rd blog in Building Your 1st WebApp with Python series. In the first blog, we saw how to orchestrate and design a backend system, write Python Flask code to expose REST APIs followed by…"
subtitle: "
How to Integrate Backend APIs to ReactJS Frontend.
"
tags: [JavaScript,Learning To Code,Programming,Reactjs,Front End Development]
featuredImgPath: /media/building-your-1st-webapp-integrating-with-frontend-featured.png
---
# Building Your 1st WebApp — Integrating With FrontEnd

_How to Integrate Backend APIs to ReactJS Frontend._

This is the 3rd blog in _Building Your 1st WebApp with Python series._ [In the first blog, we saw how to orchestrate and design a backend system](https://medium.com/@bhavaniravi/learn-reactjs-by-building-a-chat-frontend-2d8fe664276e?source=your_stories_page---------------------------), write Python Flask code to expose REST APIs followed by [how to split a frontend design and arrive at a react UI.](https://medium.com/@bhavaniravi/learn-reactjs-by-building-a-chat-frontend-2d8fe664276e)

In this session/blog we are going to integrate it to a Frontend ReactJS app. Getting it one step closer to your users.

Now, I am not a Frontend developer. I might not be the best at teaching the best practices. So what I did is I have researched for years(just did a Google search) and found the best tutorial(The first Github repo) for you to get started.

You might be urged to run away at this point. But remember, I just gave away my hack to you. If you suck at something, say CSS, don’t start with an empty slate. Search for a clean, documented codebase from Github and play around with it.

For the simplicity of this exercise, I had forked the code and removed the complicated parts.

The final output we are looking for looks something like this.

<figure>

![](/media/building-your-1st-webapp-integrating-with-frontend-featured.png)

</figure>

## Before Moving On

Though the blog is aimed to be beginner friendly, you need to do some work before moving on.

1.  Do you know python?
2.  Have you tried and implemented flask backend from the previous blog.
3.  Do you know React? — At least what setState does?

_WARNING !!! — Don’t put yourself through the frustration of not understanding anything without the pre-requisites._

## Let’s Begin

At this point, I’m assuming and praying to all gods that you had read and tried out the first blog because from here where it gets a bit steeper.

1.  Fork and [Clone the repo](https://github.com/kabirbaidhya/react-todo-app)
2.  cd react-todo
3.  `npm install`
4.  `npm start`

It will start your development server. On your browser, open `localhost:3000` and ta-da you will already see a fully functioning To-do App. But don’t get too excited already. Add a couple of items and refresh the page, It’s gone, isn’t it. That is why you need a backend system coupled with a DB. To persist the Data that we enter.

## What’s In the Code?

```
react-todo-app  
    |___ node_modules    # virtualenv for JS apps  
    |___ public          # rendered react items are in public  
    |___ src             # Actual code you write  
         |__ assests     # all the images, icons required  
         |__ components  # Common items like textbox, buttons are   
                         # designed and maintatined for reuse
```
```
 |__ service     **# business logic handler**  
    |__ index.js         # Entry point of the app
```

Though it seems like a lot, we are going to focus only on a single folder `src and index.js.` Index.js is the starting point of the application. The file has nothing much more than linking to `<App/>` Let’s see what `App.js` got.

```
class App extends Component {  
     render() {  
         return (  
              <StateProvider>  
                    <TodoList/>  
              </StateProvider>  
          );  
}}
```

On digging deeper into each of these elements `StateProvider, TodoList` you will see how the components come together to form this beautiful UI.

<figure>

![](/media/building-your-1st-webapp-integrating-with-frontend-1.png)

</figure>

Just like you see, the main component `StateProvider` is not in the picture. It is a wrapper that gives the state of the data to all the other components. In React terms this is called Context. [To learn more about Context Check the official blog here.](https://reactjs.org/docs/context.html)

## Integration

We just saw how the UI is orchestrated into different react components and how the `StateProvider` wraps them around with required data( \`state\` )

Before we move on to the code, let’s list out the APIs we need and write a utility to consume them.

1.  On opening the app for the first time we would call `/todo` GET API to list all the todo items created.

```
export function getAll() {  
    return service.get(BASE_URL + `/todo`, { data: {} })  
})
```

2\. On typing out a todo item and press enter, it should call our flask API — `/todo POST with the params {"title": <todo item name>}`

```
export function addToList(list, data) {  
     return service.post(BASE_URL + `/todo`,   
                         { body: JSON.stringify(data)})  
}
```

3\. On clicking the checkbox, we would update the todo item’s `{is_done:true}` using `/todo/todo_id` PUT API

```
export function updateStatus(itemId, completed) {  
    return service.put(BASE_URL + `/todo/` + itemId,   
            {body: JSON.stringify({"_is_done":completed})})  
}
```

4\. On Clicking delete, we would use `/todo/<todo_id> DELETE` API to delete the item

```
export function deleteItemService(itemId) {  
     return service.delete(BASE_URL + `/todo/` + itemId, {})  
}
```

So we redid the 4 major functions which contribute to the data part of the todo. Now every time someone enters a todo item, it gets stored in a DB.

Here is the repo I forked and integrated with the backend, go ahead clone it and plug it in with the backend we wrote last time.


