import ReactMarkdown from "react-markdown";
import React, { useState, useEffect, useRef } from "react";
import "./ManishAI.css";

function ManishAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, loading]);

  const handleSend = async (question = message) => {
    const text = question.trim();

    if (!text || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3001/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          signal: AbortSignal.timeout(130000),
          body: JSON.stringify({
            message: text,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong."
        );
      }

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply },
      ]);
    } catch (error) {
  const errorMessage = error.message?.toLowerCase() || "";
  console.log("Frontend Chat Error:", error);

  let friendlyMessage =
    "Sorry, something went wrong. Please try again later.";

  if (
    errorMessage.includes("429") ||
    errorMessage.includes("rate limit") ||
    errorMessage.includes("daily usage limit")
  ) {
    friendlyMessage =
      "Manish AI has reached its daily usage limit. Please try again later.";
  } else if (
    errorMessage.includes("timeout") ||
    errorMessage.includes("timed out") ||
    errorMessage.includes("fetch failed") ||
    errorMessage.includes("network")
  ) {
    friendlyMessage =
      "Connection issue! Manish AI is temporarily unavailable. Please try again later.";
  }

  setMessages((prev) => [
    ...prev,
    {
      role: "bot",
      text: friendlyMessage,
    },
  ]);
} finally {
  setLoading(false);
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
    Online
  </div>
</div>
<button
  onClick={() => {
  const confirmClear = window.confirm("Are you sure you want to clear the chat?");
  if (confirmClear) {
    setMessages([]);
  }
}}
  disabled={loading}
  className="manish-ai-clear-btn"
  title="Clear Chat"
>
  Clear
</button>
            <button onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          <div className="manish-ai-messages">

  {messages.length === 0 && (
    <>
      <div className="manish-ai-bot-message">
        <h3>👋 Welcome to Manish's Portfolio!</h3>
        <p>
          I'm Manish AI, your personal portfolio assistant.
        </p>
        <p>
          I can help you explore Manish's technical skills,
          projects, education and professional experience.
        </p>
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
  </div>
)}
            <div ref={messagesEndRef} />
          </div>

          <div className="manish-ai-input-area">
            <input
              type="text"
              placeholder="Ask something..."
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
