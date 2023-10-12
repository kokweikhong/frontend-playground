import React from "react"
import { Navbar } from "./components/navbar"
import { Outlet } from "react-router-dom"
import "./index.css";

export default function Root() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
    </React.Fragment>

  )
}
