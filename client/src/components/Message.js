import React from 'react'
import './message.css'
const Message = ({backgroundColor,content}) => {
  return (
    <div className='message-container' style={{backgroundColor:backgroundColor}}>
        <p>{content}</p>
    </div>
  )
}

export default Message
