import { useState, useEffect } from "react";
import profile from "./assets/profile.png";
import "./App.css";
import ManishAI from "./components/ManishAI/ManishAI";



function App() {
  const [showTopButton, setShowTopButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setShowTopButton(window.scrollY > 300);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
  const [callRequest, setCallRequest] = useState({
  
  name: "",
  phone: "",
  time: "",
  message: "",
});

const handleCallRequest = (e) => {
  e.preventDefault();

  const subject = encodeURIComponent("New Call Back Request");

  const body = encodeURIComponent(
    `Name: ${callRequest.name}
Phone: ${callRequest.phone}
Preferred Time: ${callRequest.time}
Message: ${callRequest.message}`
  );
  

  window.location.href =
    `mailto:mk80909596@gmail.com?subject=${subject}&body=${body}`;
};
  const skills = [
    "Java",
    "JavaScript",
    "HTML",
    "CSS",
    "React.js",
    "Python",
    "FastAPI",
    "MySQL",
    "Scikit-learn",
    "Pandas",
    "Git",
    "GitHub",
    "VS Code",
    "Linux",
    "Ubuntu",
    "Data Structures & Algorithms",
    "OOP",
    "DBMS",
  ];

  return (
    <div className="portfolio">
     {showTopButton && (
  <button
    className="back-to-top"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    aria-label="Back to top"
  >
    ↑
  </button>
)}
    <nav className="navbar">
  <a href="#home" className="logo">
    MK<span>.</span>
  </a>

  <button
    className="menu-toggle"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    {menuOpen ? "✕" : "☰"}
  </button>
  
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
  <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
  <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
  <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
  <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
  <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
  <a href="#education" onClick={() => setMenuOpen(false)}>Education</a>
  <a href="#certifications" onClick={() => setMenuOpen(false)}>Certifications</a>
  <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
</div>

        <a href="#contact" className="nav-button">
          Let's Talk ↗
        </a>
      </nav>

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="availability">
              <span className="status-dot"></span>
              OPEN TO OPPORTUNITIES
            </div>

            <p className="eyebrow">HELLO, I'M</p>

            <h1>
              Manish<br />
              <span>Kumar.</span>
            </h1>

            <h2>Software Engineer</h2>

            <p className="hero-description">
              Computer Engineering student with hands-on experience
              in web development. I enjoy building responsive
              applications, exploring new technologies and creating
              practical software solutions.
            </p>

            
<div className="hero-buttons">
  <a href="#projects" className="primary-button">
    Explore My Work ↗
  </a>

  <a href="#contact" className="secondary-button">
    Get In Touch
  </a>

  <a
    href="/Manish-Kumar-Resume.pdf"
    download="Manish-Kumar-Resume.pdf"
    className="secondary-button"
  >
    Download Resume ↓
  </a>
</div>
          </div>

          <div className="hero-visual">
            <div className="purple-glow"></div>

            <div className="profile-frame">
              <img
                src={profile}
                alt="Manish Kumar"
                className="profile-photo"
              />
            </div>

            <div className="floating-card">
              <span>✦</span> Turning ideas into code
            </div>

            <p className="image-caption">
              COMPUTER ENGINEERING · PUNE, INDIA
            </p>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section" id="about">
          <p className="eyebrow">01 / ABOUT ME</p>
          <h2>
            A little about <span>myself.</span>
          </h2>

          <p className="section-description">
            I'm a final-year Computer Engineering student at
            Savitribai Phule Pune University (SPPU),
            graduate in 2027. I have hands-on experience in web
            development through professional internships. I enjoy
            developing responsive user interfaces, writing clean
            code and exploring software technologies. I am
            continuously improving my problem-solving skills and
            working towards becoming a skilled Software Engineer.
          </p>
        </section>

        {/* EXPERIENCE */}
        <section className="section" id="experience">
          <p className="eyebrow">02 / EXPERIENCE</p>
          <h2>
            Where I've <span>worked.</span>
          </h2>

          <div className="project-card">
            <div className="project-top">
              <span className="project-tag">INTERNSHIP 01</span>
              <span className="project-number">DEC 2024 – JAN 2025</span>
            </div>

            <h3>Web Development Intern</h3>
            <p>
              <strong>Coding Savvy</strong>
            </p>

            <p>
              Completed a one-month web development internship.
              Developed responsive web pages and user interface
              components using HTML, CSS, JavaScript and Bootstrap.
            </p>

            <div className="project-tech">
              HTML · CSS · JavaScript · Bootstrap
            </div>
          </div>

          <div className="project-card">
            <div className="project-top">
              <span className="project-tag">INTERNSHIP 02</span>
              <span className="project-number">DEC 2025 – MAR 2026</span>
            </div>

            <h3>Web Development Intern</h3>
            <p>
             <a
  href="https://www.fusionloopsolution.com/"
  target="_blank"
  rel="noreferrer"
  className="project-link"
>
  Fusion Loop Solution ↗
</a>
            </p>

            <p>
              Completed a three-month internship focused on
              developing responsive web applications using HTML,
              CSS and JavaScript. Worked on intuitive user
              interfaces, improved page usability and performance,
              and gained practical exposure to debugging,
              application development and industry practices.
            </p>

            <div className="project-tech">
              HTML · CSS · JavaScript · Web Development
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section" id="skills">
          <p className="eyebrow">03 / MY TOOLKIT</p>
          <h2>
            Technologies I <span>work with.</span>
          </h2>

          <div className="skill-list">
            {skills.map((skill) => (
              <div className="skill-card" key={skill}>
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="section" id="education">
          <p className="eyebrow">04 / EDUCATION</p>
          <h2>
            My <span>education.</span>
          </h2>

          <div className="project-card">
  <span className="project-tag">GRADUATION</span>
  <h3>B.E. Computer Engineering</h3>

  <a
    href="https://www.unipune.ac.in/"
    target="_blank"
    rel="noreferrer"
    className="project-link"
  >
    Savitribai Phule Pune University (SPPU) ↗
  </a>

  <div className="project-tech">
    Graduation: 2027
  </div>
</div>

          <div className="project-card">
  <span className="project-tag">CLASS 12TH</span>
  <h3>Allahabad Public School and College (APS)</h3>
  <p>Prayagraj, Uttar Pradesh</p>

  <a
    href="https://allahabadpublicschool.com/"
    target="_blank"
    rel="noreferrer"
    className="project-link"
  >
    Visit School Website ↗
  </a>
</div>
          
<div className="project-card">
  <span className="project-tag">CLASS 10TH</span>
  <h3>Kaushambi Presidency School (KPS)</h3>
  <p>Bharwari, Kaushambi, Uttar Pradesh</p>

  <a
    href="https://www.mgmkpsbharwari.com/"
    target="_blank"
    rel="noreferrer"
    className="project-link"
  >
    Visit School Website ↗
  </a>
</div>

        </section>

        {/* PROJECTS */}
        <section className="section" id="projects">
          <p className="eyebrow">05 / SELECTED WORK</p>
          <h2>
            Things I've <span>built.</span>
          </h2>

          <div className="project-card">
            <div className="project-top">
              <span className="project-tag">FEATURED PROJECT</span>
              <span className="project-number">01</span>
            </div>

            <h3>Biometric Electronic Voting System & Cryptographic Ledger</h3>
            <p>
              A high-assurance electronic voting system concept utilizing multi-modal
              biometric verification (optical fingerprint & facial landmark recognition),
              strict duplicate-voting elimination, zero-knowledge ballot secrecy, and an
              immutable Merkle audit chain with live tamper detection.
            </p>

            <div className="project-tech">
              Python · Flask · SQLite · Cryptography (SHA-256) · Merkle Chain · Cyber Defense
            </div>

            <div className="project-links">
              <a
                href="https://biometric-voting-system-6jpj.onrender.com"
                target="_blank"
                rel="noreferrer"
                className="project-link project-link-primary"
              >
                Live Demo ↗
              </a>

              <a
                href="https://github.com/ManishKumar3371-sys/biometric-voting-system"
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                View Source Code ↗
              </a>
            </div>
          </div>

          <div className="project-card">
            <div className="project-top">
              <span className="project-tag">MACHINE LEARNING</span>
              <span className="project-number">02</span>
            </div>

            <h3>ModelWatch</h3>
            <p>
              A machine learning model monitoring platform for
              data drift detection, dataset validation, model
              evaluation, performance tracking and house price
              prediction.
            </p>

            <div className="project-tech">
              Python · FastAPI · React · Scikit-learn · Pandas
            </div>

            <div className="project-links">
              <a
                href="https://model-watch-gules.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="project-link project-link-primary"
              >
                Live Demo ↗
              </a>

              <a
                href="https://github.com/ManishKumar3371-sys/ModelWatch"
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                View Source Code ↗
              </a>
            </div>
          </div>

          <div className="project-card">
            <div className="project-top">
              <span className="project-tag">WEB DEVELOPMENT</span>
              <span className="project-number">03</span>
            </div>

            <h3>AI Chatbot with GenAI API</h3>
            <p>
              Developed an AI-powered chatbot with frontend
              integration. Connected backend APIs to handle
              dynamic responses and provide smooth user
              interactions.
            </p>

            <div className="project-tech">
              HTML · CSS · JavaScript · Python · Flask · GenAI API
            </div>
          </div>

          <div className="project-card">
            <div className="project-top">
              <span className="project-tag">CYBERSECURITY</span>
              <span className="project-number">04</span>
            </div>
            
            <h3>Website Penetration Testing</h3>
            <p>
              Performed web security analysis in an authorized
              testing context and explored vulnerability
              identification using ethical hacking tools.
            </p>

            <div className="project-tech">
              Kali Linux · Nmap · Nikto · Burp Suite
            </div>
          </div>
          <div className="project-card">
        <div className="project-top">
          <span className="project-tag">FINAL YEAR PROJECT</span>
          <span className="project-number">05</span>
          </div>

           <h3>
           Personalised Cancer Treatment Using Machine Learning on Genetic Data
            </h3>

          <p>
          An AI-driven healthcare project that uses machine learning
          and genetic data analysis to explore personalised cancer
          treatment recommendations. The project aims to identify
          patterns in genetic profiles and support treatment decision-making.
         </p>

         <div className="project-tech">
          Machine Learning · Python · Genetic Data Analysis
           </div>
          </div>
        
<div className="project-card">
  <div className="project-top">
    <span className="project-tag">BIOMETRIC SECURITY</span>
    <span className="project-number">05</span>
  </div>

  <h3>Biometric Voting System</h3>

  <p>
    A secure voting system concept that uses biometric
    authentication to verify voter identity and help prevent
    duplicate or unauthorized voting. The project explores
    voter verification, secure vote recording and transparent
    election processes.
  </p>

  <div className="project-tech">
    Biometric Authentication · Voter Verification · Secure Voting
  </div>
</div>


<div className="project-card">
  <div className="project-top">
    <span className="project-tag">AI WEB APPLICATION</span>
    <span className="project-number">06</span>
  </div>

  <h3>Study Buddy – AI Study Assistant</h3>

  <p>
    An AI-powered study assistant that helps students understand
    concepts, ask questions and get instant responses using
    Google's Gemini AI API.
  </p>

  <div className="project-tech">
    React · Vite · Node.js · Express · Gemini AI API
  </div>

  <div className="project-links">
    <a
      href="https://study-bot-sandy.vercel.app/"
      target="_blank"
      rel="noreferrer"
      className="project-link project-link-primary"
    >
      Live Demo ↗
    </a>

    <a
      href="https://github.com/ManishKumar3371-sys/Study-Bot"
      target="_blank"
      rel="noreferrer"
      className="project-link"
    >
      GitHub Source Code ↗
    </a>
  </div>
</div>

<div className="project-card">
  <div className="project-top">
    <span className="project-tag">CYBERSECURITY & AUDITING</span>
    <span className="project-number">07</span>
  </div>

  <h3>SENTINEL-SEC – Web Penetration Testing Lab</h3>

  <p>
    An interactive web application security auditing & vulnerability assessment
    management platform mapped to the OWASP Top 10 and CVSS v3.1 standards.
    Features automated HTTP defensive header audits, JWT analysis, and report generation.
  </p>

  <div className="project-tech">
    Python 3 · JavaScript · OWASP WSTG · CVSS v3.1 · Security Auditing
  </div>

  <div className="project-links">
    <a
      href="https://manishkumar3371-sys.github.io/web-security-lab/"
      target="_blank"
      rel="noreferrer"
      className="project-link project-link-primary"
    >
      Live Demo ↗
    </a>

    <a
      href="https://github.com/ManishKumar3371-sys/web-security-lab"
      target="_blank"
      rel="noreferrer"
      className="project-link"
    >
      GitHub Source Code ↗
    </a>
  </div>
</div>


        </section>
          
{/* CERTIFICATIONS */}
<section className="section" id="certifications">
  <p className="eyebrow">06 / ACHIEVEMENTS</p>
  <h2>
    Certificates & <span>recognition.</span>
  </h2>

  <div className="project-card">
    <span className="project-tag">HACKATHON</span>
    <h3>Hackathon Certificate</h3>
    <p>Hackathon participation / achievement</p>
    <a
      href="/certificates/hackathon%20(2).pdf"
      target="_blank"
      rel="noreferrer"
      className="project-link"
    >
      View Certificate ↗
    </a>
  </div>

  <div className="project-card">
    <span className="project-tag">INTERNSHIP</span>
    <h3>Internship Completion</h3>
    <p>Web Development Internship</p>
    <a
      href="/certificates/internship.pdf"
      target="_blank"
      rel="noreferrer"
      className="project-link"
    >
      View Certificate ↗
    </a>
  </div>

  <div className="project-card">
    <span className="project-tag">TECH EVENT</span>
    <h3>Tech Auto-Space</h3>
    <a
      href="/certificates/tech-auto-space.pdf"
      target="_blank"
      rel="noreferrer"
      className="project-link"
    >
      View Certificate ↗
    </a>
  </div>

  <div className="project-card">
    <span className="project-tag">CERTIFICATE</span>
    <h3>Hackathon Certificate</h3>
    <a
      href="/certificates/HSP25088.pdf"
      target="_blank"
      rel="noreferrer"
      className="project-link"
    >
      View Certificate ↗
    </a>
  </div>
  <div className="project-card">
  <span className="project-tag">AI WORKSHOP</span>

  <h3>AI Tools and ChatGPT Workshop</h3>

  <p>
    Successfully completed a workshop covering AI-powered
    presentations, data analysis, coding and debugging.
  </p>

  <div className="project-tech">
    Artificial Intelligence · ChatGPT · AI Tools
  </div>

  <a
    href="/certificates/ai-tools-chatgpt-workshop.pdf"
    target="_blank"
    rel="noreferrer"
    className="project-link"
  >
    View Certificate ↗
  </a>
</div>
</section>

        {/* CONTACT */}
        <section className="section contact-section" id="contact">
          <p className="eyebrow">07 / CONTACT</p>
          <h2>
            Let's build something <span>great.</span>
          </h2>

          <p className="section-description">
            I'm open to learning opportunities, collaborations
            and software engineering roles. Feel free to connect
            with me.
          </p>

          <form className="call-request-form" onSubmit={handleCallRequest}>
  <h3>Request a Call</h3>
  <p>Share your details and I'll get back to you.</p>

  <input
    type="text"
    placeholder="Your Name"
    required
    value={callRequest.name}
    onChange={(e) =>
      setCallRequest({ ...callRequest, name: e.target.value })
    }
  />

  <input
    type="tel"
    placeholder="Your Phone Number"
    required
    value={callRequest.phone}
    onChange={(e) =>
      setCallRequest({ ...callRequest, phone: e.target.value })
    }
  />

  <input
    type="text"
    placeholder="Preferred Time to Call"
    required
    value={callRequest.time}
    onChange={(e) =>
      setCallRequest({ ...callRequest, time: e.target.value })
    }
  />

  <textarea
    placeholder="Message (Optional)"
    value={callRequest.message}
    onChange={(e) =>
      setCallRequest({ ...callRequest, message: e.target.value })
    }
  />

  <button type="submit" className="primary-button">
    Submit Call Request ↗
  </button>
</form>

          <p className="image-caption">
            <span>LOCATION:</span> Pune, India
          </p>

<div className="social-links contact-links">
  <a href="mailto:mk80909596@gmail.com">
    Email Me ↗
  </a>

  <a
    href="https://www.linkedin.com/in/manish-kumar-bb213b337/"
    target="_blank"
    rel="noreferrer"
  >
    LinkedIn ↗
  </a>

  <a
    href="https://github.com/ManishKumar3371-sys"
    target="_blank"
    rel="noreferrer"
  >
    GitHub ↗
  </a>
</div>

        </section>
      </main>

            <footer>
        <p>© {new Date().getFullYear()} Manish Kumar</p>
        <p>Designed & built with React.</p>
      </footer>

      <ManishAI />

    </div>
  );
}

export default App;
