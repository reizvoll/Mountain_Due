import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";

const useUser = () => {
  const user = useSelector((state) => state.user); // Redux에서 user 상태 가져오기
  const dispatch = useDispatch();

  const isLoggedIn = !!user.id; // 로그인 여부 확인

  // 사용자 상태 초기화 함수 (필요 시 사용)
  const logout = () => {
    dispatch(clearUser());
  };

  return { user, isLoggedIn, logout }; // 필요한 정보와 함수 반환
};

export default useUser;
