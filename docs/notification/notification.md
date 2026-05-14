# Notification

## Get All Notification

Untuk mendapatkan semua notif berdasarkan user yang sedang login.

- Endpoint: `GET /api/notifications`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": [
    {
      "id": "cuid....",
      "createdAt": "",
      "title": "Pesanan siap!",
      "detail": "Silahkan ambil ditoko",
      "isRead": false
    }
  ]
}
```

---

## Send Notification

Untuk mengirim notifikasi ke customer.

- Endpoint: `POST /api/notifications`

**Request body:**

```json
{
  "userId": "cuid....",
  "title": "Pesanan siap!",
  "detail": "Silahkan ambil ditoko"
}
```

**Response data:**

```json
{
  "code": 201,
  "status": "CREATED",
  "data": {
    "id": "cuid....",
    "createdAt": "",
    "title": "Pesanan siap!",
    "detail": "Silahkan ambil ditoko",
    "isRead": false
  }
}
```

---

## Update Read Notification

Untuk menandai notification menjadi telah dibaca.

- Endpoint: `PATCH /api/notifications/:id/read`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "id": "cuid....",
    "createdAt": "",
    "title": "Pesanan siap!",
    "detail": "Silahkan ambil ditoko",
    "isRead": true
  }
}
```

---

## Read All Notification

Untuk menandai semua notifikasi menjadi telah dibaca.

- Endpoint: `PATCH /api/notifications/read-all`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "message": "Read all notification successfully!"
}
```
