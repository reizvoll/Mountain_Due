import React from "react";

const NicknameInput = ({ nickname, setNickname }) => {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
        className="w-full p-2 border rounded focus:outline-none focus:ring"
      />
    </div>
  );
};

export default NicknameInput;
