import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import App from "./app.tsx";
import { AuthProvider } from "./contexts/auth-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
