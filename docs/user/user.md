# User

## Update user profile

Untuk melakukan edit profile user yang login

- Endpoint: `POST /api/users`

**Request body:**

```json
{
  "fullname": "John updated",
  "phoneNumber": "08....",
  "address": "Jakarta"
}
```

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "fullname": "John updated",
    "phoneNumber": "08....",
    "address": "Jakarta"
  }
}
```

---
