import Router from './shared/Router';


function App() {

  return (
    <>
<div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url('/img/main_img.jpg')` }}>
  <h1 className="text-white text-4xl font-bold bg-black bg-opacity-50 p-4 rounded-lg">Tailwind 확인용</h1>
</div>
      <Router />
    </>
  )
}

export default App
