# About

> Berisi endpoint untuk mendapatkan config toko

## Get Market Open Information

Untuk mengetahui toko buka atau tidak.

- Endpoint: `GET /api/market/open`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": true
}
```

## Update Market Open Information

Untuk melakukan update toko buka atau tidak.

- Endpoint: `PATCH /api/market/toggle-open`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": false
}
```
