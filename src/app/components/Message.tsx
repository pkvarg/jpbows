import React from 'react'

interface MessageProps {
  variant?: string
  children: string
}

const Message: React.FC<MessageProps> = ({ variant = 'info', children }) => {
  return (
    <>
      {variant === 'danger' ? (
        <span
          className="text-red-500 text-[25px] px-4 my-4 inline-block relative text-center"
          role="alert"
        >
          <strong className="font-bold">{children}</strong>
        </span>
      ) : (
        <span
          className="text-green-600 text-[25px] px-4 my-4 inline-block relative text-center"
          role="alert"
        >
          <strong className="font-bold">{children}</strong>
        </span>
      )}
    </>
  )
}

export default Message
