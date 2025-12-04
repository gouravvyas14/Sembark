Markdown

# Sembark Collection 🛍️

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4.0-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?logo=tailwind-css)

**Sembark Collection** is a modern, high-performance e-commerce frontend application. It features a "Matte Dark" professional aesthetic, responsive design patterns (Sticky Sidebar/Mobile Drawers), and a persistent shopping cart state.

> **Live Demo:** [https://sembark.onrender.com/](https://sembark.onrender.com/)  
> **API:** Powered by [FakeStoreAPI](https://fakestoreapi.com/)

---

## ✨ Key Features

- **🎨 Professional Matte UI:** A custom-designed dark theme using CSS variables for a subtle, elegant look without excessive shine.
- **📱 Fully Responsive:**
  - **Desktop:** Sticky filter sidebar and grid layouts.
  - **Mobile:** Slide-out filter drawer and optimized touch targets.
- **🛒 Persistent Cart:** Global state management (Context API) with `localStorage` persistence.
- **⚡ Dynamic Hero Section:** Auto-rotating text headlines with a spotlight gradient effect.
- **🔍 Smart Filtering:** Client-side filtering by category with visual selection states.
- **🖼️ Optimized Media:** Skeleton loaders for product details and image load transitions.

---

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** CSS Modules / Tailwind CSS (Utility classes) & Custom CSS Variables
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v16.0.0 or higher)
* [npm](https://www.npmjs.com/) (usually comes with Node.js)

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/sembark-collection.git](https://github.com/your-username/sembark-collection.git)
cd sembark-collection
2. Install Dependencies
Install the required node modules defined in package.json.

Bash

npm install
3. Run the Development Server
Start the Vite development server.

Bash

npm run dev
The application will typically start at http://localhost:5173. Open this URL in your browser.

📂 Project Structure
Plaintext

src/
├── components/       # Reusable UI components
├── context/          # State management (CartContext.tsx)
├── pages/            # Page views (Home, Cart, ProductDetail)
├── services/         # API integration (api.ts)
├── App.tsx           # Main application layout & Routing
├── index.css         # Global styles & CSS Variables (The Matte Theme)
└── main.tsx          # Entry point
📦 Building for Production
To create an optimized production build:

Bash

npm run build
The output will be generated in the dist/ folder. You can test the production build locally using:

Bash

npm run preview
Developed with ❤️ by Gourav Vyas
