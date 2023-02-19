import React from 'react'
import "./App.css"
import { Navbar, HomePage, Workspace } from "./components"
import { BrowserRouter, Routes, Route, Link, NavLink} from "react-router-dom"
import { bg_home, bg3_home, bg4_home } from "./assets"

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
      <Navbar></Navbar>
        <main>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/workspace" element={<Workspace></Workspace>}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
