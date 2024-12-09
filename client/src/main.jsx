import { StrictMode } from 'react'; // Importing StrictMode from React for highlighting potential issues in the app
import { createRoot } from 'react-dom/client'; // Importing createRoot for rendering the app
import '../main.css'; // Importing the main CSS file for global styling
import App from './App.jsx'; // Importing the main App component
import Child from './pages/Child/child.jsx'; // Importing Child page component
import Parent from './pages/Parent/parent.jsx'; // Importing Parent page component
import Teacher from './pages/Teacher/teacher.jsx'; // Importing Teacher page component
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Importing Router components for routing
import RecordList from "./components/RecordList.jsx"; // Importing RecordList component
import DBTestPage from "./pages/DBTestPage.jsx"; // Importing DBTestPage component
import Review from "./pages/Child/Review.jsx"; // Importing Review component for Child
import Assignment from "./pages/Child/Assignment.jsx"; // Importing Assignment component for Child

import TeachSign from './pages/SignUpPgs/TeachSign.jsx'; // Importing Teacher signup page component
import ChildSign from './pages/SignUpPgs/ChildSign.jsx'; // Importing Child signup page component
import ParentSign from './pages/SignUpPgs/ParentSign.jsx'; // Importing Parent signup page component

// Defining the router configuration using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/', // Root path
    element: <App />, // Main App component
    children: [
      {
        path: "/", // Path for RecordList
        element: <RecordList />, // RecordList component to render at root path
      },
    ],
  },
  {
    path: "/DBTest", // Path for database test page
    element: <DBTestPage />, // DBTestPage component
  },
  {
    path: "/edit/:id", // Path for editing records
    element: <DBTestPage />, // DBTestPage component
  },
  {
    path: '/Child', // Path for Child page
    element: <Child />, // Child component
  },
  {
    path: '/Child/Review', // Path for Child Review page
    element: <Review />, // Review component
  },
  {
    path: '/Child/Assignment', // Path for Child Assignment page
    element: <Assignment />, // Assignment component
  },
  {
    path: '/Parent', // Path for Parent page
    element: <Parent />, // Parent component
  },
  {
    path: '/Teacher', // Path for Teacher page
    element: <Teacher />, // Teacher component
  },
  {
    path: '/TeachSign', // Path for Teacher Signup page
    element: <TeachSign />, // TeachSign component
  },
  {
    path: '/ChildSign', // Path for Child Signup page
    element: <ChildSign />, // ChildSign component
  },
  {
    path: '/ParentSign', // Path for Parent Signup page
    element: <ParentSign />, // ParentSign component
  }
]);

// Rendering the app using createRoot and RouterProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} /> {/* Providing the router configuration to the app */}
  </StrictMode>
);
