// BlogPage.tsx - Displays a list of blog posts with theme support and animation

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/reducers/Selector'; // Typed hooks for Redux state and dispatch
import { fetchBlogPosts } from '../redux/reducers/blogSlice'; // Async thunk to fetch blog posts
import { motion } from "framer-motion"; // Animation library for page transitions

const BlogPage: React.FC = () => {
  // Get dispatch function and select blog state from Redux store
  const dispatch = useAppDispatch();
  const { posts, status, error } = useAppSelector((state) => state.blog);
  // Select current theme mode (dark/light) from Redux
  const theme = useAppSelector((state) => state.theme.mode);

  // Fetch blog posts when component mounts if status is 'idle' (not loaded yet)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBlogPosts());
    }
  }, [dispatch, status]);

  // Format date string into readable format (e.g., Apr 22, 2025)
  const formatDate = (dateString: string): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateString));
  };

  // Define theme-dependent classes for background/text colors
  const themeClasses = theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';
  const cardTheme = theme === 'dark' ? 'bg-secondary text-light' : 'bg-white text-dark';

  return (
    // Animate page transition with fade and slide effect using framer-motion
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main container with theme-based background and minimum viewport height */}
      <div className={`min-vh-100 py-5 ${themeClasses}`}>
        <div className="container">
          <h2 className="mb-4 text-center">My Technical Blog Posts</h2>

          {/* Display loading or error messages based on fetch status */}
          {status === 'loading' && <p className="text-center">Loading blog posts...</p>}
          {status === 'failed' && <p className="text-danger text-center">Error: {error}</p>}

          {/* Responsive grid layout for blog cards */}
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {posts.map((post) => (
              <div className="col" key={post.id}>
                <div
                  className={`card h-100 shadow-sm ${cardTheme}`}
                  style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
                  // Simple hover effect to slightly enlarge the card
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  {/* Card content */}
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {formatDate(post.published_at)}
                    </h6>
                    <p className="card-text">{post.description}</p>
                  </div>
                  {/* Card footer with external link to the full blog post */}
                  <div className="card-footer text-end bg-transparent border-0">
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPage;