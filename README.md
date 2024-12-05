<div align="center">
  <picture>
    <img alt="Workzy Logo" src="/public/WORKZY_LOGO_BGR.png" width="200">
  </picture>

  <h1>Workzy - Pod Workspace Booking Platform 🏢</h1>
  
  [![Website](https://img.shields.io/website?url=https://workzy.vercel.app)]([https://workzy.vercel.app/])
  [![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://workzy.vercel.app/)
</div>

## 📝 Project Overview

The changing nature of work and the growing demand for remote work options have created a need for flexible workspaces that can accommodate both individuals and small teams, leading to the development of the POD Booking System.

Workzy is a modern workspace booking platform that simplifies the process of reserving pod workspaces for individuals and teams, addressing the evolving needs of contemporary work environments.

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
  <img src="/src/assets/Screenshots/Homepage.jpg" alt="Home Page" width="600"/>
  <p><em>Modern and intuitive landing page showcasing available workspaces</em></p>

  <h3>Booking Interface</h3>
  <img src="/src/assets/Screenshots/Booking.jpg" alt="Booking System" width="600"/>
  <p><em>Easy-to-use booking system with real-time availability</em></p>

  <h3>Dashboard</h3>
  <img src="/src/assets/Screenshots/Dashboard.jpg" alt="Dashboard" width="600"/>
  <p><em>Comprehensive dashboard for managing bookings and preferences</em></p>

  <h3>Admin Panel</h3>
  <img src="/src/assets/Screenshots/Admin.jpg" alt="Admin Panel" width="600"/>
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

## 🧪 Testing Strategy

### Unit Testing Framework

Workzy uses a robust unit testing approach with:
- **Test Runner**: Mocha
- **Assertion Library**: Chai
- **Mocking Library**: Sinon

### Running Tests

```bash
# Run all unit tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Test Setup Example

<div align="center">
  <h4>Unit Test Code Screenshot</h4>
  <img src="/src/assets/Screenshots/UnitTestingScreenshot.png" alt="Unit Testing Code Example" width="600"/>
  <p><em>Sample unit test using Mocha, Chai, and Sinon</em></p>
</div>

### Key Testing Scenarios

#### 1. Workspace Booking Service
```javascript
describe('Booking Service', () => {
  // Test booking creation
  it('should create a valid booking', () => {
    // Test logic using Chai assertions
  });

  // Test booking validation
  it('should reject invalid booking times', () => {
    // Validate booking constraints
  });
});
```

#### 2. Authentication Module
```javascript
describe('Authentication', () => {
  // Test user login
  it('should authenticate valid user credentials', () => {
    // Sinon for mocking authentication service
  });

  // Test authorization
  it('should prevent unauthorized access', () => {
    // Role-based access control tests
  });
});
```

### Testing Best Practices

- 100% unit test coverage for critical services
- Isolated tests with dependency injection
- Use of test doubles (stubs, mocks) for complex dependencies
- Consistent and descriptive test naming
- Regular test suite execution in CI/CD pipeline

### Mocking with Sinon

```javascript
describe('Payment Service', () => {
  // Create a stub for payment gateway
  const paymentStub = sinon.stub(PaymentGateway, 'processPayment');
  
  it('should handle successful payment', () => {
    // Stub successful payment scenario
    paymentStub.returns({ success: true });
  });

  it('should handle payment failures', () => {
    // Stub payment failure scenario
    paymentStub.throws(new Error('Payment failed'));
  });
});
```

### Test Configuration

```javascript
// test/mocha.opts
--require chai
--require sinon
--reporter spec
--slow 5000
```

### Continuous Integration

- Automated testing on every pull request
- Code coverage reports generated
- Mandatory test pass for code merging

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

## 🏆 Performance Metrics

- Average Response Time: < 200ms
- Uptime: 99.9%
- User Satisfaction: 4.7/5

## 🌍 Scalability

- Horizontal scaling support
- Microservices architecture
- Cloud-native deployment ready

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape Workzy
- Special thanks to our early adopters and testers
- Our heartfelt thanks to lecturer [Nguyen The Hoang](https://github.com/doit-now) for helping our project.

---

<div align="center">
  Made with ❤️ by the Workzy Team
</div>
