# Udacity Cloud Developer - Capstone project
Cloud Developer - Capstone project

# Introduction
A serverless Notes API that allows the consumer of the API: 
* To get the list of Notes.
* Create a new Note.
* Update an existing Note. 
* Attach an image to Note, 
* Delete a Note.
* Search for a Note.

# Implementation details
* NodeJS application written in Typescript.
* Serveless framework is used for AWS Lambda deployment.
* Elasticsearch is used for the search feature.

# Testing
* A Postman collection is provided in the root folder including a valid JWT token.

# Rubric requirements

Functionality criteria
* The application allows users to create, update, delete items
* The application allows users to upload a file.
* The application only displays items for a logged in user.
* Authentication is implemented and does not allow unauthenticated access.

Codebase criteria
* The code is split into multiple layers separating business logic from I/O related code.
* Code is implemented using async/await and Promises without using callbacks.
  
Best practices criteria
* All resources in the application are defined in the "serverless.yml" file
* Each function has its own set of permissions.
* Application has sufficient monitoring.
* HTTP requests are validated

Architecture criteria
* Data is stored in a table with a composite key.
* Scan operation is not used to read data from a database.