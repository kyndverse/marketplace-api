# Category

## Create Category

Untuk membuat jenis kategori baru.

- Endpoint: `POST /api/category`

**Request Body:**

```json
{
  "name": "Elektronik"
}
```

**Response data:**

```json
{
  "code": 201,
  "status": "CREATED",
  "data": {
    "id": "cuid....",
    "name": "Elektronik",
    "slug": "elektronik"
  }
}
```

---

## Edit Category

Untuk mendapatkan semua jenis kategori.

- Endpoint: `PUT /api/category`

**Request Body:**

```json
{
  "name": "Minuman"
}
```

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "id": "cuid....",
    "name": "Minuman",
    "slug": "minuman"
  }
}
```

---

## Delete Category

Untuk mendapatkan semua jenis kategori.

- Endpoint: `DELETE /api/category/:id`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "message": "Delete category successfully!"
}
```

---

## Get All Category

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
      "slug": "elektronik",
      "description": "",
      "createdAt": "",
      "updatedAt": ""
    },
    {
      "id": "cuid....",
      "name": "Sembako",
      "slug": "sembako",
      "description": "",
      "createdAt": "",
      "updatedAt": ""
    }
  ]
}
```
