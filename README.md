# Simple Marketplace API

A REST API for a marketplace application built with **NestJS**. The application provides core marketplace functionality including authentication, product management, ordering, notifications, and analytics.

The API uses **PostgreSQL** as its primary database with **Prisma** for database access, while **Cloudinary** is used for image storage and delivery.

## Features

- Authentication and authorization
  - JWT authentication
  - Google OAuth 2.0
- User management
- Product management
- Category management
- Order management
- Notifications
- Marketplace information
- Analytics
- Image upload and storage
- PDF and Excel report generation
- Standardized API responses
- Application logging

---

## Tech Stack

### Core

| Technology     | Purpose                 |
| -------------- | ----------------------- |
| **NestJS**     | Backend framework       |
| **TypeScript** | Programming language    |
| **Prisma**     | ORM and database access |
| **PostgreSQL** | Relational database     |

### Authentication

| Technology           | Purpose                    |
| -------------------- | -------------------------- |
| **Passport**         | Authentication middleware  |
| **JWT**              | Token-based authentication |
| **Google OAuth 2.0** | Google authentication      |

### External Services

| Technology     | Purpose                    |
| -------------- | -------------------------- |
| **Cloudinary** | Image storage and delivery |

### Validation & Logging

| Technology            | Purpose             |
| --------------------- | ------------------- |
| **class-validator**   | Request validation  |
| **class-transformer** | Data transformation |
| **Winston**           | Application logging |

### Reporting

| Technology  | Purpose               |
| ----------- | --------------------- |
| **PDFKit**  | PDF generation        |
| **ExcelJS** | Excel file generation |

---

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js
- yarn
- PostgreSQL
- A [Cloudinary](https://cloudinary.com/) account

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd marketplace-api
```

Install dependencies:

```bash
yarn install
```

### Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL="postgresql://username:password@localhost:5432/pakjojon"

JWT_SECRET="your-jwt-secret"

CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="your-google-callback-url"
```

> The environment variables above are examples. Use the actual variables required by your application configuration.


### Database Setup

Run the database migrations:

```bash
yarn prisma migrate dev
```

Generate the Prisma Client:

```bash
yarn prisma generate
```

### Running the Application

Start the development server:

```bash
yarn start:dev
```

The API will be available at:

```text
http://localhost:<PORT>
```

For production:

```bash
yarn start:prod
```

---

## API Documentation

API documentation is organized by resource to keep each endpoint specification focused and maintainable.

### General

- [API Standard Response](./docs/api-standard.md)

### Resources

- [Authentication](./docs/auth/auth.md)
- [Users](./docs/user/user.md)
- [Categories](./docs/category/category.md)
- [Products](./docs/product/product.md)
- [Orders](./docs/order/order.md)
- [Notifications](./docs/notification/notification.md)
- [About](./docs/about/about.md)
- [Analytics](./docs/analytic/analytic.md)

Each resource documentation describes its available endpoints, HTTP methods, parameters, request bodies, responses, and relevant error responses.

## Authentication

The API supports multiple authentication mechanisms:

- **JWT** for authenticated API requests
- **Google OAuth 2.0** for Google-based authentication

Authentication details and protected endpoints are documented in:

[Authentication Documentation](./docs/auth/auth.md)

## Reporting

The API supports generating reports in common document formats:

- **PDF** using PDFKit
- **Excel** using ExcelJS

These capabilities are primarily used for application reporting and analytics.

## Logging

Application logging is handled using **Winston** with integration through NestJS.

Logs are used to provide visibility into application behavior and assist with debugging and monitoring during development.

## Project Documentation

```text
.
├── README.md
└── docs/
    ├── api-standard.md
    │
    ├── auth/
    │   └── auth.md
    │
    ├── user/
    │   └── user.md
    │
    ├── category/
    │   └── category.md
    │
    ├── product/
    │   └── product.md
    │
    ├── order/
    │   └── order.md
    │
    ├── notification/
    │   └── notification.md
    │
    ├── about/
    │   └── about.md
    │
    └── analytic/
        └── analytic.md
```

The root `README.md` provides an overview of the project and instructions for running it, while the `docs/` directory contains detailed API specifications.
