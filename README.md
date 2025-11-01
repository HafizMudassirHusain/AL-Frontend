
# 🌐 Admin Dashboard System

A **modern, full-featured Admin Dashboard** built using **React (Vite) + Tailwind CSS + Node.js + REST API integration**, designed for business management tasks like handling **users, orders, slides, themes, and authentication** — all in one centralized system.

This project provides **Admin and Super Admin** control panels with advanced management features, real-time updates, and elegant UI with smooth color transitions and dark/light theme support.

---

## 🚀 Overview

This Admin Dashboard enables administrators to:

* Manage users, roles, and access controls
* Handle customer orders with live status updates
* Manage Hero slides dynamically (add/delete)
* Export reports to CSV
* Switch themes between dark/light modes
* View analytics and key statistics

All components are responsive, modern, and follow a consistent gradient color theme for visual harmony.

---

## 📄 **Pages Included**

Below is the full list of **pages/modules** implemented in this project:

### 1️⃣ **Login / Signup Page**

* User authentication using JWT tokens
* Secure login with validation and token-based sessions
* Role-based redirection:

  * **Customer → Customer Dashboard**
  * **Admin/Super Admin → Admin Dashboard**
* Styled with Tailwind, featuring a clean and responsive layout

---

### 2️⃣ **Admin Dashboard (Main Panel)**

* Landing section after successful admin login
* Overview of orders, users, revenue, and pending requests
* Summary cards with gradient background and animated counters
* Fully adaptive layout (mobile/tablet/desktop)
* Theme toggle (Light/Dark mode) using `ThemeContext`

---

### 3️⃣ **Admin Orders Management (`AdminOrders.jsx`)**

#### 🧾 Features:

* Fetches all customer orders via secured API
* Displays data in a dynamic, responsive table
* Live order **status update** via dropdown
* Order **filtering, searching, sorting**
* **Delete orders** instantly
* **Export orders** to CSV using PapaParse
* **Modal view** for order details (customer info + items + total price)
* Statistics Summary:

  * 🧮 Total Orders
  * ⏳ Pending Orders
  * 💰 Total Revenue

#### 💡 Key Functionalities:

* Update order status (Pending → Preparing → Completed → Cancelled)
* Gradient-themed cards and animated transitions
* Consistent color palette with light/dark adaptation

---

### 4️⃣ **Customer Orders Page (`CustomerOrders.jsx`)**

#### 👤 Features:

* View all personal orders placed by the logged-in customer
* Each order card shows:

  * Order ID
  * Status (Pending, Preparing, Completed)
  * Date, total price
* Clicking an order opens a detailed **modal**
* Works seamlessly with JWT token authentication

---

### 5️⃣ **User Management (`AdminUsers.jsx`)**

#### 👥 Features:

* Displays all registered users with pagination
* Search users by name, email, or role
* Sort by Name / Email / Role
* Edit role directly (Customer ↔ Admin ↔ Super Admin)
* Delete user (only for Admin/Super Admin)
* Fully animated and styled table with gradient header rows

#### 🧩 Role-based Actions:

| Role        | Permissions                                    |
| ----------- | ---------------------------------------------- |
| Customer    | View only own orders                           |
| Admin       | Manage all users, orders, and slides           |
| Super Admin | Full system access, including admin management |

---

### 6️⃣ **Hero Section Manager (`AdminHeroSection.jsx`)**

#### 🎨 Features:

* Upload promotional slides for homepage carousel
* Each slide includes:

  * Title
  * Subtitle
  * Cloudinary Image Upload
* View all uploaded slides in a responsive table
* Delete slides dynamically with instant UI updates

---

### 7️⃣ **Theme Context (`ThemeContext.jsx`)**

* Provides global dark/light mode
* Automatically syncs theme with localStorage
* Smooth transitions for colors and backgrounds
* All components adapt dynamically based on theme value

---

### 8️⃣ **Authentication Context (`AuthContext.jsx`)**

* Manages JWT tokens and logged-in user state
* Provides global `user` object, token, and role
* Protects admin routes
* Auto logout on token expiration

---

### 9️⃣ **Responsive Layout Components**

#### 🧱 Shared Components:

* Navbar / Sidebar (collapsible & responsive)
* Theme Toggle Button
* Animated Summary Cards (Quick Stats)
* Page-level motion animations using `Framer Motion`

---

## 🎨 **Color & Theme Design**

Consistent design inspired by **modern dashboards** with subtle gradients:

```scss
Light Mode:
  Background: #f9fafb
  Text: #111827
  Cards: White with shadows
  Gradient: from-[#ff7e5f] to-[#feb47b]

Dark Mode:
  Background: #0f0f0f
  Text: #ffffff
  Cards: #1a1a1a with soft borders
  Gradient: from-[#fb923c] to-[#f97316]
```

All color palettes are balanced to ensure high readability, clean spacing, and accessible contrast.

---

## 🧰 **Tech Stack**

| Category         | Technology                                     |
| ---------------- | ---------------------------------------------- |
| Frontend         | React (Vite)                                   |
| Styling          | Tailwind CSS                                   |
| Animations       | Framer Motion                                  |
| State Management | React Context API                              |
| HTTP Client      | Axios                                          |
| CSV Export       | PapaParse                                      |
| Backend API      | Node.js + Express                              |
| Database         | MongoDB / PostgreSQL                           |
| Auth             | JWT-based secure authentication                |
| Media Upload     | Cloudinary                                     |
| Deployment       | Vercel (Frontend) + Render / Railway (Backend) |

---

## ⚙️ **Environment Variables**

Create a `.env` file in the root directory and configure:

```bash
VITE_API_BASE_URL=https://your-backend-api-url.com
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

---

## 🧑‍💻 **Installation Guide**

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/admin-dashboard.git
cd admin-dashboard
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

The app will be available at **[http://localhost:5173](http://localhost:5173)**

---

## 🔐 **Authentication Workflow**

1️⃣ User logs in using credentials
2️⃣ JWT token is issued from backend and stored in `localStorage`
3️⃣ Token attached to all Axios API requests for secure access
4️⃣ On logout or expiry → token removed and redirected to login page

---

## 🧮 **Dashboard Analytics**

* Displays total orders, revenue, and pending count
* Automatically updates after order status change
* Visual consistency across cards using color-coded gradients

---

## 📊 **Data Flow Overview**

```plaintext
React (Frontend)
  ↓
Axios → REST API Calls
  ↓
Node.js / Express (Backend)
  ↓
Database (MongoDB / PostgreSQL)
```

All modules communicate via secure JWT-authenticated endpoints.

---

## 🧑‍💼 **Developer**

**👨‍💻 Hafiz Mudassir Husain**
Full Stack Engineer | Node.js | Express | PostgreSQL | MongoDB

🔗 **LinkedIn:** [hafiz-mudassir-husain](https://www.linkedin.com/in/hafiz-mudassir-husain)
📧 **Email:** [hmudassir511@gmail.com](mailto:hmudassir511@gmail.com)

---

## 🧾 **License**

This project is licensed under the **MIT License** — free to use and modify.

---

