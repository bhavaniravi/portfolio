---
slug: reactjs-buttons-cheatsheet
published_date: 2019-05-19T13:46:45.147Z
created_date: 2019-05-19T13:46:45.147Z
title: ReactJS Buttons CheatSheet
template: post
draft: false
description: >-
  Most frontend devs life revolves around creating components and styling them.
  Me as a backend dev, found myself going through 4–5 StackOverflow links before
  I could get a single button component up…
subtitle: ' Using buttons? You got them all here '
tags:
  - web development
  - front end development
  - reactjs
  - learn
  - learn to code
featuredImgPath: /media/reactjs-buttons-cheatsheet-featured.jpg
---
# ReactJS Buttons CheatSheet

### Using buttons? You got them all here

Most frontend devs life revolves around creating components and styling them. Me as a backend dev, found myself going through 4–5 StackOverflow links before I could get a single button component up and running. Here is a list of basic operations.

### Create New React Project

```
npx create-react-app react_button_cheatsheet
```

### How to Create a Button

<figure>

![](/media/reactjs-buttons-cheatsheet-0.png)

</figure>

```
class UpgradedButton extends React.Component{  
     render(){  
          <button>Submit</button>  
     }  
}
```

### Make It Look Pretty

<figure>

![](/media/reactjs-buttons-cheatsheet-1.png)

</figure>

```
const StyledButton = styled.button`  
    position: absolute;  
    height: 10%;  
    width: 10%;  
    top: 50%;  
    left:50%;  
    font-size: 2.6vmin;  
    cursor: pointer;  
    box-shadow: rgba(255, 255, 255, 0.05) 0px 3px 20px;  
    border-width: initial;  
    background-color: grey;  
    color: white;  
    border-style: none;  
    border-color: initial;  
    border-image: initial;  
    outline: none;  
`
```
```
// change this line in UpgradedButton  
// <button>Submit</button>  
<StyledButton>Submit</StyledButton>
```

### Change Color OnHover

Add this to the style components’ CSS string

<figure>

![](/media/reactjs-buttons-cheatsheet-2.png)

</figure>

```
const StyledButton = styled.button`  
    ...  
    ...  
    ...  
    &:hover {  
       background-color: #445b65;  
       color: white;  
    }  
`
```

### Handle Onclick event

<figure>

![](/media/reactjs-buttons-cheatsheet-3.png)

</figure>

```
handleClick = () => {  
    console.log("Button clicked...")  
}
```
```
...  
...
```
```
<Button onClick={this.handleClick}>Submit</Button>
```

### Change Text OnClick

```
handleClick = () => {  
   buttonText = this.state.buttonText == "Start" ? "Stop" : "Start"        
   this.setState({buttonText: buttonText})  
}
```

### The Complete Code

```
import React from 'react'
import styled, { css } from 'styled-components'


const Button = styled.button`
  position: absolute;
  height: 10%;
  width: 10%;
  top: 50%;
  left:50%;
  font-size: 2.6vmin;
  cursor: pointer;
  box-shadow: rgba(255, 255, 255, 0.05) 0px 3px 20px;
  border-width: initial;
  background-color: grey;
  color: white;
  border-style: none;
  border-color: initial;
  border-image: initial;
  outline: none;
  &:hover {
        background-color: #445b65;
        color: white;
  }
`

export default class UpgradedButton extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        buttonText: "Start"
      }
    }

    handleClick = () => {
      console.log("Button clicked...")
      let buttonText = this.state.buttonText == "Start" ? "Stop" : "Start"
      this.setState({buttonText: buttonText})
    }

    render(){
      return (
        {this.state.buttonText}
      )
    }
}
```


