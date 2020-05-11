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
    startNode: { x: 5, y: 10 }, 
    endNode: { x: 13, y: 29 } ,
    algorithm : '' ,
    
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
    
    this.setState({ grid: grid1 });
  }
  render() {
    return (
      <Box>
        <Header setAlgorithm={this.setAlgorithm} algorithm={this.state.algorithm} />
        <Container>
        <div className='dashboard'>
          <div className='algorithm'>{this.state.algorithm && 'Selected algorithm :'} {this.state.algorithm}</div>
        <div className='btn-cover1'>
        <button className='btn1' onClick={this.clearGrid}>
            Clear Grid
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
