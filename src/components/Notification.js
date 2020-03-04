import React from "react";

const Notification = ({ message, messageType }) => {
  if (message === null || messageType == null) {
    return null;
  }

  if (messageType === "success") {
    return <div className="success">{message}</div>;
  }

  if (messageType === "error") {
    return <div className="error">{message}</div>;
  }
};

export default Notification;
