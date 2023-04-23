import React from "react";

const Notification = ({ notification }) => {
  const info = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const error = { ...info, color: "red" };

  return (
    <>
      {notification ? (
        <div style={notification.notificationStyle === "info" ? info : error}>
          {notification.notification}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Notification;
