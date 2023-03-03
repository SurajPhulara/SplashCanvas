import React from 'react'
import "./App.css"
import { Navbar, HomePage, Workspace } from "./components"
import { BrowserRouter, Routes, Route, Link, NavLink, useMatch, useLocation} from "react-router-dom"
import { bg_home, bg3_home, bg4_home } from "./assets"
import { useSelector } from 'react-redux'
import Boards from './components/All_boards/Boards'

const App = () => {
  
  const fullscreen = useSelector((state) => state.screen.fullscreen);

  // Get the match object for the workspace route
  const workspaceMatch = useMatch('/workspace/:uuid');

  return (
    <div className='app'>
      { workspaceMatch?!fullscreen&&<Navbar />:<Navbar></Navbar>}
        <main>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/allboards" element={<Boards></Boards>}></Route>
            <Route path="/workspace/:uuid" element={<Workspace></Workspace>} />
          </Routes>
        </main>
      {/* </BrowserRouter> */}
    </div>
  )
}

export default App
