# Timeline Entries

## 2025-06-04

**Title** Playing with n8n

- Setup n8n and tried first workflow for email analyzer. Template [link](https://n8n.io/workflows/3169-ai-email-analyzer-process-pdfs-images-and-save-to-google-drive-telegram/)

## 2025-06-05

**Title**: Working on AI

- Built n8n workflow to get top reddit post and send it to telegram. Copied from [here](https://www.youtube.com/watch?v=D2Y9FKvVUig)

## 2025-06-06

**Title**: Paperless-ngx discovery

- I have paperless-ngx hosted on my homelab for about few weeks now and I was playing with mail service. So when I receive any email with attachment it will automatically save it here. Feels mind blowing

## 2025-06-09

**Title**: WWDC26

- Watched Apple WWDC and impressed with iPadOS and other few launches. Before launch it seems like this is the year they will have big changes but then everything seems meh. Already saw lot of criticism and some love for new glass design. Let's see how it will improve by the time for public launch

## 2025-06-10

**Title**: Update maps.varunyadav.com

- Today I updated the maps application use Open Street Maps instead of google maps and also made it little nicer by adding emojis as marker. Idea is to use OSM so that I don't incur charges for Google Maps API if lot of people started using it

## 2025-06-12

**Title**: Updating til.varunyadav.com

- It started when yesterday I saw video on view transition and I want to implement that in this project. I created this nextjs app 4 years ago and it was using page router instead of app router and view transition package is supporting app router as now. So updated whole app to current standard and spent whole day on that.

## 2025-06-13

**Title**: Adding privacy content to til.varunyadav.com with [c15t](c15t.com)

- In this week react weekly email I saw c15t and I was like what's the timing and it's good package for privacy content which works offline for my use case. Also I learned about f5bot today to track keywords in Reddit, Hacker News, etc. Really interesting now I know how indie hackers know when their product is mentioned.

## 2025-07-01

**Title**: Working on Receipt Manager deployment

- Learned about [unregistry](https://github.com/psviderski/unregistry). I had this problem last week where my Compute VM didn't have enough CPU to build docker image. Workaround solution is to build locally and then push it. So I asked Cursor to write a script which works really well and then I came across unregistry. Will give it a try because it's very simple solution. Need to check edge cases but otherwise looks straight fwd

## 2025-07-10

**Title**: Working on Receipt Manager deployment

- Past few days I have made significant updates to the application, like sharing receipt, create folders and handle PDF. It's been roller coaster when adding complexity- I use Cursor for writing code and it makes lot of big changes to the application even when not needed. After long battle when all the features are working figure out it is making way to many calls in Firebase so went on another battle to reduce calls, cache data when needed. Currently I am the only user but it sure does feels good to make good app which I can see myself using on regular basis. Well today I learned about Oracle SQLcl MCP and used that to connect to Oracle ATP 23ai to create tables and ORDS. It is amazing how easy it is for database noobs like me to work on DB

## 2025-07-11

**Title**: Exploring MCPs and Node packages

- Last night before sleep I thought of what if there is Firebase MCP and there is official [MCP](https://firebase.google.com/docs/cli/mcp-server). It will be hopefully easy now to debug when working on it. Also I came across nextjs [boilerplate](https://github.com/ixartz/Next-js-Boilerplate?tab=readme-ov-file) and I saw two packages [lefthook](https://lefthook.dev/) and [knip](https://knip.dev/) which I think will use going on in next projects. lefthook is alternative for husky and is built on Go so it's fast and uses yaml config which I find easy. knip looks for packages and code which are unused in the project so kind of like linter but I like the feature it checks for package import.
