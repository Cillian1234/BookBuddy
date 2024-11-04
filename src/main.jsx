import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../main.css'
import App from './App.jsx'
import Child from './pages/child/child.jsx'; 
import Review from './pages/child/Review.jsx'; 
import Assignment from './pages/child/Assignment.jsx';
import Parent from './pages/parent.jsx'
import Teacher from './pages/teacher.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },

    //All Child route paths
    {
        path: '/Child',
        element: <Child/>,
    },
    {
        path: '/Review',
        element: <Review/>,
    },
    {
        path: '/Assignment',
        element: <Assignment/>,
    },

    
    {
        path: '/Parent',
        element: <Parent/>,
    },
    {
        path: '/Teacher',
        element: <Teacher/>,
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
