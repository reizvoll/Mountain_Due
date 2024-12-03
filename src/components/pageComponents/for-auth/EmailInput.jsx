import React from "react";

const EmailInput = ({
  emailPrefix,
  setEmailPrefix,
  emailDomain,
  setEmailDomain,
}) => {
  return (
    <div className="flex items-center gap-3 w-full">
      <input
        type={emailDomain === "custom" ? "email" : "text"}
        placeholder="이메일"
        value={emailPrefix}
        onChange={(e) => setEmailPrefix(e.target.value)}
        required
        className="w-full p-2 h-10 border rounded focus:outline-none focus:ring"
      />
      {emailDomain !== "custom" && <div>@</div>}
      <select
        value={emailDomain}
        onChange={(e) => setEmailDomain(e.target.value)}
        className="w-1/2 p-2 h-10 border rounded focus:outline-none focus:ring"
      >
        <option value="custom">직접 입력</option>
        <option value="gmail.com">gmail.com</option>
        <option value="naver.com">naver.com</option>
        <option value="daum.net">daum.net</option>
        <option value="hanmail.net">hanmail.net</option>
        <option value="nate.com">nate.com</option>
      </select>
    </div>
  );
};

export default EmailInput;
