import React, { useEffect, useState } from 'react'
import './ActionManager.css'

const ActionManager = ({onSave}) => {
    const [showError, setShowError] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const onSaveClick = () =>{
        const flag = onSave()
        setShowError(flag)
        setShowSuccess(!flag)
    }

    // Success Message is clear after 5 seconds
    useEffect(() => {
      let resetSuccess
      if(showSuccess){
        resetSuccess = setTimeout(() => {
        setShowSuccess(false);
      }, 2500); // Success Message is clear after 5 seconds
    }
      return () => clearTimeout(resetSuccess);
    }, [showSuccess]);

  return (
    <div className='top-wrapper'>
        {showError && <div className='error'>Cannot Save Flow</div>}
        {showSuccess && <div className='success'>Flow Successfully Saved</div>}
        <button className='savBtn' onClick={onSaveClick}>Save Changes</button>
    </div>
  )
}

export default ActionManager
