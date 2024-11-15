<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="/assets/logo/workzy-white.png">
    <source media="(prefers-color-scheme: light)" srcset="/assets/logo/workzy-dark.png">
    <img alt="Workzy Logo" src="/assets/logo/workzy-dark.png" width="200">
  </picture>

  <h1>Workzy - Pod Workspace Booking Platform 🏢</h1>
  
  [![Website](https://img.shields.io/website?url=https://workzy.vercel.app)]([https://workzy.vercel.app/])
  [![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://workzy.vercel.app/)
</div>

The changing nature of work and the growing demand for remote work options have created a need for flexible workspaces that can accommodate both individuals and small teams, leading to the development of the POD Booking System.

To meet this demand, we created Workzy—a flexible web platform for booking and managing workspaces online. Designed to support today’s dynamic work environments, Workzy provides a convenient and customizable solution for co-working spaces, shared offices, and other modern workspace needs.

Workzy is a modern workspace booking platform that simplifies the process of reserving pod workspaces for individuals and teams.

## 🌐 Website

- Production: [https://workzy.vercel.app/](https://workzy.vercel.app/)
- API Documentation: [https://workzy.onrender.com/api-docs/](https://workzy.onrender.com/api-docs/)

## ✨ Features

- Real-time pod workspace availability
- Instant booking confirmation
- Interactive floor plans
- Flexible booking durations (hourly/daily/weekly)
- Team workspace management
- Integrated payment system
- Calendar synchronization
- Mobile-responsive design

## 📸 Preview

<div align="center">
  <h3>Home Page</h3>
  <img src="docs/images/home.png" alt="Home Page" width="600"/>
  <p><em>Modern and intuitive landing page showcasing available workspaces</em></p>

  <h3>Booking Interface</h3>
  <img src="docs/images/booking.png" alt="Booking System" width="600"/>
  <p><em>Easy-to-use booking system with real-time availability</em></p>

  <h3>Dashboard</h3>
  <img src="docs/images/dashboard.png" alt="Dashboard" width="600"/>
  <p><em>Comprehensive dashboard for managing bookings and preferences</em></p>

  <h3>Admin Panel</h3>
  <img src="docs/images/admin.png" alt="Admin Panel" width="600"/>
  <p><em>Powerful admin interface for workspace management</em></p>
</div>

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ShyNing76/Workzy_FE.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your configuration settings.

4. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

## 🔒 Environment Variables

Required environment variables:

```
VITE_BACKEND_URL= Your Backend URL
VITE_PAYPAL_CLIENT_KEY= Your Paypal client Key
VITE_SECRET_ROLE_KEY= Your Secret Role Key
```

## 💻 Tech Stack

- Frontend: React.js, DaisyUI, Tailwindcss
- Backend: Node.js, Express
- Database: Postgresql, Firebase
- Payment Processing: Paypal
- Live Chatting: tawk.to
- Authentication: JWT

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🆘 Support

For support:
- Email: workzy.contact@gmail.com
- Live chat: Available on our website

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape Workzy
- Special thanks to our early adopters and testers
- Our heartfelt thanks to lecturer [Nguyen The Hoang](https://github.com/doit-now) for helping our project.

---
<div align="center">
  Made with ❤️ by the Workzy Team
</div>
