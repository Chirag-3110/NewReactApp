import React, { useEffect,useState,useCallback} from 'react';
import ReactFlow, { 
  addEdge, 
  Background,
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState,
  updateEdge,
  ReactFlowProvider
}from 'react-flow-renderer';
import './AdminPage.css';
let newInitialNode=[

];
let newInitialEdges=[

];
const WorkFow=()=>{
    const [newNode,setNodeNodes,onNodeChange]=useNodesState(newInitialNode);
    const [newEdge,setNewEdge,onNewEdgeChange]=useNodesState(newInitialEdges);
  //states for creating Nodes
    const [parentName,setParentName]=useState(null);
    const [child,setChild]=useState(null);
    const [parent,setParent]=useState(false);
      const onInit=(reactFlowInstance)=>{
        console.log('flow loaded:', reactFlowInstance);
      }
      const onConnect = useCallback(
        (connection) => setNewEdge((eds) => addEdge(connection, eds)),
        [setNewEdge]
      );
    const createNode=()=>{
      if(newNode.length==0){
        setNodeNodes([...newNode, {id:parentName,data:{label:parentName},type:'input',position: {x:0,y:0}}]);
        setParent(true);
      }else{
        setNodeNodes([...newNode, {id:child,data:{label:child},position: {x:100,y:100}}]);
      }
      console.log(newNode);
      newEdge.length==0?
      setNewEdge([...newEdge,{ id:Math.random()*Math.pow(10,16),type: 'smoothstep'}]):
      setNewEdge([...newEdge,{id:Math.random()*Math.pow(10,16),type:'smoothstep', source:parentName, target:child}]) 
    }
    return(
        <>
           <div style={{display:'flex'}}>
            <div className="main-container" style={{width:'40%',height:'600px'}}>
                <div className="task-input-div">
                  <p className="text-para">
                      Parent Node:
                  </p>
                  <input className="user-id-field"
                      placeholder="Enter Parent Node Name"
                      onChange={(parentName)=>setParentName(parentName.target.value)}
                  />
                </div>
                {
                  parent?<div className="task-input-div">
                  <p className="text-para">
                      Parent Node:
                  </p>
                  <input className="user-id-field"
                      placeholder="Enter Child Node Name"
                      onChange={(child)=>setChild(child.target.value)}
                  />
                </div>:null
                }
                <div className='button-div'>
                  <p>For Adding child node please select parent from workflow plane</p>
                  <div className="savebutton success" onClick={()=>createNode()} ><p>Add Node</p></div>
                </div>
              </div>
              <div style={{width:'60%',height:'600px',backgroundColor:'#e0eaff'}} className="admin-workflow-container">
               <ReactFlowProvider >
                 <ReactFlow
                     defaultNodes={newNode}
                     defaultEdges={newEdge}
                     onNodesChange={onNodeChange}
                     onEdgesChange={onNewEdgeChange}
                     onInit={onInit}
                     onConnect={onConnect}
                     connectionLineStyle={{stroke:"black",strokeWidth:2}}
                     connectionLineType="bezier"
                     snapToGrid={true}
                     snapGrid={[16,16]}
                 >
                     <Background gap={20} color="black"/>
                     <MiniMap nodeColor='black'/>
                     <Controls/>
                 </ReactFlow>
               </ReactFlowProvider>
               
             </div>
           </div>
        </>
    )
}
export default WorkFow;