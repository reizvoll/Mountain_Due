import useUser from "../../hooks/useUser";

const Home = () => {
  const { user, isLoggedIn, logout } = useUser();

  console.log("users 리덕스 훅 체크용==>", user, isLoggedIn);
  return (
    <div>
      비회원 전용 메인 페이지
      <button onClick={logout}>로그 아웃</button>
    </div>
  );
};

export default Home;
