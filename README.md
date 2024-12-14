# Campus Event Management System

A modern web application for managing campus events, allowing students and staff to view and register for various activities like workshops, seminars, and club events.

## 🚀 Test Login Credentials

```json
{
  "User Account": {
    "email": "student@test.com",
    "password": "Test1234"
  },
  "Admin Account": {
    "email": "test@test.com",
    "password": "Admin1234"
  }
}
```

## 🚀 Features

### User Management

- User registration and authentication
- Personalized event preferences
- User profiles with saved events
- Role-based access (Admin/Student/Staff)

### Event Management

- Comprehensive event listings
- Real-time seat availability tracking
- RSVP functionality
- Event filtering and search
- Calendar view with date-based navigation

### Admin Features

- Event creation and management
- User management
- Analytics dashboard
- Capacity management

## 🛠 Technical Requirements

### Frontend

- React.js 18+
- Tailwind CSS
- Framer Motion (animations)
- React Router v6
- React Calendar

### Backend Dependencies

- Node.js
- Express.js
- MongoDB
- JWT for authentication

### Additional Tools

- Cloudinary (image hosting)
- Axios (API requests)

## 📦 Installation

1. Clone the repository:

## 🔑 Key Features Breakdown

### 1. User Registration & Event Preferences

- User authentication system
- Customizable event preferences
- Profile management
- Preference-based recommendations

### 2. Event Listings & RSVP

- Comprehensive event details display
- Real-time seat availability
- RSVP functionality
- Event bookmarking
- User event history

### 3. Event Creation (Admin Only)

- Secure admin access
- Event creation form
- Unique event ID generation
- Capacity management
- Event modification capabilities

### 4. Event Calendar View

- Interactive calendar interface
- Date-based event filtering
- Preference-based filtering
- Event detail modal
- Quick RSVP from calendar

## 🎨 UI Components

### EventCard

- Displays event information
- RSVP button
- Seat availability
- Event type indicator
- Organizer details

### Calendar

- Monthly/weekly view
- Event indicators
- Date selection
- Filter controls
- Event preview

## 🔒 Authentication

- JWT-based authentication
- Role-based access control
- Secure routes
- Session management

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Consistent UI across devices

## 🎯 Future Enhancements

1. Email notifications
2. QR code for event check-in
3. Event analytics
4. Social sharing
5. Feedback system

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | User login        |
| GET    | `/api/auth/profile`  | Get user profile  |

### Event Endpoints

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | `/api/events`     | Get all events   |
| POST   | `/api/events`     | Create new event |
| PUT    | `/api/events/:id` | Update event     |
| DELETE | `/api/events/:id` | Delete event     |

## 🛠 Tech Stack

- Frontend: React.js, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Deployment: Vercel (Frontend), Render (Backend)

## ✅ Feature Checklist

### User Authentication

- [x] User registration
- [x] User login/logout
- [x] Role-based access control (Admin/Student)

### Event Management

- [x] Create new events
- [x] Delete events
- [x] View event details
- [x] Event registration

### User Dashboard

- [x] Register for events
- [x] View registered events

## 🔗 Deployment

- Frontend: [Live Demo](https://campus-events.vercel.app)
- Backend API: [API Endpoint](https://campus-events-api.render.com)

## 👥 Author

- Samuel Asante

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
