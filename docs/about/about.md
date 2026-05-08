# About

> Berisi endpoint untuk mendapatkan config toko

## Get Market Detail Info

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