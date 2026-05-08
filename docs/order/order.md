# Order

## Get User Recent Active Order

Untuk mendapatkan 3 order yang sedang aktif berdasarkan user yang sedang login.

- Endpoint: `GET /api/orders/active`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": [
    {
      "id": "cuid....",
      "date": "createdAt",
      "status": "SEDANG DISIAPKAN",
      "statusCode": "PROCESSING",
      "product": "Minyak",
      "imageUrl": "https://cdn....",
      "additionalItems": 1,
      "total": 12000
    },
    {
      "id": "cuid....",
      "date": "createdAt",
      "status": "BELUM DISIAPKAN",
      "statusCode": "PENDING",
      "product": "Minyak",
      "imageUrl": "https://cdn....",
      "additionalItems": 3,
      "total": 160000
    }
  ]
}
```

---

## Get All Active Orders

Untuk mendapatkan semua order yang sedang aktif.

- Endpoint: `GET /api/orders?page=1&limit=3`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": [
    {
      "id": "cuid....",
      "date": "createdAt",
      "status": "SEDANG DISIAPKAN",
      "statusCode": "PROCESSING",
      "totalAmount": 25000,
      "items": {
        "id": "cuid....",
        "name": "Aqua Galon",
        "price": 25000,
        "quantity": 1,
        "imageUrl": "https://....",
      };
    },
  ],
  "meta": {
    "page": 1, // Halaman saat ini
    "limit": 3, // Jumlah item per halaman
    "totalPages": 20 // Total halaman
  }
}

```

---

## Get All Order History

Untuk mendapatkan semua data order (admin side).

- Endpoint: `GET /api/orders/admin?page=1&limit=3`

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

## Get Order Histories By User Id

Untuk mendapatkan data riwayat order user tertentu. Baik order aktif order masa lampau yang berhasil, dibatalkan dll.

- Endpoint: `GET /api/orders/:id?status=pending`

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