import React, { useState } from 'react';
import NodesPanel from '../NodesPanel/NodesPanel';
import { useOnSelectionChange } from 'reactflow';
import SettingsPanel from '../SettingsPanel/SettingsPanel';

const Sidebar = ({onMessageChange, onNodesDelete}) => {
    const [selectedNode, setSelectedNode] = useState(null)

    //this onChange inside useOnSelectionChange gets called when we select any node by clicking
    useOnSelectionChange({
        onChange: ({ nodes }) => { nodes?.length > 0 ? nodes.map((nds)=>{setSelectedNode(nds)}) : setSelectedNode(null)}
      });
      
  return (
    <aside>
     {selectedNode ? <SettingsPanel onMessageChange={onMessageChange} node={selectedNode} onNodesDelete={onNodesDelete}/> 
                    : <NodesPanel/>}
    </aside>
  );
};

export default Sidebar