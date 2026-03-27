// Layout component serves as a shared wrapper for all pages (includes navbar and theming)
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom'; // NavLink for routing navigation, Outlet for nested routes
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap icons
import { useAppDispatch, useAppSelector } from '../redux/reducers/Selector'; // Custom hooks for Redux
import { toggleTheme } from '../redux/reducers/themeSlice'; // Action to toggle light/dark theme

const Layout: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.mode); // Get current theme from Redux
  const dispatch = useAppDispatch();

  return (
    // Top-level wrapper with conditional theme class and full viewport height
    <div className={theme === 'dark' ? 'theme-dark' : 'theme-light'} style={{ minHeight: '100vh' }}>
      
      {/* Responsive navigation bar using Bootstrap */}
      <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <div className="container">
          {/* Brand link to home */}
          <NavLink className="navbar-brand" to="/">Portfolio</NavLink>

          {/* Toggler for small screen navigation */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {/* Dynamically render nav links for each route */}
              {['/', '/about', '/projects', '/blog', '/contact'].map((path, index) => {
                const labels = ['Home', 'About', 'Projects', 'Blog', 'Contact'];
                return (
                  <li className="nav-item" key={path}>
                    <NavLink
                      to={path}
                      className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`} // Highlight active link
                    >
                      {labels[index]}
                    </NavLink>
                  </li>
                );
              })}
            </ul>

            {/* Button to toggle theme between light and dark */}
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => dispatch(toggleTheme())}
              title="Toggle Theme"
            >
              <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'}`}></i> {/* Dynamic icon */}
            </button>
          </div>
        </div>
      </nav>

      {/* Main content area where nested routes will be rendered */}
      <main className="container py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;