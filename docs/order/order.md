# Order

## Create Order

Untuk melakukan order.

- Endpoint: `POST /api/orders`

**Request Body:**

```json
{
  "items": [
    {
      "productId": "Aqua Galon",
      "quantity": 1
    }
  ],
  "paymentMethod": "CASH"
}
```

**Response data:**

```json
{
  "code": 201,
  "status": "CREATED",
  "data": [
    {
      "id": "cuid....",
      "createdAt": "createdAt",
      "orderStatus": "PENDING",
      "paymentStatus": "PENDING",
      "paymentMethod": "CASH",
      "totalAmount": 25000,
      "paymentProof": null,
      "items": [
        {
          "id": "cuid....",
          "name": "Aqua Galon",
          "price": 25000,
          "quantity": 1,
          "imageUrl": "https://...."
        }
      ]
    }
  ]
}
```

---

## Get Order History

Untuk mendapatkan history order user yang sedang login.

> Jika role admin maka dapat melihat semua order history sedangkan role customer maka hanya dapat melihat order history dirinya sendiri.

- Endpoint: `GET /api/orders`

**Query Parameters**

| Parameter | Type   | Required | Default | Description                   |
| --------- | ------ | -------- | ------- | ----------------------------- |
| page      | number | No       | 1       | Page number for pagination    |
| limit     | number | No       | 10      | Number of items per page      |
| status    | string | No       | -       | Filter orders by order status |

status: `PENDING, PROCESSING, READY, COMPLETED, CANCELLED`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": [
    {
      "id": "cuid....",
      "createdAt": "createdAt",
      "orderStatus": "PENDING",
      "paymentStatus": "PENDING",
      "paymentMethod": "TUNAI",
      "totalAmount": 25000,
      "paymentProof": null,
      "items": [
        {
          "id": "cuid....",
          "name": "Aqua Galon",
          "salePrice": 25000,
          "quantity": 1,
          "imageUrl": "https://...."
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

> Info: Ada tambahan field user jika rolenya admin:

```json
{
  "user": {
    "id": "cuid....",
    "fullname": "Putri",
    "email": "putri@gmail.com",
    "phoneNumber": null,
    "imageUrl": null
  }
}
```

---

## Update Order Status

Untuk edit status order tertentu.

- Endpoint: `PATCH /api/admin/orders/:id/status`

**Request Body:**

```json
{
  "status": "READY"
}
```

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "id": "cuid....",
    "status": "READY",
    "updatedAt": "updatedAt"
  }
}
```

---

## Update Payment Status

Untuk edit status pembayaran order tertentu.

- Endpoint: `PATCH /api/admin/orders/:id/payment-status`

Payment status : `PENDING, WAITING_VERIFICATION, PAID, REJECTED`

**Request Body:**

```json
{
  "paymentStatus": "WAITING_VERIFICATION"
}
```

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "id": "cuid....",
    "paymentStatus": "WAIT_VERIFICATION",
    "updatedAt": "updatedAt"
  }
}
```

---

## Upload Payment Proof

Untuk upload bukti pembayaran QRIS.

> Request menggunakan multipart/form-data.

- Endpoint: `PATCH /api/orders/:id/payment-proof`

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
    "paymentProof": "https://....",
    "paymentProofId": "public_id"
    "updatedAt": "updatedAt"
  }
}
```
