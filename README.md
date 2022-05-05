
# Spontan

  

Spontan is a backend application for planning and managing events

  

## Run command

  

Use the package manager [npm](https://www.npmjs.com/) to install Spontan packages

```bash

npm install

```

  

To start Spontan server on your local machine, run

  

```bash

npm start

```

  

## Tools

* [Javascript](https://www.javascript.com/)

* [MongoDB](https://www.mongodb.com)

* [Node JS](https://nodejs.org/en/)

* [Express](https://expressjs.com/)

* [Mongoose](https://mongoosejs.com/)

* [Jwt](https://jwt.io/)

* [BCrypt](https://www.npmjs.com/package/bcrypt)

* [Morgan](https://www.npmjs.com/package/morgan)

* [Body Parser](https://www.npmjs.com/package/body-parser)

* [Nodemon](https://www.npmjs.com/package/nodemon)

  
  

## Routes

  

| Route             | headers                | body params                                                                                            | endpoint   | verb   |
|-------------------|------------------------|--------------------------------------------------------------------------------------------------------|------------|--------|
| Sign up           |                        | { email: String, name: String, password: String }                                                      | /signup    | post   |
| Login             | x-access-token: String | { email: String, password: String }                                                                    | /login     | post   |
| Create Event      | x-access-token: String | { id: String, title: String, time: Long, description: String, cover_color: String, cover_image: String } | /event     | post   |
| Update Event      | x-access-token: String | { id: String, title: String, time: Long, description: String, cover_color: String, cover_image: String } | /event     | put    |
| Get all events    | x-access-token: String |                                                                                                        | /event     | get    |
| delete event      | x-access-token: String | {id: String}                                                                                           | /event     | delete |
| delete all events | x-access-token: String |                                                                                                        | /event/all | delete |
  
  
  

## License

[Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)