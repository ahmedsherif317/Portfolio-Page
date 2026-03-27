// AboutPage.tsx - Displays about me information with image, qualifications, skills, and education

import React from "react";
import { useAppSelector } from "../redux/reducers/Selector"; // Redux selector hook for accessing theme mode
import { motion } from "framer-motion"; // Animation library for smooth page transitions
import portfolioImage from "./portfolio.jpg"; // Local profile image import

const AboutPage: React.FC = () => {
  // Select current theme mode (dark or light) from Redux store
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark'; // Boolean flag for dark theme

  return (
    // Animate page entrance and exit with fade and slide effect using framer-motion
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main container with vertical padding and theme-dependent text color */}
      <div className={`container py-5 ${isDark ? 'text-light' : 'text-dark'}`}>
        <h1 className="mb-4 text-center">About Me</h1>
        <div className="row">
          {/* Left Column: Profile Image and Short Bio */}
          <div className="col-md-4 mb-4 d-flex flex-column align-items-center">
            <img
              src={portfolioImage}
              alt="Profile"
              className="img-fluid rounded-circle mb-3 shadow"
              style={{ maxWidth: '250px' }} // Limit image width for consistent sizing
            />
            <p className="text-center">
              Hello! I'm Ahmed Sherif, a passionate developer with a strong background in both embedded systems and full-stack web development. I enjoy solving problems and always seek to expand my knowledge.
            </p>
          </div>

          {/* Right Column: Detailed Sections - Qualifications, Work Experience, Skills, Education */}
          <div className="col-md-8">
            {/* Qualifications Section */}
            <section className="mb-4">
              <h3>Qualifications</h3>
              <ul>
                <li>Full Embedded Systems Diploma under supervision of Eng. Mohamed Tarek.</li>
                <li>Embedded Automotive and AUTOSAR Device Drivers Course under Eng. Mohamed Tarek.</li>
                <li>ARM Architecture based on TM4C Micro-Controllers Course (Eng. Mohamed Tarek).</li>
                <li>Digital IC Design Diploma (Under supervision of Eng. Ali El-Temsah).</li>
                <li>Full Stack Diploma (Jan 2025 – May 2025).</li>
                <li>Designing and implementing solar (PV) systems at EcoSolar.</li>
                <li>Cisco Certified Network Associate (CCNA) from NTI.</li>
              </ul>
            </section>

            {/* Work Experience Section */}
            <section className="mb-4">
              <h3>Work Experience</h3>
              <ul>
                <li><strong>Echo Solar:</strong> Implementing PV station on the field.</li>
              </ul>
            </section>

            {/* Technical Skills Section - displayed as badges in two columns */}
            <section className="mb-4">
              <h3>Technical Skills</h3>
              <div className="row">
                {[
                  'C++ Programming', 'Python Programming', 'Embedded C',
                  'RTOS Programming', 'AUTOSAR Knowledge', 'Linux',
                  'Bash Scripting', 'HTML & CSS', 'JavaScript', 'React',
                  'Node.js', 'SQL', 'Verilog RTL', 'TCL Scripting',
                  'ASIC Flow', 'Post-Layout Verification', 'Cisco CCNA',
                  'Fluent in English', 'AutoCAD & SketchUp'
                ].map((skill, index) => (
                  <div key={index} className="col-md-6 mb-2">
                    <span className="badge bg-primary p-2 w-100 text-start">{skill}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section>
              <h3>Education</h3>
              <ul>
                <li><strong>B.S. Electronics and Communication Engineering</strong>, Cairo University (2019 - 2024)</li>
                <li><strong>High School Diploma</strong>, Abu Bakr El Sedek High School (2016 - 2019)</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;