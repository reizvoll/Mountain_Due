import Router from "./shared/Router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/config/configStore";
import HeroSection from './components/pageComponents/ui/HeroSection';
import Footer from "./components/pageComponents/ui/Footer";

function App() {
  return (
    <Provider store={store}>
      {/* Redux Store 제공 */}
      <PersistGate loading={null} persistor={persistor}>
        {/* Persisted 상태 복구 여기서 로딩 시 UI 화면 새로 지정하실건가요?*/}
        <HeroSection />
        <Router />
      </PersistGate>
    </Provider>
  );
}

export default App;