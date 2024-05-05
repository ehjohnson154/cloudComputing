# Assignment 2

The goal of this assignment is to start using a real database to store
application data.  The assignment requirements are listed below.

You are provided some starter code in this repository that implements a
solution to assignment 1.  The starter code's API server is implemented
in `server.js`, and individual routes are modularized within the `api/`
directory.  Tests and a testing environment for the API are included in
the `tests/` directory.  You can import these tests into either Postman
or Insomnia and build on them if you like.  Note that, depending on
where you're running your API server, you may need to update the
`baseUrl` variable in the included testing environment to reflect the
URL for your own server.

The starter code also includes an `openapi.yaml` file in the `public/`
directory.  You can import this file into the OpenAPI editor at
https://editor.swagger.io/ to generate documentation for the server to
see how its endpoints are set up.

Feel free to use this code as your starting point for this assignment.
You may also use your own solution to assignment 1 as your starting
point if you like.

## Use a database to power your API

Your overarching goal for this assignment is to modify the API server to
use a database to store the following resources:

  * Businesses
  * Reviews
  * Photos

You may choose either MySQL or MongoDB for this purpose (or another DB
implementation you're interested in, with permission).  Whichever
database you choose, it should completely replace the starter code's
existing JSON/in-memory storage for these resources.  In other words,
you should update all API endpoints in the original starter code to use
your database.

You should use the [official MySQL Docker
image](https://hub.docker.com/_/mysql/) or the [official MongoDB Docker
image](https://hub.docker.com/_/mongo) from Docker Hub to power your
database.  Whichever database you choose, your implementation should
satisfy the criteria described below.

## Database initialization

Before you run your application for the first time, you'll have to make
sure your database is initialized and ready to store your application
data.  Use the mechanisms described below to initialize your database
when you launch the database container, so the database is ready to use
when you launch your app.

### MySQL

If you're using MySQL, you should make sure to set the following
environment variables when launching your database container:

  * `MYSQL_ROOT_PASSWORD` - This specifies the password that is set for
    the MySQL `root` user.  You can also use
    `MYSQL_RANDOM_ROOT_PASSWORD` to allow the container to generate a
    random password.

  * `MYSQL_DATABASE` - This specifies the name of a MySQL database to be
    created when your container first starts.

  * `MYSQL_USER` and `MYSQL_PASSWORD` - These are used to create a new
    user, in addition to the `root` user, who will have permissions only
    for the database named in `MYSQL_DATABASE`.  This is the user you
    should use to connect to your database from your API server.

If you use Sequelize to interact with your MySQL database, Sequelize
will handle the creation of tables for you.

### MongoDB

If you're using MongoDB, you should make sure to set the following
environment variables when launching your database container:

  * `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_USERNAME` -
    These are used to create the MongoDB `root` user.

  * `MONGO_INITDB_DATABASE` - This specifies the name of a MongoDB
    database to be created when your container first starts.

**While it is a security risk to do so in a production setting**, it's
fine if you interact with the database from your API server as the ROOT
user for this assignment.  Because MongoDB generally uses a "create on
first use" approach, you won't have to worry about initializing
collections.

## Database organization

Your database should store all resource data (i.e. businesses, photos,
and reviews) for the API.  Because the resources you're working with are
closely tied to each other (e.g. each review is tied to both a specific
business and a specific user), you'll have to think carefully about how
you organize and access them in your database.  Some suggestions are
included below for each database.

### MySQL

If you're using MySQL, you will likely want to use [foreign
keys](https://dev.mysql.com/doc/refman/8.0/en/example-foreign-keys.html)
to link reviews and photos to their corresponding business.  If you're
using Sequelize, you can use
[associations](https://sequelize.org/docs/v6/core-concepts/assocs/) to
automatically manage foreign keys for you.

### MongoDB

If you're using MongoDB, there are many valid ways to organize data in
your database.  For example, you could use three separate collections to
store businesses, reviews, and photos.  In this case, you can either use
[`$lookup`
aggregation](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/)
or multiple queries to gather data for a specific business (i.e. for the
`GET /businesses/{id}` endpoint).

Alternatively, you could store all photos and reviews as subdocuments of
their corresponding business document.  In this case, you'll likely want
to use [a
projection](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/)
to omit the photo and review data from businesses when returning a list
of all businesses (i.e. from the `GET /businesses` endpoint).  You'll
also have to think carefully about how you find data for a specific
user, e.g. a specific user's photos or reviews.  Do do this, you can use
[subdocument array
queries](https://docs.mongodb.com/manual/tutorial/query-array-of-documents/)
to select businesses with reviews/photos by the specified user, and then
you can use some custom JS to select only matching reviews/photos from
those businesses.  Alternatively, you can use MongoDB's [aggregation
pipeline](https://docs.mongodb.com/manual/core/aggregation-pipeline/) to
structure a single query to fetch exactly the reviews/photos you're
interested in.

## Connecting the API server to your database

Your API server should read the location (i.e. hostname, port, and
database name) and credentials (i.e. username and password) for your
database from environment variables.

## Docker Compose specification

You should write a simple Docker Compose specification that launches
your entire application (i.e. API server and database server) from
scratch with a single command.  Your Docker Compose specification in
this case will specify two containers, one running your API server and
one running your database server.

When defining your Compose specification, make sure to specify the
correct environment variables to initialize the database container and
to allow the API server to connect to the database container, and make
sure you publish the appropriate port(s) so you can communicate with
your API.  Note that there is already a Dockerfile in this repository
representing an image to run your API server, and you can reference this
Dockerfile within your Compose specification.

**It's a good idea to think about the Docker Compose specification as a
"production" version of your app.**  In other words, get your server
working the way you want them to *without* Docker before you worry about
getting things working with Compose.  It'll lengthen your development
cycle too much if you continually need to restart the Compose
application every time you make changes to your server code.

## Extra credit: Use Mongoose

[Mongoose](https://mongoosejs.com/) is an object modeling tool for
MongoDB that's very similar in spirit to Sequelize for MySQL.  If you
choose to use MongoDB as your database, you can earn up to 10 points of
extra credit by using Mongoose instead of the native MongoDB driver for
Node.js.  To earn this extra credit, you must use Mongoose for all of
your database interactions.

## Submission

Make sure your completed files are committed and pushed by the
assignment's deadline to the main branch of your GitHub repo. Check your
repo to make sure your files are submitted there.

## Grading criteria

This assignment is worth 100 total points, broken down as follows:

  * 20 points: chosen database runs in a Docker container that is
    correctly initialized (e.g. by using appropriate environment
    variables the first time the container is launched)

  * 60 points: all existing API endpoints in the starter code are
    modified to use your database

  * 10 points: database connection parameters are correctly provided to
    API server via environment variables

  * 10 points: a Docker Compose specification can be used to launch the
    entire application from scratch

As described above, you can also earn up to 10 points of extra credit
for using Mongoose in conjunction with MongoDB.
