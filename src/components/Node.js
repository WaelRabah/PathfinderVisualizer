import React  from 'react'
import './node.css'
const Node=({node : {type,x,y},toggleBarrier,MouseDown,MouseUp,onDragHandler})=> {
    return (
        <div 
        className={`node ${type}`}
        onMouseUp={(e)=>{  MouseUp()}}
        onMouseDown={(e)=>{ e.preventDefault(); MouseDown(x,y)}}
        onMouseEnter={()=>toggleBarrier(x,y)}
        onDrag={()=>onDragHandler()}
        >
           
        </div>
    )
}
export default  Node ;