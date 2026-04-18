# DernSupport - Frontend

> Modern, Professional Support Management System Frontend built with React and Tailwind CSS

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Development Guidelines](#development-guidelines)
- [Building for Production](#building-for-production)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## Overview

DernSupport Frontend is a modern, responsive React application for accessing professional customer support services. It features user authentication, ticket management, problem reporting, and AI-powered chat support.

## Features

✅ Responsive design (mobile, tablet, desktop)  
✅ User authentication (Sign In/Sign Up)  
✅ Dashboard with multiple modules  
✅ Ticket management system  
✅ Problem reporting and solutions  
✅ AI-powered chat support  
✅ User profile management  
✅ Admin dashboard  
✅ Real-time notifications  
✅ Image gallery  
✅ Smooth animations (AOS)  
✅ Modern UI with Tailwind CSS  
✅ Route protection  
✅ Comprehensive error handling  
✅ Loading states and user feedback  

## Tech Stack

- **Framework**: React 18.x
- **Styling**: Tailwind CSS 3.x
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Hooks
- **Animations**: AOS (Animate On Scroll)
- **Components**: React Modal, React Icons
- **Gallery**: React Image Gallery, Flickity
- **Notifications**: SweetAlert2
- **Cookies**: universal-cookie
- **Dev Tools**: ESLint, Prettier

## Prerequisites

- Node.js v14.0.0 or higher
- npm v6.0.0 or higher
- Git
- Backend API server running on http://localhost:3000

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd Frontend

# Install dependencies
npm install
```

## Configuration

1. **Create .env file** from .env.example:

```bash
cp .env.example .env
```

2. **Update .env with your settings**:

```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_ENV=development
REACT_APP_SECRET_CODE=your_secret_code_here
```

3. **Start the development server**:

```bash
npm start
```

The application will open at `http://localhost:3000`

## Running the Application

### Development Mode
```bash
npm start
```
Runs the app in development mode with hot reloading enabled

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `build/` directory

### Testing
```bash
npm test
```
Runs test suite in interactive watch mode

### Code Quality
```bash
npm run lint              # Check code quality
npm run lint:fix          # Fix linting issues
npm run format            # Format code with Prettier
```

## Project Structure

```
Frontend/
├── public/                  # Static files
│   ├── index.html          # Main HTML file
│   ├── manifest.json       # PWA manifest
│   └── assets/             # Static assets
├── src/
│   ├── config/             # Configuration files
│   │   ├── constants.js    # Global constants & endpoints
│   │   ├── api.js          # Axios client setup
│   │   └── ApiUrl.js       # Legacy API endpoints
│   ├── utils/              # Utility functions
│   │   ├── errorHandler.js # HTTP error handling
│   │   ├── validation.js   # Form validation helpers
│   │   └── storage.js      # LocalStorage wrapper
│   ├── Alerts/             # Alert components
│   │   ├── SuccesAlert.jsx
│   │   └── Toast.jsx
│   ├── Auth/               # Authentication pages
│   │   ├── AuthLayout.jsx
│   │   ├── Signin.jsx
│   │   └── Signup.jsx
│   ├── Components/         # Reusable components
│   │   ├── Chat.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── Settings.jsx
│   │   └── ScrollToTop.jsx
│   ├── Dashboard/          # Admin dashboard
│   │   ├── Dashboard.jsx
│   │   └── components/
│   │       ├── Home.jsx
│   │       ├── Navbar.jsx
│   │       ├── Aside.jsx
│   │       ├── Tickets.jsx
│   │       ├── Problems.jsx
│   │       └── Users.jsx
│   ├── Pages/              # Page components
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── components/
│   │   ├── About/
│   │   │   └── About.jsx
│   │   ├── MyTickets/
│   │   │   ├── MyTickets.jsx
│   │   │   └── SingleTicket.jsx
│   │   ├── Problems/
│   │   │   ├── Problems.jsx
│   │   │   └── components/
│   │   └── Support/
│   │       └── Support.jsx
│   ├── Routing/            # Route protection
│   │   ├── PrivateRouter.jsx
│   │   └── PublicRouter.jsx
│   ├── style/              # Global styles
│   │   └── Flickity.css
│   ├── App.js              # Root component
│   ├── index.js            # React entry point
│   └── index.css           # Global CSS
├── .env                     # Environment variables (local)
├── .env.example            # Environment template
├── .eslintrc.json          # ESLint configuration
├── .prettierrc.json        # Prettier configuration
├── .gitignore              # Git ignore rules
├── tailwind.config.js      # Tailwind CSS config
├── package.json            # Dependencies & scripts
└── README.md               # This file
```

## Development Guidelines

### Component Structure
```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null);

  return (
    <div className="container">
      {/* Component JSX */}
    </div>
  );
};

MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

MyComponent.defaultProps = {
  prop2: 0,
};

export default MyComponent;
```

### Using API Client
```jsx
import apiClient from '../config/api';
import { API_ENDPOINTS } from '../config/constants';
import { handleApiError } from '../utils/errorHandler';

const fetchTickets = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.TICKETS.GET_ALL);
    setTickets(response.data);
  } catch (error) {
    const { message } = handleApiError(error);
    // Show error to user
  }
};
```

### Form Validation
```jsx
import { validateEmail, validateRequired } from '../utils/validation';

const handleSubmit = (e) => {
  e.preventDefault();
  
  const emailError = validateEmail(email);
  const nameError = validateRequired(name, 'Name');
  
  if (emailError || nameError) {
    // Show errors to user
    return;
  }
  
  // Proceed with submission
};
```

### Storage Usage
```jsx
import storage from '../utils/storage';

// Get user from storage
const user = storage.getUser();

// Set user in storage
storage.setUser(userData);

// Remove user
storage.removeUser();

// Clear entire storage
storage.clear();
```

## Building for Production

```bash
# Create optimized production build
npm run build

# Build outputs to the `build/` folder
# Ready to be deployed to any static host
```

### Environment Variables for Production
```env
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ENV=production
NODE_ENV=production
REACT_APP_SECRET_CODE=your_production_secret
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Optimization

1. **Code Splitting**: Routes are automatically code-split
2. **Lazy Loading**: Images and components are lazily loaded
3. **Caching**: API responses cached appropriately
4. **Compression**: Gzip compression enabled
5. **Minification**: Production build is minified
6. **Tree Shaking**: Unused code is removed

## Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Deploy the build/ folder to Netlify
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Port 3000 already in use
```bash
# macOS/Linux
sudo lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### npm install issues
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Blank page after npm start
Clear your browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## License

This project is licensed under the MIT License - see LICENSE file for details

## Support

For support, email: support@dernsupport.com

---

**Last Updated**: April 2024  
**Version**: 1.0.0

