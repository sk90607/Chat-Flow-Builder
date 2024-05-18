import { Handle, Position } from 'reactflow';
import './MessageNode.css'

const MessageNode = ({ data, isConnectable }) => {

  return (
    <div className={"messageNode"}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div className='inner-Wrapper'>
        <h3>Send Message</h3>
        <span>{data.label}</span>
      </div>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
    </div>
  );
}

export default MessageNode;
