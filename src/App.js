import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import { Container, Box } from "@material-ui/core";
import Grid from "./components/Grid";
import { findShortestPath } from './algorithms/A*'
export default class App extends Component {
  state = { 
    grid: [], 
    mousePressed: false, 
    startNode: { x: 0, y: 0 }, 
    endNode: { x: 2, y: 29 } ,
    algorithm : '' ,
    path : [],
    gridSize : {h : 18 , w : 40},
    visited : [] ,
    visitedFinished : false
    
  };
  componentDidMount() {
    let x=0
    var grid1 = [];
    for (let i = 0; i < this.state.gridSize.h; i++) {
      var a = [];
      for (var j = 0; j < this.state.gridSize.w; j++) {
        x++
        a.push({
          x: i,
          y: j,
          type: "",
          id : x

        });
      }
      grid1.push(a);
    }
    grid1[this.state.startNode.x][this.state.startNode.y].type = 'start'
    grid1[this.state.endNode.x][this.state.endNode.y].type = 'end'
    
    this.setState({ grid: grid1 });
  }
  mouseUp = () => {

    this.setState({
      mousePressed: false,
    });
  };
  mouseDown = (x, y) => {
    this.clearPath()
    const { grid } = this.state;
    if (grid[x][y].type === "start" || grid[x][y].type === "end")
      return
    grid[x][y].type = grid[x][y].type === "barrier" ? "" : "barrier";
    this.setState({
      mousePressed: true,
      grid: grid,
    });
  };
  onDrag = () => {
    this.setState({ mousePressed: false })
  }
  setAlgorithm = (algo) => {
        this.setState(
          {
            algorithm : algo
          }
        )
  }
  toggleBarrier = (x, y) => {
    
    if (this.state.mousePressed) {
      
      const { grid } = this.state;
      if (grid[x][y].type === "start" || grid[x][y].type === "end")
      return
      grid[x][y].type = grid[x][y].type === "barrier" ? "" : "barrier";
      this.setState({
        grid: grid,
      });

    }
  };
  clearPath = ()=>{
    var {visited,grid} = this.state
    visited.forEach(node=>{
      if (node.type==='start')
      return
      grid[node.x][node.y].type=''
      const node1=document.getElementById(`${node.id}`)  
      node1.className='node'
    })
    this.setState({grid : grid,path:[],visited : []})
    
  }
  clearGrid = ()=>{
    
    var grid1 = [];
    let x = 0
    for (let i = 0; i < this.state.gridSize.h; i++) {
      var a = [];
      for (var j = 0; j < this.state.gridSize.w; j++) {
        x++
        a.push({
          x: i,
          y: j,
          type: "",
          id : x

        });
        const node1 = document.getElementById(`${x}`)
        node1.className=`node`
      }
      grid1.push(a);
    }
    grid1[this.state.startNode.x][this.state.startNode.y].type = 'start'
    grid1[this.state.endNode.x][this.state.endNode.y].type = 'end'
    const node1 = document.getElementById(`${grid1[this.state.startNode.x][this.state.startNode.y].id}`)
    node1.className=`node start`
    const node2 = document.getElementById(`${grid1[this.state.endNode.x][this.state.endNode.y].id}`)
    node2.className=`node end`
    this.setState({ grid: grid1 ,path : [] });
  }
  visualize =async ()=>{
    const {startNode , endNode , grid} = this.state
    this.clearPath()
    
  const  ret =await findShortestPath(grid , grid[startNode.x][startNode.y],grid[endNode.x][endNode.y],this.state.gridSize)
    
    var {path,visited} = ret
    
    this.setState(
      {
        path : path ,
        visited : visited
        
      }
        
    )
   await this.animateVisited()
      
    
      
    
    
    
    


  }
  animatePath = ()=>{
    
    const { grid , path } = this.state
    
    for (let i=0;i<path.length ; i++)
    {
      const node = path[i]
      const node1 = document.getElementById(`${grid[node.x][node.y].id}`)
      setTimeout(()=>{
        grid[node.x][node.y].type='path'
        node1.className='node path'
    },i*20)
      
    }
    this.setState({grid : grid})
    
  }
  animateVisited = async ()=>{
    const { grid , visited } = this.state
        for (let i=0;i<visited.length ; i++)
        {
        
          
          const node = visited[i]
          const node1 = document.getElementById(`${node.id}`)
          
          setTimeout(()=>{
            if (node.type==='path' || node.type==='start')
            {
              return
            }
            grid[node.x][node.y].type='visited'
            node1.className='node visited'
        },i*5)
        if (i===visited.length-1)
        {
          setTimeout(()=>{this.animatePath()},5*i)
          return
          
        }
        }
    
        this.setState({grid : grid , visitedFinished : true})
      }
  render() {
    return (
      <Box>
        <Header 
        setAlgorithm={this.setAlgorithm} 
        visualize={this.visualize}
         />
        <Container>
        <div className='dashboard'>
          <div className='algorithm'>{this.state.algorithm && 'Selected algorithm :'} {this.state.algorithm}</div>
        <div className='btn-cover1'>
        <button className='btn1' onClick={this.clearGrid}>
            Clear Grid
        </button>
        <button className='btn1' onClick={this.clearPath}>
        Clear Path
    </button>
        </div>
        </div>
       
          <Grid
            grid={this.state.grid}
            toggleBarrier={this.toggleBarrier}
            MouseDown={this.mouseDown}
            MouseUp={this.mouseUp}
            onDragHandler={this.onDrag}
          />

        </Container>
      </Box>
    );
  }
}
