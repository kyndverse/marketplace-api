# Analytics

## Get Monthly Sales Report

- Endpoint: `GET /api/analytics/revenue/monthly`

**Query Parameters**

| Parameter | Type   | Required | Description        |
| --------- | ------ | -------- | ------------------ |
| year      | number | Yes      | Untuk Tahun Berapa |

**Response data:**

```json
{
  {
    "code": 200,
    "status": "OK",
    "data": [
        {
            "month": "Jan",
            "revenue": 0,
            "volume": 0
        },
        {
            "month": "Feb",
            "revenue": 0,
            "volume": 0
        },
        {
            "month": "Mar",
            "revenue": 0,
            "volume": 0
        },
        {
            "month": "Apr",
            "revenue": 0,
            "volume": 0
        },
        {
            "month": "Mei",
            "revenue": 0,
            "volume": 0
        },
        {
            "month": "Jun",
            "revenue": 0,
            "volume": 0
        },
        {
            "month": "Jul",
            "revenue": 0,
            "volume": 0
        },
        {
            "month": "Agu",
            "revenue": 0,
            "volume": 0
        },
        {
            "month": "Sep",
            "revenue": 0,
            "volume": 0
        },
        {
            "month": "Okt",
            "revenue": 0,
            "volume": 0
        },
        {
            "month": "Nov",
            "revenue": 0,
            "volume": 0
        },
        {
            "month": "Des",
            "revenue": 0,
            "volume": 0
        }
    ]
}

}
```

---

## Get Monthly Sales Report

- Endpoint: `GET /api/analytics/top-product`

**Response data:**

```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "productId": "cuid....",
    "productName": "Beras",
    "totalSold": 3
  }
}
```
