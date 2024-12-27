import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";

function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    setSelectedCardPrompt,
  } = useContext(Context);

  const handleCardClick = (prompt) => {
    setSelectedCardPrompt(prompt); // Set card's prompt
    onSent(prompt); // Send the prompt
  };

  return (
    <div className="Main">
      <div className="nav">
        <p>My Personal AI</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hey, there!</span>
              </p>
              <p>How can I help you today? 😊</p>
            </div>

            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Suggest some key Tips to stay motivated")
                }
              >
                <p> Suggest some key Tips to stay motivated </p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "5 best books to Read for overall growth that is needed for successfull career"
                  )
                }
              >
                <p>
                  5 best books to Read for overall growth that is needed for
                  successfull career
                </p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Few best coding practices to follow")
                }
              >
                <p> Few best coding practices to follow</p>
                <img src={assets.code_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Habits that helps to maintain good mental and physical health"
                  )
                }
              >
                <p>
                  Habits that helps to maintain good mental and physical health
                </p>
                <img src={assets.bulb_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <i
                style={{ color: "#fff", fontWeight: "400" }}
                className="fa-regular fa-star"
              ></i>
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Message myAI"
            />
            <div>
              <i className="fa-solid fa-image"></i>
              <i className="fa-solid fa-microphone"></i>
              {input ? (
                <i
                  onClick={() => onSent()}
                  className="fa-solid fa-paper-plane"
                ></i>
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            My personal AI may display inaccurate info including about people,
            so double check before using it to make decisions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
