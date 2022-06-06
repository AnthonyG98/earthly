import React from "react";
import { Image } from "cloudinary-react";
function InboxProps(props) {
      return (
            <div className="messageprops-container" onClick={props.openChat}>
                  <div className="left-inbox-container">
                        <Image
                              className="dash-profileImg"
                              id="comment-profile-pic"
                              cloudName="delktfw1a"
                              publicId={props.profileImg}
                        />
                        <h1 className="user-inbox">{props.topic}</h1>
                  </div>
            </div>
      );
}

export default InboxProps;
