import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  getIncomers,
  getConnectedEdges,
} from 'reactflow';
import 'reactflow/dist/style.css';

import './App.css';

import Sidebar from '../SideBar/Sidebar.jsx';  //sideBar Component for Nodepanel and Setting pannel
import MessageNode from '../CustomNodes/MessageNode/MessageNode.jsx'; //custom-node component
import ActionManager from '../Action-Manager/ActionManager.jsx'; //top-upper component containing save button and error div

//custom nodeType
const nodeTypes = { messageNode: MessageNode };

const initialNodes = [
  {
    id: '1',
    type: 'messageNode',
    data: { label: 'default node 1' },
    position: { x: 100, y: 5 },
  },
  {
    id: '2',
    type: 'messageNode',
    data: { label: 'default node 2' },
    position: { x: 500, y: 60 },
  }
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' }
]
let id = 0;
const getId = () => `dndnode_${id++}`;

const FlowBuilder = () => {
  const reactFlowWrapper = useRef(null);
  const nodesStr = localStorage.getItem('nodes') || '';
  const edgesStr = localStorage.getItem('edges') || '';

  const savedNode = nodesStr ? JSON.parse(nodesStr) : null;
  const savedEdge = edgesStr ? JSON.parse(edgesStr) : null;
  const [nodes, setNodes, onNodesChange] = useNodesState(savedNode || initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(savedEdge || initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  //method called on Save button click
  const onSave = () => {
    let count = 0;
    for(let i=0;i<nodes?.length;i++){
        const {id,position,data} = nodes[i]
        const incomers = getIncomers(
            {   id,
                data,
                position },
            nodes,
            edges,
            );
        if(incomers.length==0){
            count++
        }
        if(count==2){
            return true;
        }
    }
    // logic to save flow ( not defined in assignment)
    localStorage.setItem('nodes', JSON.stringify(nodes))
    localStorage.setItem('edges', JSON.stringify(edges))
    return false 
  }

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  //method called when node is dragover the pane
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  //method called when custom node is dropped inside the pane
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} ${id}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  //method to change the message inside node through setting panel
  const onMessageChange = useCallback((nodeMessage,id) => {
    setNodes((nds) =>
        nds.map((node) => {
          if (node.id == id) {
            node.data = {
              label: nodeMessage,
            };
          }
          return node;
        })
    )},[setNodes])

    const onNodesDelete = (node) => {
      const connectedEdges = getConnectedEdges([node], edges);
      reactFlowInstance.deleteElements({ nodes: [{id:node.id}], edges: connectedEdges })
    }

  return (
    <div className="dndflow">
      <ReactFlowProvider>
      <ActionManager onSave={onSave}/>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodesDelete={onNodesDelete}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar onMessageChange={onMessageChange} onNodesDelete={onNodesDelete}/>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowBuilder;