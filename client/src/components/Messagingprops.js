import React, { useEffect } from "react";
import { Image } from "cloudinary-react";
import ChatProps from "./ChatProps";
import axios from "axios";
function MessagesProps(props) {
      const getAllChatsForInbox = () => {
            axios.get(`http://localhost:3001/message/chat/${props.chatId}`).then((response) => {
                  console.log(
                        response.data.map((el) => {
                              return el.message;
                        })
                  );
            });
      };
      useEffect(() => {
            getAllChatsForInbox();
      }, []);
      return (
            <div className="msg-props-container">
                  <div className="msg-props-img">
                        <Image
                              className="inboxImg"
                              cloudName="delktfw1a"
                              publicId={props.profileImg}
                              onClick={props.getChat}
                        />{" "}
                        <p>{props.username}</p>
                  </div>
            </div>
      );
}

export default MessagesProps;
