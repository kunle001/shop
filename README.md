### Simple Store API Documentation

## Overview

This documentation outlines the features and implementation details of a Simple Shop API designed for managing products. The API provides functionalities such as creating, updating, deleting, and retrieving products. Additionally, it includes a tested authentication system allowing users with different permissions to perform actions based on their roles. 

## Authentication System

The API implements a robust authentication system (json web token) to secure endpoints and manage user permissions. Key features include:

- **User Roles:**
  - **Admins:** Have access to protected routes, including creating, updating, and deleting products.
  - **Other Users:** Have restricted access based on their roles.

## Error Handling

Error handling is a crucial aspect of the API, and it leverages a custom npm package which i designed, [@kunleticket/common](https://www.npmjs.com/package/@kunleticket/common),developed specifically for this purpose, you can check out the documentation and codes through the link.

### Installation

To install the error handling npm package, run the following command:

```bash
npm install @kunleticket/common
```

### Usage

The package is utilized for various middleware functions, enhancing the API's reliability:

- **Request Validation:**
  - Ensures proper validation of user request bodies to maintain data integrity.

- **Authentication Middleware:**
  - Validates user sessions/tokens, allowing access to routes requiring authentication.

## Testing

The API has undergone rigorous testing to ensure its robustness. All test codes are located in the "__test__" folders, with the test setup available in the "test" folder.
Testing was done using jest and super test.

to run tests , clone this repo, 
Run 

```bash 
npm install //to install all necessary packages
```
set environmental variables, E.g PORT, JWT_KEY of your choice and then run 

```bash 
npm test //This will trigger all the tests.
```
there are abou 22 tests in total.

To Run the Tests completely go to the app.ts file comment out line 42 to 45 , where i added rate limiting, so all tests can run successfully

## Security Measures

To enhance security, all incoming requests are sanitized, mitigating the risk of database injection attacks.

Also i encoporated rate limiter, which minimizes traffic or API attacks resulting from spamming.

## API Endpoints

### Product Management

#### 1. Creating a Product

- **Endpoint:**
  - `POST /api/v1/products`

- **Access:**
  - Admins only.

- **Request Body:**
  - name, price, description,category.

- **Example:**
  ```json
  {
    "name": "Product Name",
    "price": 29.99,
    "category": "products category",
    "description": "Product Description"
  }
  ```

#### 2. Updating a Product

- **Endpoint:**
  - `PATCH /api/v1/products/:productId`

- **Access:**
  - Admins only.

- **Request Parameters:**
  - `productId`: ID of the product to be updated.

- **Request Body:**
  - name, price, description,category.

- **Example:**
  ```json
  {
    "name": "Updated Product Name",
    "price": 39.99,
    "description": "Updated Product Description"
  }
  ```

#### 3. Deleting a Product

- **Endpoint:**
  - `DELETE /api/v1/products/:productId`

- **Access:**
  - Admins only.

- **Request Parameters:**
  - `productId`: ID of the product to be deleted.

### Error Responses

- **Example:**
  ```json
  {
    "error": {
      "message": "Unauthorized Access",
      "code": 401
    }
  }
  ```

#### Docker

The image is on docker hub, you can pull the image by running this command

```docker
docker pull kkunle/product_store:latest
```

#### Postman Documentation
You can find the entire Post man collection here
[documentation](https://documenter.getpostman.com/view/22302216/2s9YeD9Df6)

## Conclusion

The Simple Shop API provides a secure and well-tested solution for managing products with a user-friendly authentication system. For any questions or issues, refer to the provided test codes, contact the developer, or explore the [npm package](https://www.npmjs.com/package/@kunleticket/common).