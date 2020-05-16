import React  from 'react'
import './node.css'
const Node=({node : {type,x,y,id},MouseEnter,MouseDown,MouseUp,onDragHandler})=> {
    return (
        <div 
        id={`${id}`}
        className={`node ${type}`}
        onMouseUp={(e)=>{  MouseUp()}}
        onMouseDown={(e)=>{ e.preventDefault(); MouseDown(x,y)}}
        onMouseEnter={()=>MouseEnter(x,y)}
        onDrag={()=>onDragHandler()}
        >
           
        </div>
    )
}
export default  Node ;