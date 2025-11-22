# Inventory Management Frontend

A modern, responsive React.js frontend for the Inventory Management System. This application provides a complete user interface for managing products, tracking inventory, and handling bulk operations through CSV import/export.

## 🚀 Live Demo

**Frontend Application:** https://inventory-management-frontend-five-opal.vercel.app

**Backend API:** https://inventory-management-backend-d94i.onrender.com

## 📋 Features

- **🔐 User Authentication** - Secure login and registration
- **📦 Product Management** - Full CRUD operations with inline editing
- **📊 Real-time Inventory Tracking** - Visual stock status indicators
- **🔍 Advanced Search & Filtering** - Find products quickly
- **📁 CSV Import/Export** - Bulk product operations
- **📄 Pagination & Sorting** - Efficient data navigation
- **📱 Responsive Design** - Works on all devices
- **🔄 Real-time Updates** - Instant UI feedback
- **📈 Inventory History** - Track stock changes over time

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **State Management:** React Context API + useState
- **HTTP Client:** Axios
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS
- **Icons:** Heroicons (via SVG)
- **Authentication:** JWT tokens
- **Build Tool:** Create React App
- **Deployment:** Vercel

## 🏗️ Project Structure

```
src/
├── components/
│   ├── AddProductModal.js     # Modal for adding new products
│   ├── DeleteConfirmation.js  # Delete confirmation dialog
│   ├── ImportExport.js        # CSV import/export functionality
│   ├── InventoryHistory.js    # Product history sidebar
│   ├── Login.js               # Login form component
│   ├── ProductTable.js        # Main products table with inline editing
│   ├── Register.js            # User registration form
│   └── SearchFilter.js        # Search and filter controls
├── context/
│   └── AuthContext.js         # Authentication state management
├── pages/
│   ├── AuthPage.js            # Authentication page
│   └── ProductsPage.js        # Main products management page
├── services/
│   ├── api.js                 # API service configuration
│   └── auth.js                # Authentication service
└── tests/                     # Test files
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/inventory-management-frontend.git
   cd inventory-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Build

```bash
# Create production build
npm run build

# Serve the build locally
npm install -g serve
serve -s build
```

## 📖 Usage Guide

### 1. Authentication
- **Register** a new account or **Login** with existing credentials
- JWT tokens are automatically managed and included in API requests
- Protected routes require authentication

### 2. Product Management
- **View Products**: See all products in a responsive table
- **Add Products**: Use the "Add New Product" button and modal form
- **Edit Products**: Click "Edit" for inline editing, then "Save" or "Cancel"
- **Delete Products**: Click "Delete" with confirmation dialog
- **View History**: Click any product row to see inventory change history

### 3. Search & Filtering
- **Search**: Type in the search bar to filter by product name or brand
- **Category Filter**: Use the dropdown to filter by product category
- **Clear Filters**: Reset all filters with the "Clear" button

### 4. Bulk Operations
- **Import CSV**: Upload a CSV file to add multiple products at once
- **Export CSV**: Download all products as a CSV file
- **CSV Format**: Name, Unit, Category, Brand, Stock (headers required)

### 5. Inventory Tracking
- **Stock Status**: Visual indicators (Green = In Stock, Red = Out of Stock)
- **History Tracking**: Automatic tracking of all stock changes
- **User Attribution**: All changes are attributed to the user who made them

## 🧪 Testing

The application includes comprehensive tests:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

**Test Coverage:**
- Component rendering tests
- User interaction tests
- Authentication flow tests
- API integration tests

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:5000/api` |

### API Integration

The frontend communicates with the backend through these main services:

- **Authentication Service**: Handles login, registration, and token management
- **Products Service**: Manages all product-related operations
- **Import/Export Service**: Handles CSV file operations

## 🎨 UI/UX Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Confirmation Dialogs**: Prevent accidental actions
- **Inline Editing**: Efficient product management
- **Modal Interfaces**: Clean form presentation
- **Real-time Validation**: Immediate form feedback

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 Security Features

- JWT token authentication
- Automatic token refresh
- Protected routes
- Input validation
- XSS prevention
- Secure HTTP headers

## 🚀 Deployment

### Deploy to Vercel

1. **Push code to GitHub**
2. **Connect repository to Vercel**
3. **Set environment variables**
4. **Deploy automatically**

### Environment Variables for Production

```env
REACT_APP_API_URL=https://inventory-management-backend-d94i.onrender.com/api
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured for your frontend domain
   - Check environment variables

2. **Authentication Issues**
   - Verify JWT token is being stored correctly
   - Check backend authentication endpoints

3. **API Connection Issues**
   - Confirm backend is running and accessible
   - Verify API URL in environment variables

### Development Tips

- Use browser developer tools to monitor network requests
- Check console for error messages and warnings
- Verify environment variables are loaded correctly
- Test both development and production builds

## 📄 API Documentation

For detailed API documentation, refer to the [Backend README](https://github.com/yourusername/inventory-management-backend).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the deployed application
- Review the API documentation

---
