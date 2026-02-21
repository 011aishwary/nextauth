# 🔗 NextAuth URL Shortener


A modern, full-stack URL shortener application built with **Next.js 15**, **MongoDB**,  **Tailwind CSS** and **Framer-motion**. This project features secure user authentication, email verification, and a sleek dashboard for managing your shortened links.

### 🌟 About SrtLinks

**SrtLinks** is designed to make link management effortless and elegant. In a world where long, cluttered URLs are the norm, SrtLinks provides a clean solution for content creators, businesses, and everyday users.

Whether you are sharing a resource on social media, tracking clicks for a marketing campaign, or just decluttering a message, SrtLinks ensures your links are short, secure, and memorable.

### 💡 How It Works

1.  **Sign Up & Verify**: Create a secure account and verify your email to unlock full access.
2.  **Shorten**: Paste your long URL into the dashboard and generate a short alias instantly.
3.  **Share**: Copy your new short link and share it anywhere on the web.
4.  **Manage**: View your history and manage your links from a centralized dashboard.

> **Note:** This project is built using the latest Next.js 15 App Router features, ensuring top-tier performance and SEO optimization.

---

## 📑 Table of Contents

1. [Features](#-features)
2. [Tech Stack](#-%EF%B8%8F-tech-stack)
3. [Project Structure](#-project-structure)
4. [Getting Started](#-getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment Variables](#environment-variables)
5. [API Reference](#-api-reference)
6. [Security](#-security)
7. [Contributing](#-contributing)
8. [License](#-license)

---

## ✨ Features

### 🔐 Authentication & Security
- **Secure Signup & Login**: robust authentication system using JWT (JSON Web Tokens).
- **Password Protection**: Passwords are hashed using `bcryptjs` before storage.
- **Email Verification**: User accounts must be verified via email (powered by Nodemailer) before accessing full features.
- **Protected Routes**: Middleware integration ensures that sensitive pages like `/shorten` and `/profile` are only accessible to authenticated users.

### 🔗 URL Management
- **Shorten Links**: Users can generate short, memorable links locally from their dashboard.
- **Custom Short URLs**: Options to create vanity URLs for better branding (feature dependent on implementation details).
- **Link Dashboard**: View all your generated links in one place.
- **Fast Redirection**: Optimized redirection logic handling via dynamic routes `[shorturl]`.

### 🎨 UI/UX
- **Responsive Design**: Fully responsive interface built with Tailwind CSS, looking great on mobile, tablet, and desktop.
- **Smooth Animations**: Integrated `Framer Motion` for engaging page transitions and element animations.
- **Instant Feedback**: Real-time toast notifications for user actions (success/error messages).

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | Full-stack React Framework (App Router) |
| **MongoDB** | NoSQL Database for storing users and URLs |
| **Mongoose** | ODM for MongoDB schema interaction |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **JWT** | Secure, stateless authentication |
| **Bcryptjs** | Password hashing library |
| **Nodemailer** | Email sending service for verification |
| **Framer Motion** | Animation library for React |
| **React Hot Toast**| Toast notifications |

---

## 📂 Project Structure

```bash
├── src/
│   ├── app/                 # Next.js App Router pages & API routes
│   │   ├── api/             # Backend API endpoints
│   │   │   ├── users/       # User-related endpoints (login, signup, etc.)
│   │   │   └── ...
│   │   ├── [shorturl]/      # Dynamic route for URL redirection logic
│   │   ├── login/           # Login page
│   │   ├── signup/          # Signup page
│   │   ├── shorten/         # URL shortening dashboard page
│   │   ├── profile/         # User profile page
│   │   └── verifyEmail/     # Email verification page
│   ├── components/          # Reusable UI components (Navbar, Footer, etc.)
│   ├── helpers/             # Utility functions
│   │   ├── mailer.js        # Email sending logic
│   │   └── getDataFromToken.ts # Extract user ID from JWT token
│   ├── lib/                 # Database connection helpers
│   ├── models/              # Mongoose data models (User, Url)
│   └── mongoDBconfig/       # MongoDB configuration
├── public/                  # Static assets (images, icons)
├── .env.local               # Environment variables
└── package.json             # Project dependencies and scripts
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- **Node.js**: v18.17.0 or higher.
- **MongoDB**: A running instance (local or Atlas cloud).
- **Packet Manager**: `npm`, `yarn`, or `pnpm`.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/nextauth-url-shortener.git
   cd nextauth-url-shortener
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following configuration:

```env
# Database Connection
MONGODB_URI=mongodb://localhost:27017/nextauth

# Security (JWT)
TOKEN_SECRET=ensure_this_is_a_long_complex_random_string

# App Domain Configuration
DOMAIN=http://localhost:3000
NEXT_PUBLIC_HOST=http://localhost:3000

# Email Service (Nodemailer config)
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password_here
```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open locally:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📡 API Reference

### User Authentication

#### `POST /api/users/signup`
Registers a new user.
- **Body**: `{ username, email, password }`
- **Response**: User creation success/failure message.

#### `POST /api/users/login`
Authenticates a user and sets a JWT cookie.
- **Body**: `{ email, password }`
- **Response**: Auth success token.

#### `POST /api/users/verifyUser`
Verifies user email using a token.
- **Body**: `{ token }`

### URL Operations

#### `POST /api/users/shorten`
Generates a new short URL for the authenticated user.
- **Body**: `{ originalUrl, customAlias (optional) }`
- **Headers**: Requires valid JWT Cookie.
- **Response**: The generated short link object.

---

## 🔒 Security

- **Middleware**: The `middleware.ts` file effectively intercepts requests to protected routes (`/shorten`, `/profile`) and verifies the presence of a valid `token` cookie. Unauthorized users are redirected to login.
- **Data Safety**: Sensitive user data is never stored in plain text.
- **Input Validation**: API routes should validate input to prevent injection attacks (ensure you have validation logic in place).

---

## 🤝 Contributing

Contributions are always welcome! If you'd like to improve the project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)
Distributed under the MIT License. See `LICENSE` for more information.

---

*Made with ❤️ using Next.js by Aishwary*
