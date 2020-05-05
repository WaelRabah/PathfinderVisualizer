import React  from 'react'
import './node.css'
const Node=({node : {type,x,y},toggleBarrier,MouseDown,MouseUp,onDragHandler})=> {
    return (
        <div 
        className={`node ${type}`}
        onMouseUp={()=>MouseUp()}
        onMouseDown={()=>MouseDown(x,y)}
        onMouseEnter={()=>toggleBarrier(x,y)}
        onDrag={()=>onDragHandler()}
        >
            
        </div>
    )
}
export default  Node ;