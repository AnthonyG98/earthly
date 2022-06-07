import React, { useEffect } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
function ChatProps(props) {
      const getAllChatsForInbox = () => {
            axios.get(`http://localhost:3001/message/chat/${props.chatId}`).then((response) => {
                  console.log(response);
            });
      };
      useEffect(() => {
            getAllChatsForInbox();
      }, []);

      return (
            <div className="chat-container">
                  <Image className="inboxImg" cloudName="delktfw1a" publicId={props.profileImg} />{" "}
                  <p>{props.message}</p>
            </div>
      );
}

export default ChatProps;
