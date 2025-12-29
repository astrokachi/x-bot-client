import React from 'react'

const Button = ({children, onClick, disabled}: {children: React.ReactNode, onClick: () => void, disabled?: boolean}) => {
  return (
    <button className='login-btn' onClick={onClick} disabled={disabled}>{children}</button>
  )
}

export default Button;