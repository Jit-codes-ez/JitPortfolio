# 🌟 Jit Hazra's Portfolio

<div align="center">

  <!-- Logo -->
  <img src="public/images/logo.svg" alt="Portfolio Logo" width="120" height="120">

### ✨ MCA Student | Full Stack Developer | AI Researcher

<kbd>My space on the web</kbd> showcasing modern web development with a dark red aesthetic

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Live%20Demo-dc2626?style=for-the-badge&logo=vercel&logoColor=white)
[![MIT License](https://img.shields.io/badge/📄%20License-MIT-00D26A?style=for-the-badge)](https://opensource.org/license/mit)

</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🎨 Design System](#-design-system)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Customization](#️-customization)
- [🔗 Connect](#-connect)

---

## 🎯 Overview

A modern, responsive portfolio website built with **Next.js 15** and **React 19**, featuring a dark red aesthetic and smooth animations. This project showcases full-stack development skills, AI/ML research, and DSA practice.

**🌐 Live Demo:** [jit.vercel.app](https://jit.vercel.app)
**📱 GitHub:** [github.com/Jit-codes-ez](https://github.com/Jit-codes-ez)

## ✨ Features

| Feature                      | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| 🎨 **Dark Red Theme**        | Ultra-dark design with red accents and glass effects    |
| ⚡ **Performance Optimized** | Next.js 15 with Turbopack for lightning-fast builds     |
| 📱 **Fully Responsive**      | Seamless experience across all device sizes             |
| 🎭 **Smooth Animations**     | Motion-powered interactions and transitions             |
| 📧 **Contact System**        | Integrated email functionality with React Email         |
| 🔍 **SEO Optimized**         | Complete meta tags, sitemap, robots.txt                 |
| 🛡️ **Security Headers**      | Enhanced security with proper headers configuration     |
| 📄 **PDF Resume**            | Integrated resume viewer with fullscreen overlay        |
| 🎯 **Interactive UI**        | Modern glassmorphism and hover effects                  |

## 🛠️ Tech Stack

### **Frontend Framework**

| Technology     | Version  | Purpose                  |
| -------------- | -------- | ------------------------ |
| **Next.js**    | `15.4.4` | React framework with SSR |
| **React**      | `19.1.0` | UI library               |
| **TypeScript** | `^5.0`   | Type-safe JavaScript     |

### **Styling & UI**

| Technology                   | Version    | Purpose                |
| ---------------------------- | ---------- | ---------------------- |
| **Tailwind CSS**             | `^3.4.17`  | Utility-first CSS      |
| **Motion**                   | `^12.23.9` | Animation library      |
| **Radix UI**                 | `^1.2.3`   | Headless UI components |
| **Class Variance Authority** | `^0.7.1`   | Component variants     |

### **Email & Communication**

| Technology      | Version  | Purpose             |
| --------------- | -------- | ------------------- |
| **React Email** | `^0.3.2` | Email templates     |
| **Nodemailer**  | `^7.0.5` | Email sending       |
| **Sonner**      | `^2.0.6` | Toast notifications |

### **Development Tools**

| Technology       | Version    | Purpose               |
| ---------------- | ---------- | --------------------- |
| **ESLint**       | `^9.0`     | Code linting          |
| **Autoprefixer** | `^10.4.21` | CSS vendor prefixes   |
| **Critters**     | `^0.0.23`  | Critical CSS inlining |

## 🎨 Design System

### **Color Palette**

| Color Category | HSL Value     | Usage                |
| -------------- | ------------- | -------------------- |
| **Background** | `240 15% 2%`  | Main background      |
| **Foreground** | `220 8% 94%`  | Primary text         |
| **Primary**    | `220 15% 88%` | Interactive elements |
| **Secondary**  | `0 70% 45%`   | Red accent elements  |
| **Accent**     | `5 85% 55%`   | Red highlights       |
| **Muted**      | `240 18% 6%`  | Subtle backgrounds   |
| **Card**       | `245 20% 3%`  | Component surfaces   |

### **Typography**

| Font Family      | Usage                 | Weight  | Characteristics            |
| ---------------- | --------------------- | ------- | -------------------------- |
| **Inter**        | Body text, paragraphs | 300-700 | Clean, readable, versatile |
| **Cutive Mono**  | Code, technical text  | 400     | Monospaced, technical feel |
| **Nasalization** | Main headings         | 400     | Futuristic, bold display   |
| **Quentine**     | Name, special text    | 400     | Elegant, signature style   |

### **Visual Effects**

| Effect             | CSS Properties                | Description              |
| ------------------ | ----------------------------- | ------------------------ |
| **Glass Morphism** | `backdrop-filter: blur(16px)` | Frosted glass appearance |
| **Luxury Shadows** | `box-shadow: multiple layers` | Deep, rich shadow system |
| **Red Glow**       | `box-shadow: 0 0 20px red`    | Red accent glows         |
| **Shimmer**        | `linear-gradient animation`   | Subtle shine effects     |

## 🚀 Quick Start

### **Prerequisites**

- Node.js 18+
- npm/yarn/pnpm

### **Installation**

1. **Clone the repository**

```bash
   git clone https://github.com/Jit-codes-ez/portfolio.git
   cd portfolio
```

2. **Install dependencies**

```bash
   npm install
```

3. **Environment setup**

```bash
   cp .env.example .env.local
```

4. **Start development server**

```bash
   npm run dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Build Commands**

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start development server with Turbopack |
| `npm run build` | Build for production                    |
| `npm run start` | Start production server                 |
| `npm run lint`  | Run ESLint checks                       |

## ⚙️ Customization

### **Personal Information**

```typescript
// src/constant/self.ts
export const selfData = {
  name: "Your Name",
  jobTitle: "Your Title",
  email: "your.email@domain.com",
  // ... update all personal details
};
```

### **Projects & Education**

| File                           | Purpose                  |
| ------------------------------ | ------------------------ |
| `src/constant/projects.ts`     | Your project portfolio   |
| `src/constant/qualification.ts`| Education & achievements |
| `src/constant/skillsData.tsx`  | Technical skills         |

### **Assets**

| Asset Type      | Location                   | Description     |
| --------------- | -------------------------- | --------------- |
| **Logo**        | `public/images/logo.svg`   | Main logo       |
| **Resume**      | `public/docs/Jit_Resume.pdf` | PDF resume    |
| **Fonts**       | `src/assets/fonts/`        | Custom fonts    |

### **Styling**

- **Colors:** Modify CSS custom properties in `src/app/globals.css`
- **Fonts:** Update font configurations in `src/app/fonts.ts`
- **Components:** Customize UI components in `src/components/ui/`

## 🔗 Connect

<div align="center">

| Platform        | Link                                                          |
| --------------- | ------------------------------------------------------------- |
| 🐙 **GitHub**   | [github.com/Jit-codes-ez](https://github.com/Jit-codes-ez)   |
| 💼 **LinkedIn** | [linkedin.com/in/jit-hazra](https://linkedin.com/in/jit-hazra) |
| 📧 **Email**    | [jithazra.professional@gmail.com](mailto:jithazra.professional@gmail.com) |

</div>

---

<div align="center">

**Built with ❤️ by [Jit Hazra](https://jit.vercel.app)**

_MCA Student | Full Stack Developer | AI Researcher_

[![Portfolio](https://img.shields.io/badge/Portfolio-jit.vercel.app-dc2626?style=for-the-badge)](https://jit.vercel.app)

</div>