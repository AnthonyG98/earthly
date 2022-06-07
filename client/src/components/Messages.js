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
      const [inbox, setInbox] = useState();
      const [receivedInbox, setReceivedInbox] = useState();
      const [chat, setChat] = useState();

      const searchForUser = () => {
            axios.get(`http://localhost:3001/users/${searchUser}`).then((response) => {
                  console.log(response);
                  if (response.data === null) {
                        alert("Sorry, we're not sure who you're looking for.");
                  }
                  setResults(response.data.username);
                  setSenderProfileImage(response.data.profile_picture);
                  setSearchUserId(response.data.id);
                  generateString(8);
            });
      };
      const getMyInbox = (thisUserId) => {
            axios.get(`http://localhost:3001/message/more/${thisUserId}`).then((response) => {
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
                                          chatId={el.chatId}
                                          //get length of chat to get last message for left inbox
                                          getChat={() => {
                                                axios.get(
                                                      `http://localhost:3001/message/chat/${el.chatId}`
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
                                                                              message={el.message}
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
            });
      };
      const getUser = () => {
            axios.get(`http://localhost:3001/users/${localStorage.getItem("username")}`).then(
                  (response) => {
                        setProfileImg(response.data.profile_picture);
                        setUserId(response.data.id);
                        //  getLeftInbox(response.data.id);
                        getMyInbox(response.data.id);
                        //When click on user inbox pic, set UserId and Sender to null
                  }
            );
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
                  sender_profile_picture: profileImg,
                  receiver_profile_picture: senderProfileImage,
                  sender: searchUserId,
                  UserId: userId,
            };
            axios.post("http://localhost:3001/message", messageData).then((response) => {
                  console.log(response);
                  console.log(searchUserId);
                  console.log(profileImg);
                  axios.get(`http://localhost:3001/message/chat/${chatId}`).then((response) => {
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
                  });
            });
      };
      const changeProfileImg = () => {
            const imgFormData = new FormData();
            imgFormData.append("file", image);
            imgFormData.append("upload_preset", "fy5ahm9g");
            axios.post(`https://api.cloudinary.com/v1_1/delktfw1a/image/upload`, imgFormData).then(
                  (response) => {
                        const fileName = response.data.public_id;
                        const imageData = {
                              profile_picture: fileName,
                        };

                        axios.put(`http://localhost:3001/users/profile/${userId}`, imageData).then(
                              (response) => {
                                    //  const changePostPicure = () => {
                                    //  };
                                    //  changePostPicure();
                                    const postImageData = {
                                          userId: userId,
                                          profile_picture: fileName,
                                    };
                                    axios.put(
                                          `http://localhost:3001/post/profile/${userId}`,
                                          postImageData
                                    ).then((response) => {
                                          console.log(response);
                                    });
                              }
                        );
                  }
            );
      };
      //Open change profile Image on Mobile
      const mobChangeProfileImg = () => {
            const changeImgModal = document.getElementById("change-img-on-mob");
            changeImgModal.style.display = "flex";
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
