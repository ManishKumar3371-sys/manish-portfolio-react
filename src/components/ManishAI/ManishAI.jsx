import ReactMarkdown from "react-markdown";
import React, { useState, useEffect, useRef } from "react";
import "./ManishAI.css";

// Instant knowledge base for zero-latency portfolio responses
const PORTFOLIO_KNOWLEDGE = [
  {
    triggers: ["about", "who is manish", "introduce", "bio", "tell me about manish", "overview", "summary"],
    reply: `### 👋 About Manish Kumar
**Manish Kumar** is a Computer Engineering student at **Savitribai Phule Pune University (SPPU)** (Class of 2027) with a passion for **Full-Stack Web Development, Machine Learning, and Cybersecurity**.

- 💡 **Specialization**: Building responsive web applications, secure APIs, and AI integrations.
- 🎯 **Focus Areas**: Secure Web Architectures, Ethical Hacking & Penetration Testing, and React/Node ecosystems.
- 📍 **Location**: Pune, India.`
  },
  {
    triggers: ["skill", "tech stack", "technologies", "languages", "tools", "what are his skills", "programming"],
    reply: `### 🛠️ Technical Skills

- **Programming Languages**: C++, Java, Python, JavaScript (ES6+), HTML5, CSS3
- **Frontend**: React.js, Vite, Bootstrap, Tailwind CSS, Responsive UI Design
- **Backend & APIs**: Node.js, Express.js, Flask, RESTful APIs, Gemini GenAI API
- **Cybersecurity & Auditing**: Kali Linux, Burp Suite, Nmap, Nikto, OWASP Top 10, CVSS v3.1, Security Headers
- **Tools & Platforms**: Git, GitHub, Render, Vercel, VS Code`
  },
  {
    triggers: ["project", "work", "portfolio projects", "built", "showcase", "sentinel", "study buddy", "modelwatch"],
    reply: `### 🚀 Key Projects by Manish

1. **SENTINEL-SEC – Web Penetration Testing Lab**:
   - Authorized security analysis platform with CVSS v3.1 calculator, HTTP security header auditor, and JWT inspector.
   - [Live Demo](https://manishkumar3371-sys.github.io/web-security-lab/) · [GitHub](https://github.com/ManishKumar3371-sys/web-security-lab)

2. **Study Buddy – AI Study Assistant**:
   - AI student assistant powered by React, Vite, Node.js, and Google's Gemini AI API.
   - [Live Demo](https://study-bot-sandy.vercel.app/) · [GitHub](https://github.com/ManishKumar3371-sys/Study-Bot)

3. **Biometric Electronic Voting System & Cryptographic Ledger**:
   - Secure voting concept utilizing multi-modal biometric authentication and immutable audit logging.

4. **ModelWatch**:
   - ML model monitoring platform for dataset validation, data drift detection, and house price prediction.

5. **Personalised Cancer Treatment ML**:
   - AI healthcare research project analyzing genetic profiles to support treatment recommendations.`
  },
  {
    triggers: ["experience", "intern", "internship", "job", "worked", "company"],
    reply: `### 💼 Professional Experience

1. **Web Development Intern** — *Fusion Loop Solution* (Dec 2025 – Mar 2026)
   - Contributed to web application development, responsive frontend components, and modern industry workflows.

2. **Web Development Intern** — *Coding Savvy* (Dec 2024 – Jan 2025)
   - Developed reusable UI components using HTML, CSS, JavaScript, and Bootstrap.`
  },
  {
    triggers: ["education", "college", "university", "school", "degree", "b.e", "sppu", "study"],
    reply: `### 🎓 Education

- **B.E. in Computer Engineering** (2023 – 2027)
  - **Savitribai Phule Pune University (SPPU)**, Maharashtra, India.
- **Higher Secondary (Class 12th)**
  - **Allahabad Public School and College (APS)**, Prayagraj, Uttar Pradesh.`
  },
  {
    triggers: ["contact", "email", "reach", "hire", "touch", "message", "phone"],
    reply: `### 📬 Contact Manish

- **Email**: [kumarmanish99186161@gmail.com](mailto:kumarmanish99186161@gmail.com)
- **GitHub**: [github.com/ManishKumar3371-sys](https://github.com/ManishKumar3371-sys)
- You can also scroll down to the **Get In Touch** section on this page to send a direct message!`
  },
  {
    triggers: ["certificate", "certification", "achievement", "hackathon"],
    reply: `### 🏆 Certificates & Achievements

- **Hackathon Participation & Achievement Certificate**
- **Web Development Internship Completion** (Coding Savvy & Fusion Loop Solution)
- **Tech Auto-Space Technical Recognition**
- **AI Tools and ChatGPT Workshop** (AI-powered presentations, debugging & analytics)`
  },
  {
    triggers: ["hi", "hello", "hey", "greetings", "good morning", "good evening"],
    reply: `👋 Hello! I'm **Manish AI**. How can I help you explore Manish's portfolio today?

Feel free to ask about his **skills**, **projects**, **experience**, **education**, or **contact information**!`
  }
];

function findInstantAnswer(query) {
  const clean = query.toLowerCase().trim();
  for (const item of PORTFOLIO_KNOWLEDGE) {
    if (item.triggers.some(t => clean === t || clean.includes(t))) {
      return item.reply;
    }
  }
  return null;
}

function ManishAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState("ready"); // "ready" | "waking"
  const messagesEndRef = useRef(null);

  // Pre-warm backend on page load to prevent Render cold-start latency
  useEffect(() => {
    const warmBackend = async () => {
      try {
        await fetch("https://manish-ai-backend.onrender.com/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(5000),
          body: JSON.stringify({ message: "ping" }),
        });
      } catch (e) {
        // Silent catch for initial warm-up ping
      }
    };
    warmBackend();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = async (question = message) => {
    const text = question.trim();
    if (!text || loading) return;

    // Display user question immediately
    setMessages((prev) => [...prev, { role: "user", text }]);
    setMessage("");

    // 1. Check instant zero-latency knowledge base first (< 5ms response)
    const instant = findInstantAnswer(text);
    if (instant) {
      setMessages((prev) => [...prev, { role: "bot", text: instant }]);
      return;
    }

    // 2. Query generative AI backend for complex/custom questions
    setLoading(true);
    const wakeTimer = setTimeout(() => {
      setServerStatus("waking");
    }, 3500);

    try {
      const response = await fetch(
        "https://manish-ai-backend.onrender.com/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          signal: AbortSignal.timeout(30000), // 30s timeout instead of 130s
          body: JSON.stringify({ message: text }),
        }
      );

      clearTimeout(wakeTimer);
      setServerStatus("ready");

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      clearTimeout(wakeTimer);
      setServerStatus("ready");

      // Friendly fallback if backend takes too long or is asleep
      const fallback = findInstantAnswer("about") || "I am Manish's portfolio assistant. Feel free to ask about his skills, projects, experience, or contact details!";
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `*The AI backend is currently warming up.* Here is some quick info about Manish:\n\n${fallback}`,
        },
      ]);
    } finally {
      setLoading(false);
      setServerStatus("ready");
    }
  };

  return (
    <div className="manish-ai-container">
      {isOpen && (
        <div className="manish-ai-chat">
          <div className="manish-ai-header">
            <div>
              <h3>Manish AI</h3>
              <span>Your personal portfolio assistant</span>
              <div className="manish-ai-status">
                <span className="manish-ai-online-dot"></span>
                Instant AI Mode
              </div>
            </div>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to clear the chat?")) {
                  setMessages([]);
                }
              }}
              disabled={loading}
              className="manish-ai-clear-btn"
              title="Clear Chat"
            >
              Clear
            </button>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="manish-ai-messages">
            {messages.length === 0 && (
              <>
                <div className="manish-ai-bot-message">
                  <h3>👋 Welcome to Manish's Portfolio!</h3>
                  <p>I'm Manish AI, your personal portfolio assistant.</p>
                  <p>I can instantly answer questions about Manish's skills, projects, experience, and education.</p>
                  <strong>What would you like to know?</strong>
                </div>

                <div className="manish-ai-suggestions">
                  <button disabled={loading} onClick={() => handleSend("Tell me about Manish")}>
                    About Manish
                  </button>
                  <button disabled={loading} onClick={() => handleSend("What are his skills?")}>
                    Technical Skills
                  </button>
                  <button disabled={loading} onClick={() => handleSend("Tell me about his projects")}>
                    Projects
                  </button>
                  <button disabled={loading} onClick={() => handleSend("Tell me about his internship experience")}>
                    Experience
                  </button>
                </div>
              </>
            )}

            {messages.map((item, index) => (
              <div
                key={index}
                className={
                  item.role === "user"
                    ? "manish-ai-user-message"
                    : "manish-ai-bot-message"
                }
              >
                <ReactMarkdown>{item.text}</ReactMarkdown>
              </div>
            ))}

            {loading && (
              <div className="manish-ai-bot-message typing-indicator">
                <span></span>
                <span></span>
                <span></span>
                {serverStatus === "waking" && (
                  <small style={{ display: "block", marginTop: "6px", color: "#94a3b8", fontSize: "11px" }}>
                    Waking up AI engine...
                  </small>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="manish-ai-input-area">
            <input
              type="text"
              placeholder="Ask about Manish's skills, projects..."
              value={message}
              disabled={loading}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!message.trim() || loading}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      <button
        className="manish-ai-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Manish AI assistant"
      >
        {isOpen ? "×" : "AI"}
      </button>
    </div>
  );
}

export default ManishAI;
