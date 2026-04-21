# API Documentation

## List

- [Auth](#authentication)
- [User](#user)
- [Order](#order)
- [About](#about)
- [Category](#category)

---

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
    "email": "putri@example.com",
    "fullname": "Putri",
    "role": "ADMIN",
    "phoneNumber": "0....",
    "imageUrl": "https://...."
  }
}
```

---

## Order

### Get All Order History

Untuk mendapatkan semua data order.

- Endpoint: `GET /api/orders?page=1&limit=3`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": [
    {
      "id": "cuid....", // Order
      "user": {
        "id": "cuid...",
        "email": "putri@example.com",
        "fullname": "Kinanthi Putri",
        "phoneNumber": "0...."
      },
      "totalAmount": 20000,
      "status": "PENDING",
      "createdAt": "....",
      "updatedAt": "....",
      "orderItem": [
        {
          "id": "cuid....", // Order item
          "quantity": 2,
          "costPrice": 9000,
          "salePrice": 10000,
          "product": {
            "id": "cuid...", // Product
            "name": "Nama barang",
            "description": "",
            "costPrice": 9000,
            "salePrice": 10000,
            "stock": 4,
            "imageUrl": "https://....",
            "category": {
              "name": "Elektronik" // Product category
            }
          }
        }
      ]
    }
  ],
  "meta": {
    "page": 1, // Halaman saat ini
    "limit": 3, // Jumlah item per halaman
    "totalPages": 20 // Total halaman
  }
}
```

---

### Get Order Histories By User Id

Untuk mendapatkan data riwayat order user tertentu.

- Endpoint: `GET /api/orders/:id`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": [
    {
      "id": "cuid....", // Order
      "totalAmount": 20000,
      "status": "PENDING",
      "createdAt": "...",
      "updatedAt": "...",
      "orderItem": [
        {
          "id": "cuid....", // Order item
          "quantity": 2,
          "costPrice": 9000,
          "salePrice": 10000,
          "product": {
            "id": "cuid...", // Product
            "name": "Nama barang",
            "description": "",
            "costPrice": 9000,
            "salePrice": 10000,
            "stock": 4,
            "imageUrl": "https://....",
            "category": {
              "name": "Elektronik" // Product category
            }
          }
        }
      ]
    }
  ],
  "meta": {
    "page": 1, // Halaman saat ini
    "limit": 3, // Jumlah item per halaman
    "totalPages": 20 // Total halaman
  }
}
```

---

### Recent Order Order Histories

Untuk mendapatkan 3 pesanan terakhir user yang login.

- Endpoint: `GET /api/orders/recent-order`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": [
    {
      "id": "cuid....", // Order
      "totalAmount": 20000,
      "status": "PENDING",
      "createdAt": "...",
      "updatedAt": "...",
      "orderItem": [
        {
          "id": "cuid....", // Order item
          "quantity": 2,
          "product": {
            "name": "Nama barang"
          }
        }
      ]
    }
  ]
}
```

---

## About

> Berisi endpoint untuk mendapatkan config toko

### Get Market Detail Info

Untuk mengetahui toko buka atau tidak.

- Endpoint: `GET /api/about`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "isOpen": "true"
  }
}
```

---

## Category

### Get All Category

Untuk mendapatkan semua jenis kategory

- Endpoint: `GET /api/category`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": [
    {
      "id": "cuid....",
      "name": "Elektronik",
      "slug": "elektronik"
    },
    {
      "id": "cuid....",
      "name": "Sembako",
      "slug": "sembako"
    }
  ]
}
```

---
