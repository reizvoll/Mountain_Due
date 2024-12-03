import Router from "./shared/Router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/config/configStore";

function App() {
  return (
    <Provider store={store}>
      {/* Redux Store 제공 */}
      <PersistGate loading={null} persistor={persistor}>
        {/* Persisted 상태 복구 여기서 로딩 시 UI 화면 새로 지정하실건가요?*/}
        <Router />
      </PersistGate>
    </Provider>
  );
}

export default App;
