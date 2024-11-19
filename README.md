# ProDeck

## Overview
ProDeck is a modern project management application built with React and Node.js that helps teams organize tasks, track progress, and collaborate effectively.

## Features
- **Project Management**: Create and manage multiple projects
- **Task Tracking**: Organize tasks with status tracking (Todo, In Progress, Completed)
- **Team Collaboration**: Assign tasks to team members and track progress
- **Role-Based Access**: Manager and Employee role distinctions
- **Real-time Updates**: Track project and task status changes
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack
- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)

## Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/prodeck.git
   cd prodeck
   ```

2. Install dependencies for both frontend and backend
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Create .env file in the server directory
   ```plaintext
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Create .env file in the client directory
   ```plaintext
   VITE_API_URL=http://localhost:5000/api
   ```

## Running the Application

1. Start the backend server
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend application
   ```bash
   cd client
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Project Structure

```
prodeck/
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers
│   │   ├── pages/         # Page components
│   │   └── utils/         # Utility functions
│   └── public/            # Static files
└── server/                # Backend Node.js application
    ├── models/            # MongoDB models
    ├── routes/            # API routes
    ├── middleware/        # Custom middleware
    └── utils/             # Utility functions
```


## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Projects
- GET `/api/projects` - Get all projects
- POST `/api/projects` - Create new project
- PUT `/api/projects/:id` - Update project
- DELETE `/api/projects/:id` - Delete project

### Tasks
- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create new task
- PUT `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

Special thanks to the team members who contributed to this project:

- [Sri Krishna R Hebbar](https://github.com/Sri-Krishna-R-Hebbar) for his exceptional work on the backend, focusing on authentication and enhancing the project's functionality.
- [Vinay R S](https://github.com/Vinay-R-S) for his outstanding contributions to the frontend, particularly in designing the UI and UX aspects of the project.