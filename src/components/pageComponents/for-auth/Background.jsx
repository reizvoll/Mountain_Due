import React from "react";

const Background = ({ children }) => {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/img/login_background.png')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {children}
    </div>
  );
};

export default Background;
