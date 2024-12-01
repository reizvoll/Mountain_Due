import Router from "./shared/Router";

function App() {
  return (
    <>
      <div
        className="flex items-center justify-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/img/main_img.jpg')` }}
      >
        <h1 className="bg-black bg-opacity-50 p-4 rounded-lg">
          Tailwind 확인용 h1
        </h1>
        <h2 className="bg-black bg-opacity-50 p-4 rounded-lg">
          Tailwind 확인용 h2
        </h2>
        <h3 className=" bg-black bg-opacity-50 p-4 rounded-lg">
          Tailwind 확인용 h3
        </h3>
        <span className=" bg-black bg-opacity-50 p-4 rounded-lg">
          Tailwind 확인용 스팬
        </span>
        <a className=" bg-black bg-opacity-50 p-4 rounded-lg">
          Tailwind 확인용 에이
        </a>
        <p className=" bg-black bg-opacity-50 p-4 rounded-lg">
          Tailwind 확인용 피
        </p>
      </div>
      <Router />
    </>
  );
}

export default App;
