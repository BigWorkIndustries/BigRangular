# BIG Rangular

Yet another Ruby on Rail, Angular, and Webpack boilerplate.

This README documents steps are necessary to get the
application up and running.

## System dependencies
  * Angular 1.6.1
  * Ruby 2.3.1
  * Ruby on Rails 5.0.1
  * Postgres SQL
  * Webpack
  * Angular Material
  * NPM

## Configuration

## Database
    * create: ```rake db:create```
    * initialize: ```rake db:migrate && rake db:seed```

## Local Development Environment
    * initialize: ```cd client && npm install```
    * start back end Rails server
    * start web client server: ```cd client && npm start```
    * Default Login: test@test.com:aaaaaaaa

* How to run the test suite
    * Rspec: TBD
    * Angular: ```cd client && npm test```

* Services (job queues, cache servers, search engines, etc.)
    * TBD

* Deployment instructions
    * ```cd client && npm run build```
    * ```git add. && git commit -am "new produciton build" && git push```

