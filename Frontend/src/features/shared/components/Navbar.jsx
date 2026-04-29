import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import '../style/navbar.scss'
import { LogOut, Home, BrainCircuit } from 'lucide-react'

const Navbar = () => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    const onLogoutClick = async () => {
        await handleLogout()
        navigate('/')
    }

    return (
        <nav className="global-navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <BrainCircuit className="brand-icon" />
                    <span>Prepwise<span className="highlight">AI</span></span>
                </Link>

                <div className="navbar-links">
                    <div className="nav-items-center">
                        <a href="/#features" className="nav-link">
                            <span>Features</span>
                        </a>
                        <a href="/#how-it-works" className="nav-link">
                            <span>How it Works</span>
                        </a>
                        {user && (
                            <Link to="/dashboard" className="nav-link" style={{color: '#d20d3b', fontWeight: 600}}>
                                <Home size={18} />
                                <span>Dashboard</span>
                            </Link>
                        )}
                    </div>
                    
                    {user ? (
                        <div className="user-menu">
                            <div className="user-info">
                                <span className="user-avatar">{user.username ? user.username.charAt(0).toUpperCase() : 'U'}</span>
                                <span className="user-name">{user.username || 'User'}</span>
                            </div>
                            <button onClick={onLogoutClick} className="logout-btn">
                                <LogOut size={16} />
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="auth-menu">
                            <Link to="/login" className="nav-link" style={{marginRight: '1rem'}}>Log In</Link>
                            <Link to="/register" className="btn-register">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
