## Table of Contents

- [Dev environment setup](#dev-environment-setup)
- [Configuration Setup](#configuration-setup)
- [Starting backend server](#starting-backend-server)
- [Api Documentation](#api-documentation)

## Dev environment setup

#### 1. Clone Github repo

Api Repo,
https://github.com/musa-33/blog-nestjs-mongodb.git


RabbitMQ Microservice Repo,
https://github.com/musa-33/notification-nestjs-microservice-rabbitmq.git

#### 2. Install node packages:

npm i

## Configuration Setup

Add following keys to .env file for api repo

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

And add following keys to .env file for rabbitMQ mc repo,

RABBIT_MQ_URI=amqp://localhost:5672

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
  `/api/comments/articles/:articleId` [POST],
   RabbitMQ microservice used for comment.
   After make comment, this comment emit notification to RabbitMQ microservice and there only log the comment.

7. User Profile Update: 
  `/api/users` [PATCH]
  body {
    "name": ""
  }

8. User Dashboard: 
  `/api/articles/dashboard` [GET]
