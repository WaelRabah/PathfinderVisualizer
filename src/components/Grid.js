import React from 'react'
import Node from './Node'
import './grid.css'
function Grid({ grid, MouseEnter, MouseUp, MouseDown , onDragHandler }) {
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
                            return (
                                <Node
                                    node={node}
                                    key={`${node.id}`}
                                    MouseEnter={MouseEnter}
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
