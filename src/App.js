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
    startNode: { x: 2, y: 5 }, 
    endNode: { x: 2, y: 29 } ,
    algorithm : '' ,
    path : [],
    gridSize : {h : 22 , w : 42},
    visited : [] ,
    visitedFinished : false
    
  };
  componentDidMount() {
    var grid1 = [];
    for (let i = 0; i < this.state.gridSize.h; i++) {
      var a = [];
      for (var j = 0; j < this.state.gridSize.w; j++) {
        a.push({
          x: i,
          y: j,
          type: "",

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
      grid[node.x][node.y].type=''
      const node1=document.getElementById(`node${node.x}${node.y}`)  
      node1.className='node'
    })
    this.setState({grid : grid,path:[],visited : []})
    
  }
  // clearPath = ()=>{
  //     var {path,grid} = this.state
  //     path.forEach(node=>{
  //       grid[node.x][node.y].type=''
  //       const node1=document.getElementById(`node${node.x}${node.y}`)  
  //       node1.className='node'
  //     })
      
  //     this.setState({grid : grid,path:[]})
  // }
  clearGrid = ()=>{
    
    var grid1 = [];
    for (let i = 0; i < this.state.gridSize.h; i++) {
      var a = [];
      for (var j = 0; j < this.state.gridSize.w; j++) {
        a.push({
          x: i,
          y: j,
          type: "",

        });
        const node1 = document.getElementById(`node${i}${j}`)
        node1.className=`node`
      }
      grid1.push(a);
    }
    grid1[this.state.startNode.x][this.state.startNode.y].type = 'start'
    grid1[this.state.endNode.x][this.state.endNode.y].type = 'end'
    const node1 = document.getElementById(`node${this.state.startNode.x}${this.state.startNode.y}`)
    node1.className=`node start`
    const node2 = document.getElementById(`node${this.state.endNode.x}${this.state.endNode.y}`)
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
    grid[1].forEach(item=>{console.log(item)})
    this.animateVisited()
    if (this.state.visitedFinished)
    {
      this.animatePath()
    }
    
    
    


  }
  animatePath = ()=>{
    
    const { grid , path } = this.state
    
    for (let i=0;i<path.length ; i++)
    {
      const node = path[i]
      const node1 = document.getElementById(`node${node.x}${node.y}`)
      setTimeout(()=>{
        grid[node.x][node.y].type='path'
        node1.className='node path'
    },i*65)
      
    }
    this.setState({grid : grid})
    
  }
  animateVisited = async ()=>{
    const { grid , visited } = this.state
    
        for (let i=0;i<visited.length ; i++)
        {
          
          const node = visited[i]
          const node1 = document.getElementById(`node${node.x}${node.y}`)
          
          setTimeout(()=>{
            if (node.type==='path')
            {
              return
            }
            grid[node.x][node.y].type='visited'
            node1.className='node visited'
        },i*1)
          
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
