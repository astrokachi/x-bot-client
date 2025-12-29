import { useEffect, useState } from 'react';
import Button from './components/button';
import Toast from './components/Toast';
import { ToastProvider } from './contexts/toast-provider';
import './styles/App.scss'
import './styles/home.scss'
import './styles/components/toast.scss'
import Home from './pages/home';

function App() {
  const [view, setView] = useState("auth");

  const handleLogin = () => {
    window.open("http://localhost:3002/auth/authorize", '_blank', "popup=true");
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
  
      if (event.data.status === 'success') {
        setView("home");
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  })

  return (
    <ToastProvider>
      <>
        { view === "auth" ?
         <Button onClick={handleLogin}>Login with X</Button> :
         <Home/> }
        <Toast />
      </>
    </ToastProvider>
  )
}

export default App;
