## Table of Contents

- [Dev environment setup](#dev-environment-setup)
- [Configuration Setup](#configuration-setup)
- [Starting backend server](#starting-backend-server)
- [Api Documentation](#api-documentation)

## Dev environment setup

#### 1. Clone Github repo

https://github.com/musa-33/blog-nestjs-mongodb.git

#### 2. Install node packages for backend:

The following commands assumes the repo is installed at path `~/blog-nestjs-mongodb`.  

2. Install packages for app.

cd ~/blog-nestjs-mongodb
npm i

## Configuration Setup

Add following key to .env file

PORT=3400
MONGODB_URI=mongodb://localhost:27017/blog
JWT_EXPIRATION=6000
JWT_SECRET=JWT_SECRET

RABBIT_MQ_URI=amqp://localhost:5672
RABBIT_MQ_NOTIFICATION_QUEUE=notification

ELASTICSEARCH_NODE=http://localhost:9200
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=admin

REDIS_HOST=localhost
REDIS_PORT=6379

### Starting backend server

npm run start:dev


### Api Documentation

Here are the following endpoint, 

1. SignUp
  `/api/users/signup` [POST]

2. Login 
  `/api/auth/login` [POST]
  body{
    "username": "",
    "password": ""
  }

3. Create Article:
  `/api/articles` [POST]

4. All articles view:
  `/api/articles` [GET]

5. Article Detail: 
  `/api/articles/:articleId` [GET]

4. Like / Dislike: 
  `/api/articles/:articleId/like` [POST]  
  `/api/articles/:articleId/like` [DELETE]

5. Category and Tag: 
  `/api/articles??category=4&tags=tag3` [GET]

6. Comments: 
  `/api/comments/articles/:articleId` [POST]

7. User Profile Update: 
  `/api/users` [PATCH]
  body {
    "name": ""
  }

8. User Dashboard: 
  `/api/articles/dashboard` [GET]