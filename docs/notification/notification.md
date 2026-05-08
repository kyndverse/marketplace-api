# Notification

## GetAllNotificationByUserId

Untuk mendapatkan semua notif berdasarkan user yang sedang login

- Endpoint: `GET /api/notification/:id`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": [
    {
      "id": "cuid....",
      "userId": "cuid....",
      "createdAt": "",
      "title": "Pesanan siap!",
      "detail": "Silahkan ambil ditoko",
      "isRead": false
    }
  ]
}
```

## CreateNotfication

Untuk mendapatkan semua notif berdasarkan user yang sedang login

- Endpoint: `POST /api/notification/:id`


**Request body:**

```json
{
  "title": "Pesanan siap!",
  "detail": "Silahkan ambil ditoko",
}
```

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": [
    {
      "id": "cuid....",
      "userId": "cuid....",
      "createdAt": "",
      "title": "Pesanan siap!",
      "detail": "Silahkan ambil ditoko",
      "isRead": false
    }
  ]
}
```