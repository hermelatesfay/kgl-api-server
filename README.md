# Karibu Groceries System – Backend

##  Overview

This is the backend of the Karibu Groceries Management System. It provides RESTful APIs for managing stock, sales, procurement, pricing, and reports.

Built using **Node.js, Express, and MongoDB**.

---

##  Features

* User Authentication (JWT)
* Product Management
* Stock Management
* Sales (Cash & Credit)
* Procurement Tracking
* Price Management
* Manager Dashboard APIs
* Branch Reports
* Low Stock Alerts

---

##  Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (Authentication)
* Swagger (API Documentation)

---

## Folder Structure

```
backend/
│── models/
│   ├── productModel.js
│   ├── stockModel.js
│   ├── saleModel.js
│   ├── procurementModel.js
│
│── controllers/
│── routes/
│── middleware/
│── config/
│── server.js
```

---

##  Authentication

* Uses JWT for secure access
* Token is required for protected routes
* Example:

```
Authorization: Bearer <token>
```

---

##  Key API Endpoints

### Dashboard

* GET `/dashboard/manager/summary`
* GET `/dashboard/manager/stock-levels`
* GET `/dashboard/manager/recent-transactions`
* GET `/dashboard/manager/low-stock`
* GET `/dashboard/manager/branch-report`

### Products

* GET `/products`
* PUT `/products/:id`

### Sales & Procurement

* POST `/sales`
* POST `/procurement`

---

##  Database Design

### Collections:

* Products
* Stock
* Sales
* Procurement

### Why Separate Product & Stock?

* Product → static info (name, category, price)
* Stock → dynamic per branch (quantity, capacity)

---

##  Setup Instructions

1. Install dependencies:

```
npm install
```

2. Create `.env` file:

```
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

3. Run server:

```
npm run dev
```

---

##  API Documentation

* Swagger is used for API documentation
* Access via:

```
http://localhost:3000/api-docs
```

---

##  Error Handling

* Proper status codes used (200, 400, 500)
* Error messages returned in JSON format

---

## Future Improvements

* Role-based access control
* Payment integration
* Real-time stock updates
* Audit logs
* Advanced analytics

---

## 👨‍💻 Author

Karibu Groceries System – Backend
