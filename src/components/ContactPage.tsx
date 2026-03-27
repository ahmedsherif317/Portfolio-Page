// ContactPage.tsx - Contact form with email validation and theme-aware design

import React, { useState } from 'react';
import { useAppSelector } from '../redux/reducers/Selector'; // Typed selector hook for Redux
import { motion } from "framer-motion"; // For page transition animations

// Define the structure of the form's data
interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  // Get the current theme (light/dark) from Redux
  const theme = useAppSelector((state) => state.theme.mode);

  // Form state for user inputs
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  // Status can be idle, sending, success, or error
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>(''); // Stores error message for validation or server errors

  // Update form values on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simple email validation
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic field validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in all fields.');
      setStatus('error');
      return;
    }

    // Email format validation
    if (!validateEmail(formData.email)) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      // POST request to Formspree (or any backend endpoint)
      const response = await fetch('https://formspree.io/f/xyzwappy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset form on success
        setFormData({ name: '', email: '', message: '' });
        setStatus('success');
      } else {
        throw new Error('Form submission failed.');
      }
    } catch (error: any) {
      // Show error if request fails
      setErrorMsg(error.message);
      setStatus('error');
    }
  };

  // Theme-based styles for background and input fields
  const themeBackground = theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';
  const inputTheme = theme === 'dark' ? 'bg-secondary text-light border-0' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`min-vh-100 py-5 ${themeBackground}`}>
        <div className="container">
          <h2 className="text-center mb-4">Contact Me</h2>

          {/* Contact form */}
          <form
            className="mx-auto p-4 rounded shadow-sm"
            onSubmit={handleSubmit}
            style={{
              maxWidth: '600px',
              backgroundColor: theme === 'dark' ? '#2c2f33' : '#ffffff',
            }}
          >
            {/* Name field */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name *</label>
              <input
                type="text"
                name="name"
                id="name"
                className={`form-control ${inputTheme}`}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                id="email"
                className={`form-control ${inputTheme}`}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Message field */}
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message *</label>
              <textarea
                name="message"
                id="message"
                className={`form-control ${inputTheme}`}
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary w-100" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {/* Success or error feedback */}
            {status === 'success' && (
              <div className="alert alert-success mt-3">
                Your message has been sent successfully!
              </div>
            )}
            {status === 'error' && (
              <div className="alert alert-danger mt-3">{errorMsg}</div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;