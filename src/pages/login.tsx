import { useEffect, useState } from "react";
import Button from "../components/button";
import "../styles/login.scss";

const Login = ({ authorize }: { authorize: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = () => {
    setIsLoading(true);
    const popup = window.open(
      `${import.meta.env.VITE_API_URL}/auth/authorize`,
      "_blank",
      "popup=true"
    );

    if (popup) {
      const checkPopup = setInterval(() => {
        try {
          if (popup.closed) {
            clearInterval(checkPopup);
            setIsLoading(false);
          }
        } catch (e) {
          clearInterval(checkPopup);
          console.error(e);
        }
      }, 500);
    }
  };
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.status === "success") {
        authorize();
        setIsLoading(false);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [authorize]);

  return (
    <div className="container">
      <h1 className="header">Twitter Bot Manager</h1>
      <span>Automate your Twitter replies with precision</span>
      <div className="btn-wrapper">
        <Button isLoading={isLoading} onClick={handleLogin} withIcon>
          Authorize with X
        </Button>
      </div>
      <span>Securely connect your account to manage bot responses</span>
    </div>
  );
};

export default Login;
