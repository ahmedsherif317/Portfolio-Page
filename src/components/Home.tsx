// HomePage.tsx - Main landing page with welcome message and a random quote component

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/reducers/Selector'; // Custom typed Redux hooks
import { fetchQuote } from '../redux/reducers/quoteSlice'; // Thunk action to fetch quote
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap icons
import { motion } from 'framer-motion'; // For entrance animation

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  // Select quote state from Redux store
  const { content, author, status, error } = useAppSelector((state) => state.quote);

  // Select current theme
  const theme = useAppSelector((state) => state.theme.mode);

  // Fetch a quote when component mounts
  useEffect(() => {
    dispatch(fetchQuote());
  }, [dispatch]);

  // Function to fetch a new quote on button click
  const handleNewQuote = () => {
    dispatch(fetchQuote());
  };

  return (
    // Add animation on mount/unmount using Framer Motion
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container py-5">
        {/* Welcome section with navigation links */}
        <section className="text-center mb-5">
          <h1 className="display-4">👋 Welcome to My Portfolio</h1>
          <h2 className="my-3">I'm Ahmed Sherif</h2>
          <p className="lead">
            A full-stack developer building modern, responsive web applications.
          </p>
          <div className="nav justify-content-center my-3">
            <a className="nav-link" href="/about">About</a>
            <a className="nav-link" href="/projects">Projects</a>
            <a className="nav-link" href="/contact">Contact</a>
          </div>
        </section>

        {/* Random Quote Card */}
        <section
          className={`card shadow-sm mx-auto ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}
          style={{ maxWidth: '600px' }}
        >
          <div className="card-body text-center">
            <h5 className="card-title mb-3">
              <i className="bi bi-chat-quote-fill me-2"></i>Random Quote
            </h5>

            {/* Display different UI based on loading state */}
            {status === 'loading' && <p className="text-muted">Loading quote...</p>}
            {status === 'failed' && <p className="text-danger">Error: {error}</p>}
            {status === 'succeeded' && (
              <>
                <blockquote className="blockquote mb-3">
                  <p>“{content}”</p>
                </blockquote>
                <footer className="blockquote-footer mb-3 text-muted">{author}</footer>

                {/* Button to fetch new quote */}
                <button className="btn btn-primary" onClick={handleNewQuote}>
                  <i className="bi bi-arrow-repeat me-1"></i> New Quote
                </button>
              </>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default HomePage;