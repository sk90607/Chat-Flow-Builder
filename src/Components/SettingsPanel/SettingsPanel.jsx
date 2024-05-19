import React, { useEffect, useState } from 'react'
import './SettingsPanel.css'

const SettingsPanel = ({onMessageChange, node, onNodesDelete}) => {
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
    const onDeleteClick = () =>{
      onNodesDelete(node)
    }
  return (
    <div className='message-setting'>
        <label htmlFor='message'>Text</label>
        <textarea name='message' value={newNodeMessage} onChange={handleInputChange}></textarea>
        <button className='deleteBtn' onClick={onDeleteClick}>Delete Node</button>
    </div>
  )
}

export default SettingsPanel
