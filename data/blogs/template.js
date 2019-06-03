module.exports = {
    render: function(data) {
      var published_date = null
      if (data.published){
        published_date = String(data.published)

      }
      var template = `\
---
slug: "${data.titleForSlug}"
published_date: ${published_date}
created_date: ${published_date}
title: "${data.title}"
template: "post"
draft: ${data.draft}
description: "${data.description}"
subtitle: "${data.subtitle}"
tags: [${data.tags.join(',')}]
featuredImgPath: .${data.featuredImgPath}
---
${data.body}

This blog was originally published in [medium.com/@bhavaniravi](https://medium.com/@bhavaniravi)
`;
  
      return template;
    },
    getOptions: function() {
      return {
        folderForEachSlug: false,
        imagePath: "media", // <img src="/media/[filename]" >. Used in the markdown files.
        // This field is ignored when folderForEachSlug:true. Should be absolute. Location where medium images will be saved.
        imageFolder: '/Users/Bhavani/apps/myportfolio/static/media', 
        defaultCodeBlockLanguage: 'python', // code fenced by default will be ``` with no lang. If most of your code blocks are in a specific lang, set this here.
      };
    },
  };

