import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './modal.css'
export const Modal = ({children,title,handleModal}) => {
  return (
    <div className='modalBackDrop'>
        <div className='modalContainer'>
            <div className='modalHeader'>
                <p>{title}</p>
                <span>
                    <CloseIcon onClick={handleModal}></CloseIcon>
                </span>
            </div>
            <div className='modalBody'>
                {children}
            </div>
        </div>
    </div>
  )
}

