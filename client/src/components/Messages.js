import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import axios from "axios";
import MessagesProps from "./Messagingprops";
import ChatProps from "./ChatProps";
import { Link } from "react-router-dom";
function Messages() {
      const [searchUser, setSearchUser] = useState();
      const [chatId, setChatId] = useState();
      const [results, setResults] = useState();
      const [profileImg, setProfileImg] = useState();
      const [userId, setUserId] = useState();
      const [message, setMessage] = useState();
      const [image, setImage] = useState();
      const [senderProfileImage, setSenderProfileImage] = useState();
      const [searchUserId, setSearchUserId] = useState();
      const [searchUsername, setSearchUsername] = useState();
      const [senderUsername, setSenderUsername] = useState();
      const [inbox, setInbox] = useState();
      const [receivedInbox, setReceivedInbox] = useState();
      const [chat, setChat] = useState();

      const searchForUser = () => {
            axios.get(`https://earth-ly.herokuapp.com/users/${searchUser}`).then((response) => {
                  console.log(response);
                  if (response.data === null) {
                        alert("Sorry, we're not sure who you're looking for.");
                  }
                  setResults(response.data.username);
                  setSenderProfileImage(response.data.profile_picture);
                  setSearchUserId(response.data.id);
                  setSearchUsername(response.data.username);
                  generateString(8);
            });
      };
      const getMyInbox = (thisUserId) => {
            axios.get(`https://earth-ly.herokuapp.com/message/more/${thisUserId}`).then(
                  (response) => {
                        console.log(response);
                        setInbox(
                              response.data.map((el) => {
                                    return (
                                          <MessagesProps
                                                profileImg={
                                                      thisUserId === el.UserId
                                                            ? el.receiver_profile_picture
                                                            : el.sender_profile_picture
                                                }
                                                username={
                                                      thisUserId === el.UserId
                                                            ? el.receiver_username
                                                            : el.sender_username
                                                }
                                                chatId={el.chatId}
                                                //get length of chat to get last message for left inbox
                                                getChat={() => {
                                                      axios.get(
                                                            `https://earth-ly.herokuapp.com/message/chat/${el.chatId}`
                                                      ).then((response) => {
                                                            setSearchUser(null);
                                                            setUserId(null);
                                                            setChatId(el.chatId);
                                                            setChat(
                                                                  response.data.map((el) => {
                                                                        return (
                                                                              <ChatProps
                                                                                    profileImg={
                                                                                          el.chatId ===
                                                                                          el.UserId
                                                                                                ? el.receiver_profile_picture
                                                                                                : el.sender_profile_picture
                                                                                    }
                                                                                    message={
                                                                                          el.message
                                                                                    }
                                                                              />
                                                                        );
                                                                  })
                                                            );
                                                      });
                                                }}
                                          />
                                    );
                              })
                        );
                  }
            );
      };
      const getUser = () => {
            axios.get(
                  `https://earth-ly.herokuapp.com/users/${localStorage.getItem("username")}`
            ).then((response) => {
                  setProfileImg(response.data.profile_picture);
                  setUserId(response.data.id);
                  setSenderUsername(response.data.username);
                  getMyInbox(response.data.id);
                  //When click on user inbox pic, set UserId and Sender to null
            });
      };

      const openResultsContainer = () => {
            const resultsContainer = document.getElementById("search-results");
            resultsContainer.style.display = "flex";
      };
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      function generateString(length) {
            let result = "";
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                  result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            setChatId(result);
            const resultsContainer = document.getElementById("search-results");
            resultsContainer.style.display = "none";
      }
      const sendMessage = () => {
            const messageData = {
                  message: message,
                  chatId: chatId,
                  sender_username: senderUsername,
                  receiver_username: searchUsername,
                  sender_profile_picture: profileImg,
                  receiver_profile_picture: senderProfileImage,
                  sender: searchUserId,
                  UserId: userId,
            };
            axios.post("https://earth-ly.herokuapp.com/message", messageData).then((response) => {
                  axios.get(`https://earth-ly.herokuapp.com/message/chat/${chatId}`).then(
                        (response) => {
                              setSearchUser(null);
                              setUserId(null);
                              setChatId(chatId);
                              setChat(
                                    response.data.map((el) => {
                                          return (
                                                <ChatProps
                                                      profileImg={
                                                            el.chatId === el.UserId
                                                                  ? el.receiver_profile_picture
                                                                  : el.sender_profile_picture
                                                      }
                                                      message={el.message}
                                                />
                                          );
                                    })
                              );
                        }
                  );
            });
      };
      useEffect(() => {
            getUser();
      }, []);

      return (
            <>
                  <div className="dashboard-container">
                        <div className="dash-head-container">
                              <Link to="/dashboard" className="homebar-container">
                                    <i class="fas fa-globe-americas"></i>
                                    <h1>EARTH.LY</h1>
                              </Link>
                              <div className="message-icon">
                                    <Link to="/messages">
                                          <i class="fas fa-comments-alt"></i>
                                    </Link>
                                    <Link to="/profile">
                                          <Image
                                                className="dash-profileImg"
                                                cloudName="delktfw1a"
                                                publicId={profileImg}
                                          />
                                    </Link>
                              </div>
                        </div>
                  </div>
                  <div className="message-container">
                        <div className="messaging-container">
                              <div className="inbox-container">
                                    <div className="search-container">
                                          <input
                                                className="search-input"
                                                type="text"
                                                placeholder="Search for a user"
                                                onChange={(e) => {
                                                      setSearchUser(e.target.value);
                                                }}
                                          />
                                          <button
                                                className="search-btn"
                                                onClick={() => {
                                                      searchForUser();
                                                      openResultsContainer();
                                                }}
                                          >
                                                Search
                                          </button>
                                    </div>
                                    {inbox}
                                    {receivedInbox}
                              </div>
                              <div className="messages">
                                    {chat}
                                    <div className="messages-send">
                                          <input
                                                type="text"
                                                className="message-input"
                                                onChange={(e) => {
                                                      setMessage(e.target.value);
                                                }}
                                          />
                                          <button className="send-msg-btn" onClick={sendMessage}>
                                                <i class="fas fa-paper-plane"></i>{" "}
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      );
}

export default Messages;
