## Authentication

Protected endpoints use **JWT Bearer Authentication**.

Include the token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

---

### Register

Register a new user account.

- Endpoint: `POST api/auth/register`

**Request Body**

| Field      | Type     | Validation                   |
| ---------- | -------- | ---------------------------- |
| `fullname` | `string` | Required                     |
| `email`    | `string` | Required, valid email format |
| `password` | `string` | Required, min 6 characters   |

**Example Request**

```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Example Response Data**

```json
{
  "code": 201,
  "status": "CREATED",
  "message": "Register successfully!",
  "data": {
    "id": "cmnvnjq3w0000agf0v29sbp49",
    "fullname": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Login

Authenticate a user and retrieve an access token.

- Endpoint: `POST api/auth/login`

**Request Body**

| Field      | Type     | Validation                   |
| ---------- | -------- | ---------------------------- |
| `email`    | `string` | Required, valid email format |
| `password` | `string` | Required, min 6 characters   |

**Example Request**

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Example Response Data**

```json
{
  "code": 200,
  "status": "OK",
  "message": "Login successfully!",
  "data": {
    "user": {
      "id": "cmnvnjq3w0000agf0v29sbp49",
      "fullname": "John Doe",
      "email": "john@example.com"
    },
    "access_token": "eabcdopewrybsdfdsmnfiass...."
  }
}
```

---

### OAuth Google

Initiates Google OAuth2 login flow. **Redirects the user to Google's official login page**.

- Endpoint: `GET api/auth/google`

**Response after callback**

- Redirect : `https://front_end_domain/dashboard?token=<access_token>`

---

### Get User Profile

Untuk mendapat data user profil.

- Endpoint: `GET /api/auth/me`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "id": "cuid....",
    "fullname": "Putri",
    "phoneNumber": "0....",
    "email": "putri@example.com",
    "address": "address....",
    "imageUrl": "https://....",
    "emailVerified": false
  }
}
```
