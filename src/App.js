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
    path : []
    
  };
  componentDidMount() {
    var grid1 = [];
    for (let i = 0; i < 16; i++) {
      var a = [];
      for (var j = 0; j < 36; j++) {
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
      var {path,grid} = this.state
      path.forEach(node=>{
        grid[node.x][node.y].type=''
      })
      
      this.setState({grid : grid,path:[]})
  }
  clearGrid = ()=>{
    
    var grid1 = [];
    for (let i = 0; i < 16; i++) {
      var a = [];
      for (var j = 0; j < 36; j++) {
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
    
    this.setState({ grid: grid1 ,path : [] });
  }
  visualize = ()=>{
    const {startNode , endNode , grid} = this.state
    this.clearPath()
    var path =[]
    path = findShortestPath(grid , grid[startNode.x][startNode.y],grid[endNode.x][endNode.y])
    console.log(path)
    this.setState(
      {
        path : path
      }
    )
    
    const grid1 =this.state.grid
    path.forEach(node=>{
      grid1[node.x][node.y].type='path'
    })
    this.setState({grid : grid1})
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
