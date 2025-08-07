import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Login.jsx';
import Registration from './Registration.jsx';
import Home from './Home.jsx';
import FindTutor from './FindTutor.jsx';
import AddTutorial from './AddTutorial.jsx';
import Error404 from './assets/Image/404.png';
import AuthProvide from './Auth/AuthProvide.jsx';
import TutorDetail from './TutorDetail.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import MyTutor from './MyTutor.jsx';
import MyTutorials from './MyTutorials.jsx';
import AuthContext from './Auth/AuthContext.jsx'
import UpdateTutorial from './UpdateTutorial.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <div ><img src={Error404} className='mx-auto w-[30rem]' alt="404" /> <p className='text-center text-xl text-black font-bold'>Page Not Found</p></div>,
    children:[
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path:"/find-tutors",
        element:<FindTutor></FindTutor>,
      },
      {
        path:"/add-tutorials",
        element:<PrivateRoute><AddTutorial></AddTutorial></PrivateRoute>,
      },
      {
        path:"/tutor/:id",
        element:<PrivateRoute><TutorDetail></TutorDetail></PrivateRoute>,
        loader: ({params})=>fetch(`https://iiuc-courses-portal-1.onrender.com/tutor/${params.id}`)
      },
      {
        path: "/my-booked-tutors",
        element:<PrivateRoute><MyTutor></MyTutor></PrivateRoute> ,
        
      },
      {
        path: "/my-tutorials",
        element:<PrivateRoute><MyTutorials></MyTutorials></PrivateRoute> ,
      },
      {
        path: "/update-tutorial",
        element:<PrivateRoute><UpdateTutorial></UpdateTutorial></PrivateRoute> ,
      }
    ]
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvide>
    <RouterProvider router={router} />
    </AuthProvide>
  </StrictMode>,
)
