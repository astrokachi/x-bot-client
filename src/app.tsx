
import Toast from "./components/Toast";
import { ToastProvider } from "./contexts/toast-provider";
import "./styles/App.scss";
import Home from "./pages/home";
import Login from "./pages/login";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ToastProvider>
      <>
        {!isAuthenticated ? (
          <Login />
        ) : (
          <Home />
        )}
        <Toast />
      </>
    </ToastProvider>
  );
}

export default App;
