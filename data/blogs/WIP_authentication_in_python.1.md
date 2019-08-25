---
slug: "authentication-in-python"
published_date: 2019-08-26
created_date: 2019-08-26
title: "Authentication Systems In Python"
template: "post"
draft: true
description: "Authentication is a concept of ensuring that the right people gets access to the information. The age old concept of lock and key has evolved into todays multi-variant authentication systems"
subtitle: "A blog to help you understand authentication systems in detail"
tags: ["Python", "Redis", "Distributed Systems", "memcaches", "Caching"]
featuredImgPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9h6iIiO_eWQ6phlajVLhXFsbvxd-tW5f4bnjmpkWEx8UMpCP6MA"
isexternal: true
---

# Authentication In Python
> All data sent to clients over public links should be considered "tainted" and all input should be rigorously checked. SSL will not solve problems of authentication nor will it protect data once it has reached the client. Consider all input hostile until proven otherwise and code accordingly.

## Authorization Header

## Basic Authentication

- Done using email and password
- Don't send raw string
- Convert them to encoded strings for servers to decode
- Even the encoded string needs to transfer over an SSL
- The disadvantage is that server has no control over when can a client logout
- Had to be done for every API call

## Cookie/Session Based Authentication
- Instead of sending it in auth header we send it as form params
- SSL is imporant 
- Password should be encoded in UI inspite of SSL
- On authenticating a cookie is sent as a response
- Set the cookie in auth header for future request
- Enables state maintainence in a stateless system
- Suitable for a single domain system
- Does not need additional logic in client side
- CAPTCHA

## Token Based Authentication
- User submits user name and password
- Returns a singed token JWT 
- Use the token to authorize future requests
- Doesn't need a DB
- Used in mobile apps
- Suitable for a multi domain system
- Immune to XSRF

## JWT 

## OAuth

## OAuth2

## Two Factor Authentication
- OTP
- Email Link
- Google Authenticator

## SSO

## QR Based Authentication

## Authorization

## Access-Control

## Authentication As a Service
- Where to place the service
- How to scale authentication
- Avoid bottlenecks

## Authentication Protocol and It's Types 
- SAML

## Resources
1. [https://cybersecurity.ieee.org/blog/2016/06/02/design-best-practices-for-an-authentication-system/](https://cybersecurity.ieee.org/blog/2016/06/02/design-best-practices-for-an-authentication-system/)
2. [http://ijcsit.com/docs/Volume%207/vol7issue4/ijcsit2016070406.pdf](http://ijcsit.com/docs/Volume%207/vol7issue4/ijcsit2016070406.pdf)
3. [https://swoopnow.com/web-application-authentication-best-practices/](https://swoopnow.com/web-application-authentication-best-practices/)
4. [https://cheatsheetseries.owasp.org/](https://cheatsheetseries.owasp.org/)
