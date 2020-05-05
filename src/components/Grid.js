import React from 'react'
import Node from './Node'
import './grid.css'
function Grid({ grid, toggleBarrier, MouseUp, MouseDown , onDragHandler }) {
    var i=0;
    
    return (
        <div id='grid'>

            {
                grid.map((row, index) => {
            return (
                <div
                    key={`row${index}`}
                    id='row'>
                    {
                        row.map((node, index1) => {
                            i++
                            return (
                                <Node
                                    node={node}
                                    key={String(i)}
                                    toggleBarrier={toggleBarrier}
                                    MouseUp={MouseUp}
                                    MouseDown={MouseDown}
                                    onDragHandler={onDragHandler}
                                />
                            )
                        })
                    }
                </div>
            )
        })
            }


        </div>

    )
}

export default Grid
