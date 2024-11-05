import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../main.css'
import App from './App.jsx'
import Child from './pages/Child/child.jsx'
import Parent from './pages/parent.jsx'
import Teacher from './pages/teacher.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import RecordList from "./components/RecordList.jsx";
import DBTestPage from "./pages/DBTestPage.jsx";


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
        element: <Child/>,
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
