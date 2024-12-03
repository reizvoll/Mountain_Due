import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  password,
  setPassword,
  confirmPassword = null,
  setConfirmPassword = null,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  return (
    <>
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded focus:outline-none focus:ring"
        />
        <div
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>

      {confirmPassword !== null && setConfirmPassword !== null && (
        <div className="relative w-full">
          <input
            type={showConfirmedPassword ? "text" : "password"}
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring"
          />
          <div
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
          >
            {showConfirmedPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordInput;
