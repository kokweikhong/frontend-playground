import React from "react";
import { NavLink } from "react-router-dom";


export const Navbar = () => {
  return (
    <header className="w-full bg-gray-300 sticky top-0">
      <nav className="w-full px-4 py-6">
        <ul className="w-full justify-center flex gap-2 items-center">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/mutli-form">Multi Form</NavLink>
          </li>
          <li>
            <NavLink to="/single-form">Single Form</NavLink>
          </li>
          <li>
            <NavLink to="/chart">Chart</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )

}
