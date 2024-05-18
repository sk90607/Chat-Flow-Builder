import React, { useEffect, useState } from 'react'
import './SettingsPanel.css'

const SettingsPanel = ({onMessageChange, node}) => {
    const {data,id} = node || {}
    const [newNodeMessage,setNewNodeMessage] = useState(data.label)
    useEffect(()=>{
        setNewNodeMessage(data.label)
    },[data.label])
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setNewNodeMessage(newValue);
        onMessageChange(newValue,id);
    };
  return (
    <div className='message-setting'>
        <label htmlFor='message'>Text</label>
        <textarea name='message' value={newNodeMessage} onChange={handleInputChange}></textarea>
    </div>
  )
}

export default SettingsPanel
