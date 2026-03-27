import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // React Router for page navigation
import HomePage from "./components/Home";
import AboutPage from "./components/AboutPage";
import { useAppSelector } from "./redux/reducers/Selector";
import Layout from "./components/LayOut";
import { AnimatePresence } from "framer-motion";
import ProjectsPage from "./components/ProjectsPage";
import BlogPage from "./components/BlogPage";
import ContactPage from "./components/ContactPage";

function App() {
  const themeMode = useAppSelector((state) => state.theme.mode);

  return (
    <div>
      <BrowserRouter>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </div>
  );
}

export default App;
