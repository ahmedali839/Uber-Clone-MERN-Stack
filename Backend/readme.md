# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. This endpoint validates the input, hashes the password, creates a user, and returns an authentication token along with the user data.

## Request Body

The request body must be a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "string (min 3 characters, required)",
    "lastname": "string (min 3 characters, required)"
  },
  "email": "string (valid email, min 5 characters, required)",
  "password": "string (min 6 characters, required)"
}
```

### Example

```
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Responses

- **201 Created**
  - User registered successfully.
  - Response body:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "_id": "60f7c2b5e1b1c8a1b8e4d123",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
        // ...other user fields
      }
    }
    ```

- **400 Bad Request**
  - Validation failed. Returns an array of error messages.
  - Response body:
    ```json
    {
      "errors": [
        { "msg": "First name must be at least 3 character long", "param": "fullname.firstname", "location": "body" },
        { "msg": "Invalid Email", "param": "email", "location": "body" }
      ]
    }
    ```

## Notes
- All fields are required.
- The email must be unique.
- Passwords are securely hashed before storage.

---

# User Login Endpoint Documentation

## Endpoint

`POST /users/login`

## Description

Authenticates a user with email and password. Returns an authentication token and user data if credentials are valid.

## Request Body

The request body must be a JSON object with the following structure:

```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 characters, required)"
}
```

### Example

```
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Responses

- **200 OK**
  - Login successful.
  - Response body:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "_id": "60f7c2b5e1b1c8a1b8e4d123",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
        // ...other user fields
      }
    }
    ```

- **400 Bad Request**
  - Validation failed. Returns an array of error messages.
  - Response body:
    ```json
    {
      "errors": [
        { "msg": "Invalid Email", "param": "email", "location": "body" },
        { "msg": "Password must be at least 6 character long", "param": "password", "location": "body" }
      ]
    }
    ```

- **401 Unauthorized**
  - Invalid email or password.
  - Response body:
    ```json
    {
      "message": "Invalid email or password user"
    }
    ```
    or
    ```json
    {
      "message": "Invalid email or password match"
    }
    ```

## Notes
- Both fields are required.
- Returns a JWT token on successful login.

---

# User Profile Endpoint Documentation

## Endpoint

`GET /users/profile`

## Description

Returns the authenticated user's profile information. Requires a valid authentication token (JWT) in the request cookies or Authorization header.

## Authentication
- Requires authentication (JWT token in cookie or `Authorization: Bearer <token>` header).

## Responses

- **200 OK**
  - Returns the user's profile data.
  - Example response:
    ```json
    {
      "_id": "60f7c2b5e1b1c8a1b8e4d123",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // ...other user fields
    }
    ```

- **401 Unauthorized**
  - If the token is missing or invalid.
  - Example response:
    ```json
    {
      "message": "Authentication required"
    }
    ```

---

# User Logout Endpoint Documentation

## Endpoint

`GET /users/logout`

## Description

Logs out the authenticated user by clearing the authentication token cookie and blacklisting the token. Requires a valid authentication token (JWT).

## Authentication
- Requires authentication (JWT token in cookie or `Authorization: Bearer <token>` header).

## Responses

- **200 OK**
  - Logout successful.
  - Example response:
    ```json
    {
      "message": "Logged Out"
    }
    ```

- **401 Unauthorized**
  - If the token is missing or invalid.
  - Example response:
    ```json
    {
      "message": "Authentication required"
    }
    ```

## Notes
- Both endpoints require the user to be authenticated.
- Logout will invalidate the current token for future requests.

---








# Captain Registration Endpoint Documentation

## Endpoint

`POST /captains/register`

## Description

Registers a new captain in the system. This endpoint validates the input, hashes the password, creates a captain with vehicle information, and returns an authentication token along with the captain data.

## Request Body

The request body must be a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "string (min 3 characters, required)",
    "lastname": "string (min 3 characters, required)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 characters, required)",
  "vehicle": {
    "color": "string (min 3 characters, required)",
    "plate": "string (min 3 characters, required)",
    "capacity": "number (min 1, required)",
    "vehicleType": "string (one of: car, motorcycle, auto, required)"
  }
}
```

### Example

```
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "securePassword456",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Responses

- **201 Created**
  - Captain registered successfully.
  - Response body:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "captain": {
        "_id": "60f7c2b5e1b1c8a1b8e4d456",
        "fullname": {
          "firstname": "Jane",
          "lastname": "Smith"
        },
        "email": "jane.smith@example.com",
        "vehicle": {
          "color": "Red",
          "plate": "XYZ123",
          "capacity": 4,
          "vehicleType": "car"
        }
        // ...other captain fields
      }
    }
    ```

- **400 Bad Request**
  - Validation failed or captain already exists. Returns an array of error messages or a message.
  - Response body (validation error):
    ```json
    {
      "errors": [
        { "msg": "Color must be at least 3 characters", "param": "vehicle.color", "location": "body" },
        { "msg": "Invalid Email", "param": "email", "location": "body" }
      ]
    }
    ```
  - Response body (captain exists):
    ```json
    {
      "message": "Captain already exist"
    }
    ```

## Notes
- All fields are required.
- The email must be unique.
- Passwords are securely hashed before storage.
- Vehicle information is required for captain registration.

