import { useState } from "react";
import Toast from "./components/Toast";
import { ToastProvider } from "./contexts/toast-provider";
import "./styles/App.scss";
import Home from "./pages/home";
import Login from "./pages/login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ToastProvider>
      <>
        {!isAuthenticated ? (
          <Login authorize={() => setIsAuthenticated(true)} />
        ) : (
          <Home />
        )}
        <Toast />
      </>
    </ToastProvider>
  );
}

export default App;
