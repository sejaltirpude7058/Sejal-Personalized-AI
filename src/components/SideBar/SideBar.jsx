// SideBar.js
import React, { useContext, useState } from "react";
import "./SideBar.css";
import { Context } from "../../context/Context";

function SideBar() {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className={`SideBar ${extended ? "extended" : ""}`}>
      <div className="top">
        <i
          onClick={() => setExtended((prev) => !prev)}
          className="fa-solid fa-bars toggle-button"
        ></i>

        <div onClick={newChat} className="new-chat">
          <i className="fa-solid fa-plus"></i>
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {Array.isArray(prevPrompts) && prevPrompts.length > 0 ? (
              prevPrompts.map((item, index) => (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className="recent-entry"
                >
                  <i className="fa-regular fa-message"></i>
                  <p>{item.length > 20 ? `${item.slice(0, 20)}....` : item}</p>
                </div>
              ))
            ) : (
              <p style={{color :"#0e022a"}}>No recent prompts</p>
            )}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item">
          <i className="fa-solid fa-circle-info"></i>
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item">
          <i className="fa-solid fa-clock"></i>
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item">
          <i className="fa-solid fa-gear"></i>
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
