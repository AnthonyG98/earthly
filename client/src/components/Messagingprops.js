import React from "react";
import { Image } from "cloudinary-react";
import axios from "axios";
function MessagesProps(props) {
      return (
            <div className="msg-props-container">
                  <div className="msg-props-img">
                        <Image
                              className="inboxImg"
                              cloudName="delktfw1a"
                              publicId={props.profileImg}
                              onClick={props.getChat}
                        />{" "}
                  </div>
            </div>
      );
}

export default MessagesProps;
