import React from "react";

const Notification = ({ type, children }) => {
  if (children) {
    const error = {
      color: type === "error" ? "red" : "green",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    };
    return children && <div style={error}>{children}</div>;
  } else return null;
};

export default Notification;
