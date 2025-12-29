import React from 'react'
import { useToast } from '../contexts/useToast'

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToast()

  return (
    <div className='toast-container'>
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <div className='toast-content'>
            <span>{toast.message}</span>
            <button
              className='toast-close'
              onClick={() => removeToast(toast.id)}
              aria-label='Close notification'
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Toast
