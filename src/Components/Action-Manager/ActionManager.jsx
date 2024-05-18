import React, { useState } from 'react'
import './ActionManager.css'

const ActionManager = ({onSave}) => {
    const [showError, setShowError] = useState(false)

    const onSaveClick = () =>{
        const flag = onSave()
        setShowError(flag)
    }
  return (
    <div className='top-wrapper'>
        {showError && <div className='error'>Cannot Save Flow</div>}
        <button className='savBtn' onClick={onSaveClick}>Save Changes</button>
    </div>
  )
}

export default ActionManager
