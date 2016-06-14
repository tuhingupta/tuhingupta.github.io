---
layout: page
title: Find Nearby Merchants with Yelp-Search
summary: Users and Merchants shouldn't have to find each other. Use Yelp-Search to easily connect the two!
date: 2016-06-14
author: Ace Ellett
permalink: /blogs/:year/:month/:day/:title/
---

We started working on Yelp-Search because we wanted to be able to connect our merchants and card-members. Specifically, we wanted to connect card-members with merchants that are _nearby_, in realtime ways that enhance the point-of-sale experience.

Yelp offers all sorts of interesting data in the domain that we're interested in;  We can easily find a merchant's location information, we can filter merchants by category, we can even present a list of merchants that has been ranked by the public!  All of this is avaialble through version 2.0 of Yelp's Search API.  Better yet, this API is well-documented and very developer friendly!

Unfortunately, when we looked at the options for using Yelp's Search API in a proof-of-concept iPhone app, we found them to be somewhat lacking.  We wanted to immediately dive into the merchant details, but we found that before we could really get started, we needed to generate a lot of boilerplate to describe the models in the API and then to make a few relatively simple network requests.

We decided to open source this framework so that any developer can move straight into implementing their business logic-- without caring about how they actually get merchant data from Yelp. We provide the structure of the search results that can be easiy read from, and we provide a very simple interface that allows the developer to query the Search API. Just follow the [README](https://github.com/americanexpress/yelp-search) and you'll have merchant search integrated into your app in no time!
