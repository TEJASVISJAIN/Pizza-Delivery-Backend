# Pizza-Delivery-Backend

# Backend API Documentation

## Introduction

This backend API provides a RESTful interface for managing users and orders. It uses Express.js for routing and handling HTTP requests, and it connects to a MySQL database for data storage. The API is designed to demonstrate how to set up an Express application with MySQL and how to create and manage users and orders.

## API Endpoints

### `/signup`

- **Method**: `POST`
- **Description**: Create a new user in the database.
- **Request Body**:
  - `name`: User's name (required)
  - `email`: User's email (required)
  - `password`: User's password (required)
  - `address`: User's address (required)
- **Response**:
  - If successful, the server responds with a 201 status code and a JSON object containing a message.
  - If an error occurs, the server responds with a 500 status code and a JSON object containing an error message.

### `/login`

- **Method**: `POST`
- **Description**: Log in to the application and receive a JSON Web Token (JWT).
- **Request Body**:
  - `email`: User's email (required)
  - `password`: User's password (required)
- **Response**:
  - If the login is successful, the server responds with a 200 status code and a JSON object containing a JWT.
  - If the login fails, the server responds with a 401 status code and a JSON object containing an error message.

### `/orders`

- **Method**: `GET`
- **Description**: Retrieve all orders for the logged-in user from the database.
- **Request Headers**:
  - `Authorization`: A valid JWT token.
- **Response**:
  - If successful, the server responds with a 200 status code and a JSON object containing an array of orders.
  - If an error occurs, the server responds with a 500 status code and a JSON object containing an error message.

### `/orders`

- **Method**: `POST`
- **Description**: Create a new order for the logged-in user in the database.
- **Request Body**:
  - `pizzaId`: ID of the pizza (required)
  - `quantity`: Quantity of the pizza (required)
  - `address`: Delivery address (required)
- **Response**:
  - If successful, the server responds with a 201 status code and a JSON object containing the new order.
  - If an error occurs, the server responds with a 500 status code and a JSON object containing an error message.

### `/orders/:orderId`

- **Method**: `PUT`
- **Description**: Update the status of an existing order in the database.
- **Request Body**:
  - `status`: New status for the order (required).
- **Request Headers**:
  - `Authorization`: A valid JWT token.
- **Response**:
  - If successful, the server responds with a 200 status code and a JSON object containing the updated order.
  - If an error occurs, the server responds with a 500 status code and a JSON object containing an error message.

### `/orders/:orderId`

- **Method**: `DELETE`
- **Description**: Delete a specific order from the database.
- **Request Headers**:
  - `Authorization`: A valid JWT token.
- **Response**:
  - If successful, the server responds with a 200 status code and a JSON object containing the deleted order.
  - If an error occurs, the server responds with a 500 status code and a JSON object containing an error message.

## Technologies Used

- Express.js for routing and handling HTTP requests.
- MySQL for data storage.
- JSON Web Tokens (JWT) for authentication and authorization.

## Notes

- Use the `/signup` endpoint to create a new user in the database.
- Use the `/login` endpoint to log in and receive a JWT token.
- Use the `/orders` endpoint to retrieve, create, update, and delete orders for the logged-in user.
- The `Authorization` header should be set to `Bearer <JWT_TOKEN>` for all protected endpoints.

For more information on using the API, please refer to the API documentation above.

Citations:
[1] https://www.smashingmagazine.com/2020/04/express-api-backend-project-postgresql/
[2] https://expressjs.com
[3] https://expressjs.com/en/starter/hello-world.html
[4] https://www.freecodecamp.org/news/how-to-build-a-backend-application/
