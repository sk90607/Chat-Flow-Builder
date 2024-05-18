const NodesPanel = () => {

    //method to track drag of the custom-node from node panel 
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
      };
    return (
      <>
        <div className="description">You can drag these nodes to the pane.</div>
        <div className="dndnode" onDragStart={(event) => onDragStart(event, 'messageNode')} draggable>
            Message Node
        </div>
      </>
    )
}

export default NodesPanel