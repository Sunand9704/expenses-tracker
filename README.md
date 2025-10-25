# 💰 Expense Tracker

A comprehensive expense tracking web application that allows users to manage their personal finances, track income and expenses, and view monthly profit/loss summaries.

## ✨ Features

### 🔐 User Authentication
- User registration and login
- Secure password hashing with bcrypt
- JWT token-based authentication
- Individual user data isolation

### 💸 Expense Management
- Add income and expense transactions
- Categorize transactions (Food, Transport, Entertainment, Shopping, Bills, Health, Education, Other)
- Edit and delete existing transactions
- Real-time transaction filtering by type and category

### 📊 Financial Analytics
- Monthly profit/loss calculations
- Income vs expense tracking
- Category-wise expense breakdown
- Visual charts and summaries
- Month navigation for historical data

### 🎨 Modern UI/UX
- Responsive design for all devices
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Intuitive user interface
- Mobile-friendly design

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** for cross-origin requests

### Frontend
- **React 19** with modern hooks
- **React Router** for navigation
- **Axios** for API calls
- **CSS3** with modern styling
- **Responsive design** principles

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**
   Create a `.env` file in the backend directory:
   ```env
   secret=your_jwt_secret_key_here
   ```

5. **Update database connection**
   Edit `backend/config/db.js` and update the MongoDB connection string:
   ```javascript
   const url = "your_mongodb_connection_string";
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:8000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:8080`

3. **Open your browser**
   Navigate to `http://localhost:8080` to access the application

## 📱 Usage Guide

### 1. User Registration
- Click "Sign Up" to create a new account
- Enter your username, email, and password
- You'll be redirected to the login page

### 2. User Login
- Enter your email and password
- Upon successful login, you'll be redirected to the dashboard

### 3. Adding Transactions
- Click the "+ Add Transaction" button
- Select transaction type (Income or Expense)
- Fill in the details:
  - Title (required)
  - Amount (required)
  - Category (for expenses)
  - Description (optional)
  - Date (defaults to current date)

### 4. Viewing Financial Summary
- The dashboard shows your monthly summary
- Navigate between months using the arrow buttons
- View profit/loss calculations
- See category-wise expense breakdown

### 5. Managing Transactions
- View all transactions in the transaction list
- Filter by type (Income/Expense) or category
- Delete transactions by clicking the trash icon
- Transactions are sorted by date (newest first)

## 🗄️ Database Schema

### User Model
```javascript
{
  Username: String (required)
  email: String (required, unique)
  password: String (required, hashed)
  Expenses: [ObjectId] (references to transactions)
  timestamps: true
}
```

### Transaction Model
```javascript
{
  userid: ObjectId (required, references user)
  title: String (required)
  amount: Number (required)
  description: String (optional)
  category: String (enum: food, transport, entertainment, shopping, bills, health, education, other)
  type: String (enum: income, expense, required)
  date: Date (defaults to current date)
  timestamps: true
}
```

## 🔧 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login

### Transactions
- `POST /api/users/Tasks` - Add new transaction
- `GET /api/users/expenses/:userId` - Get user transactions
- `PUT /api/users/expenses/:expenseId` - Update transaction
- `DELETE /api/users/expenses/:expenseId` - Delete transaction
- `GET /api/users/summary/:userId` - Get monthly summary

## 🎨 Customization

### Styling
- All CSS files are modular and easy to customize
- Color scheme can be changed by modifying CSS variables
- Responsive breakpoints can be adjusted in CSS files

### Categories
- Add new categories by updating the enum in the Expenses model
- Update the frontend category options in AddTransactionModal.jsx
- Add corresponding icons in the components

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS configuration
- User data isolation

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check MongoDB connection string
   - Ensure MongoDB is running
   - Verify network connectivity

2. **CORS Errors**
   - Check backend CORS configuration
   - Ensure frontend URL matches CORS origin

3. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT secret configuration
   - Verify token expiration

### Development Tips

- Use browser developer tools for debugging
- Check console logs for error messages
- Verify API responses in Network tab
- Test on different devices for responsiveness

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed with user experience in mind
- Follows best practices for security and performance

---

**Happy Expense Tracking! 💰📊**
