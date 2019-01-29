import React from "react"
import PropTypes from "prop-types"
import {withPrefix} from "gatsby"

export default class HTML extends React.Component {
  // componentDidMount() {
  //   if (typeof twttr.widgets !== 'undefined') {
  //     twttr.widgets.load()
  //   }
  // }

  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Bhavani's Portfolio</title>
          <meta name="description" content="A Backend engineer with crazy passion for products" />
          <meta property="og:title" content="Bhavani Ravi" />
          <meta property="og:description" content="A Backend engineer with crazy passion for products" />
          <meta property="og:image" content="https://lh3.googleusercontent.com/aY8naX5H-Hat2L6sSCLNAO9V2GvUrseQpTQBDlC1b86xglhp9_melAQzgFfraZAc7gRz5NAEm2rRM4H6emuGHuoWmYrWobl_lXrUUKExWRuGfu7MeB9Wn5HbhIoSyMpBMdmz54Uonjk3ipnqHfgFvnsaxhTm5ucxsbhGgllbd36FS3hW1-RQ7VkyoCSVrGVVOVHAsgV85yHkc-oRQoNDkWkAmQ0UZFOtYpt-JkiQObCym8w2TBEIq-WLpjoaOwBC0Jmf6A7z9fnC11PZqff4CDYPuvvCT9VBoECAMH_Vf1oAivnR4rtr8tlIH9O1UnfKTmQ9oitBopFVh40BYhFGa5cLhQnzTqqRkTkEvtyFzLKXR51nRkMvTAShdqa9zXP4WNWu7Ap7Xq5LbtrjWykcoAKZjZ0UlGDa-tjc05nZKfCwcZ6n9H634VKPf0srw1NtubX3nXaxzJyPBj42MmIojUoXuummrios140eh1Thrpp7Kw7p68ibXmcBiGLLG38jZH51GkNOUGqmRdomt1ZlIeQN0YNYA5ksmNk0B03gx5eWwfVyUQOcLqOnz_4hw-n31ZTAY45uPE909gluJ0miQZwXKMDD34d1qx5eqb7nHSQJW9dgxew-aRBRBZ78tLzxQ4nAcXbDbvpBTbTuYFRPpht4=w483-h369-no"/>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="https://lh3.googleusercontent.com/aY8naX5H-Hat2L6sSCLNAO9V2GvUrseQpTQBDlC1b86xglhp9_melAQzgFfraZAc7gRz5NAEm2rRM4H6emuGHuoWmYrWobl_lXrUUKExWRuGfu7MeB9Wn5HbhIoSyMpBMdmz54Uonjk3ipnqHfgFvnsaxhTm5ucxsbhGgllbd36FS3hW1-RQ7VkyoCSVrGVVOVHAsgV85yHkc-oRQoNDkWkAmQ0UZFOtYpt-JkiQObCym8w2TBEIq-WLpjoaOwBC0Jmf6A7z9fnC11PZqff4CDYPuvvCT9VBoECAMH_Vf1oAivnR4rtr8tlIH9O1UnfKTmQ9oitBopFVh40BYhFGa5cLhQnzTqqRkTkEvtyFzLKXR51nRkMvTAShdqa9zXP4WNWu7Ap7Xq5LbtrjWykcoAKZjZ0UlGDa-tjc05nZKfCwcZ6n9H634VKPf0srw1NtubX3nXaxzJyPBj42MmIojUoXuummrios140eh1Thrpp7Kw7p68ibXmcBiGLLG38jZH51GkNOUGqmRdomt1ZlIeQN0YNYA5ksmNk0B03gx5eWwfVyUQOcLqOnz_4hw-n31ZTAY45uPE909gluJ0miQZwXKMDD34d1qx5eqb7nHSQJW9dgxew-aRBRBZ78tLzxQ4nAcXbDbvpBTbTuYFRPpht4=w483-h369-no"/>
          <meta name="twitter:site" content="@geeky_bhavani" />
          <meta name="twitter:creator" content="@geeky_bhavani" />
          <link rel="shortcut icon" href="/img/preview_icon/favicon.ico" type="image/x-icon" />
          {this.props.headComponents}


        <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css"/>
        <link rel="stylesheet" type="text/css" href="/css/style.css"/>
        <link rel="stylesheet" type="text/css" href="/css/responsive.css"/>


        {/* <link rel="stylesheet" href="/vendors/owl-carousel/owl.carousel.min.css"/> */}
    
        

        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>

        <link rel="stylesheet" type="text/css" href="/css/font-awesome.min.css"/>
        <link rel="stylesheet" type="text/css" href="/css/medium_blog.css"/>
        <link rel="stylesheet" href="/vendors/flaticon/flaticon.css"></link> 
        <link rel="stylesheet" href="/vendors/linericon/style.css"/>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
