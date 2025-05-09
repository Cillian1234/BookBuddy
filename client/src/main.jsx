import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../main.css';
import App from './App.jsx';
import Child from './pages/Child/child.jsx';
import Parent from './pages/Parent/parent.jsx';
import Teacher from './pages/Teacher/teacher.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RecordList from "./components/RecordList.jsx";
import DBTestPage from "./pages/DBTestPage.jsx";
import Review from "./pages/Child/Review.jsx";
import Assignment from "./pages/Child/Assignment.jsx";
import Library from "./pages/Child/Library.jsx";
import P_to_C from "./pages/Parent/P-to-C.jsx";
import P_to_T from "./pages/Parent/P-to-T.jsx";
import TeachSign from './pages/SignUpPgs/TeachSign.jsx';
import ChildSign from './pages/SignUpPgs/ChildSign.jsx';
import ParentSign from './pages/SignUpPgs/ParentSign.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <RecordList />,
      },
    ],
  },
  {
    path: "/DBTest",
    element: <DBTestPage />,
  },
  {
    path: "/edit/:id",
    element: <DBTestPage />,
  },
  {
    path: '/Child',
    element: <Child />,
  },
  {
    path: '/Child/Review',
    element: <Review />,
  },
  {
    path: '/Child/Assignment',
    element: <Assignment />,
  },
  {
    path: '/Child/Library',
    element: <Library />,
  },
  {
    path: '/Parent',
    element: <Parent />,
  },
  {
    path: '/Parent/P_to_C',
    element: <P_to_C />,
  },
  {
    path: '/Parent/P_to_T',
    element: <P_to_T />,
  },
  {
    path: '/Teacher',
    element: <Teacher />,
  },
  {
    path: '/TeachSign',
    element: <TeachSign />,
  },
  {
    path: '/ChildSign',
    element: <ChildSign />,
  },
  {
    path: '/ParentSign',
    element: <ParentSign />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
