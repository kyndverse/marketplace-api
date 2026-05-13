# Product

## Add Product

Untuk menambah produk baru.

- Endpoint: `POST /api/products`

**Request body:**

```json
{
  "name": "Aqua galon",
  "categoryId": "cuid....",
  "description": "Air minum aqua",
  "costPrice": 22000,
  "salePrice": 25000,
  "stock": 5
}
```

**Response data:**

```json
{
  "code": 201,
  "status": "CREATED",
  "data": {
    "id": "cuid....",
    "name": "Aqua galon",
    "category": {
      "id": "cuid...",
      "name": "Minuman"
    },
    "description": "Air minum aqua",
    "imageUrl": null,
    "imageId": null,
    "costPrice": 22000,
    "salePrice": 25000,
    "stock": 5,
    "createdAt": "",
    "updatedAt": ""
  }
}
```

---

## Edit Product

Untuk mengubah informasi produk.

- Endpoint: `PUT /api/products/:id`

**Request body:**

```json
{
  "name": "Aqua galon",
  "categoryId": "cuid....",
  "description": "Air minum berkualitas tinggi",
  "costPrice": 22000,
  "salePrice": 25000,
  "stock": 5
}
```

**Response data:**

```json
{
  "code": 201,
  "status": "CREATED",
  "data": {
    "id": "cuid....",
    "name": "Aqua galon",
    "category": {
      "id": "cuid...",
      "name": "Minuman"
    },
    "description": "Air minum berkualitas tinggi",
    "imageURL": null,
    "imageId": null,
    "costPrice": 22000,
    "salePrice": 25000,
    "stock": 5,
    "createdAt": "",
    "updatedAt": ""
  }
}
```

---

## Edit Product Image

Untuk mengubah foto product.

> Request menggunakan multipart/form-data.

- Endpoint: `PATCH /api/products/:id/image`

**Form Data**

| Field   | Type   | Keterangan                                            |
| ------- | ------ | ----------------------------------------------------- |
| `image` | `file` | Wajib. Format: `png`, `jpeg`, `jpg`, `webp`. Maks 2MB |

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "id": "cuid....",
    "name": "Aqua galon",
    "imageURL": "https://cdn....",
    "imageId": "randomId"
  }
}
```

---

### Delete product

Untuk menghapus produk.

- Endpoint: `DELETE /api/products/:id`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "message": "Delete product successfully!"
}
```

---

## Get All Product

Untuk mendapatkan semua data produk.

- Endpoint: `GET /api/products?page=1&limit&10`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": [
    {
      "id": "cuid....",
      "name": "Aqua galon",
      "category": {
        "id": "cuid...",
        "name": "Minuman"
      },
      "description": "Air minum berkualitas tinggi",
      "imageURL": null,
      "imageId": null,
      "costPrice": 22000,
      "salePrice": 25000,
      "stock": 5,
      "createdAt": "",
      "updatedAt": ""
    }
  ],
  "meta": {
    "page": 1, // Halaman saat ini
    "limit": 10, // Jumlah item per halaman
    "totalPages": 20 // Total halaman
  }
}
```

---

## Get Product By Id

Untuk mendapatkan semua data produk.

- Endpoint: `GET /api/products/:id`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": [
    {
      "id": "cuid....",
      "name": "Aqua galon",
      "category": {
        "id": "cuid...",
        "name": "Minuman"
      },
      "description": "Air minum berkualitas tinggi",
      "imageURL": null,
      "imageId": null,
      "costPrice": 22000,
      "salePrice": 25000,
      "stock": 5,
      "createdAt": "",
      "updatedAt": ""
    }
  ]
}
```