import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import { Container, Box } from "@material-ui/core";
import Grid from "./components/Grid";

export default class App extends Component {
  state = { grid: [], mousePressed: false };
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
    this.setState({ grid: grid1 });
  }
  mouseUp = () => {
    
    this.setState({
      mousePressed: false,
    });
  };
  mouseDown = (x, y) => {
   
    const { grid } = this.state;
    grid[x][y].type = grid[x][y].type === "barrier" ? "" : "barrier";
    this.setState({
      mousePressed: true,
      grid: grid,
    });
  };
  onDrag = ()=>{
    this.setState({mousePressed : false})
  }
  toggleBarrier = (x, y) => {
    
    if (this.state.mousePressed) {
      const { grid } = this.state;
    grid[x][y].type = grid[x][y].type === "barrier" ? "" : "barrier";
    this.setState({
      grid: grid,
    });
      
    }
  };
  render() {
    return (
      <Box>
        <Header />
        <Container>
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
