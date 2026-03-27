// React component for displaying a list of GitHub repositories as project cards
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/reducers/Selector';
import { fetchProjects } from '../redux/reducers/projectSlice';
import { motion } from 'framer-motion';

const ProjectsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  // Extract project-related state from Redux store
  const { repos, status, error } = useAppSelector((state) => state.projects);
  const theme = useAppSelector((state) => state.theme.mode); // Theme mode for dark/light styling

  // Fetch projects only if status is 'idle' (i.e., not fetched yet)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects());
    }
  }, [dispatch, status]);

  // Conditionally apply theme-based classes
  const themeClasses = theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';

  return (
    // Animate entry and exit using Framer Motion
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`min-vh-100 py-5 ${themeClasses}`}>
        <div className="container">
          <h2 className="mb-4 text-center">My GitHub Projects</h2>

          {/* Show loading or error message */}
          {status === 'loading' && <p className="text-center">Loading projects...</p>}
          {status === 'failed' && <p className="text-danger text-center">Error: {error}</p>}

          {/* Display projects in a responsive grid */}
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {repos.map((repo) => (
              <div className="col" key={repo.id}>
                {/* Card component with theme-aware styling */}
                <div className={`card h-100 shadow-sm ${theme === 'dark' ? 'bg-secondary text-light' : 'bg-white text-dark'}`}>
                  <div className="card-body">
                    <h5 className="card-title">{repo.name}</h5>
                    <p className="card-text">{repo.description || 'No description available.'}</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center">
                    {/* GitHub link */}
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
                      View on GitHub
                    </a>
                    {/* Star count */}
                    <span className="text-muted">
                      <i className="bi bi-star-fill text-warning me-1"></i>{repo.stargazers_count}
                    </span>
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

export default ProjectsPage;