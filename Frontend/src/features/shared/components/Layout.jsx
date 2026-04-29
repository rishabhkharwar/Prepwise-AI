import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'
import '../style/layout.scss'

const Layout = () => {
    return (
        <div className="app-layout">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
