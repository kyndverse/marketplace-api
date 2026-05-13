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
    "slug": "elektronik",
    "description": "Semua barang elektronik",
    "createdAt": "DATE",
    "updatedAt": "DATE"
  }
}
```

---

## Edit Category

Untuk mendapatkan semua jenis kategori.

- Endpoint: `PATCH /api/category/:id`

**Request Body:**

```json
{
  "name": "Minuman",
  "description": "listrik"
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
    "slug": "minuman",
    "description": "Semua barang listrik",
    "createdAt": "DATE",
    "updatedAt": "DATE"
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
  ],
  "meta": {
    "page": 1, // Halaman saat ini
    "limit": 3, // Jumlah item per halaman
    "totalPages": 20 // Total halaman
  }
}
```
