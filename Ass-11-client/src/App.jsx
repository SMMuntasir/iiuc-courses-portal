import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NavLink, Outlet } from 'react-router-dom'
import HeaderH from './HeaderH'
import FooterF from './FooterF'
import AuthContext from './Auth/AuthContext'

function App() {
  const [count, setCount] = useState(0);
  const {theme}=useContext(AuthContext);


  return (
    <>
      <div
        className={`min-h-screen flex flex-col ${theme == false ? "bg-[#fbf8f6]" : "bg-[#121212]"
          }`}
      >
        {/* Header */}
        <HeaderH></HeaderH>

        {/* Content Area */}
        <Outlet></Outlet>

        {/* Footer */}
        <FooterF></FooterF>
      </div>


    </>
  )
}

export default App
