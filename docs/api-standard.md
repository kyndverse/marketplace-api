# API Standard Response

---

## Success Response

```ts
{
  code: Number;          // Http status code
  status: string;        // Reason phrase
  message?: string;
  data: Record<string, any> | Record<string, any>[];
  meta?: {
    page: number;        // Halaman saat ini
    limit: number;       // Jumlah item per halaman
    totalPages: number;  // Total halaman
  };
}
```

> `message` dan `meta` bersifat opsional. `meta` hanya disertakan pada response yang bersifat paginated. Data bisa null.

---

## Failed Response

### Validation Error

Digunakan ketika request body/params gagal validasi schema.

```ts
{
  code: boolean;
  status: string;
  errors: {
    field_name: [Error Messages];
  };
}
```

**Contoh:**

```json
{
  "code": 400,
  "status": "BAD_REQUEST",
  "errors": {
    "email": ["Email tidak valid"],
    "password": ["Password minimal 6 karakter", "must be a string"]
  }
}
```

---

### HTTP Exception

```ts
{
  code: boolean;
  status: string;
  errors: string; // Deskripsi singkat error
}
```

**Contoh:**

```json
{
  "code": 409,
  "status": "CONFLICT",
  "errors": "Email has already exist"
}
```
