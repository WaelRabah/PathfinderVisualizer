import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import { Container, Box } from "@material-ui/core";
import Grid from "./components/Grid";
import Astar from './algorithms/A*'
import Djikstra from "./algorithms/Djikstra";
import DFS from "./algorithms/DFS";

export default class App extends Component {
  state = { 
    grid: [], 
    mousePressed: false, 
    startNode: { x: 0, y: 7 }, 
    endNode: { x: 7, y: 10 } ,
    selectedAlgorithm : false ,
    path : [],
    gridSize : {h : 14 , w : 30},
    visited : [] ,
    Algorithms : [{name :'A*' , object : Astar},{name :'Djikstra' , object : Djikstra},{name :'DFS' , object : DFS}],
    algoName : '',
    moveStart : false ,
    moveEnd : false,
    animated : false
    
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
          id : x,
          parent : undefined

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
      moveStart : false ,
      mousePressed: false,
      moveEnd : false
    });
  };
  mouseDown = (x, y) => {
    this.clearPath()
    const { grid } = this.state;
    if (grid[x][y].type === "start" )
      {
        this.setState({moveStart : true})  
        return
      }
    if (grid[x][y].type === "end" )
      {
        this.setState({moveEnd : true})  
        return
      }
    grid[x][y].type = grid[x][y].type === "barrier" ? "" : "barrier";
    this.setState({
      mousePressed: true,
      grid: grid,
    });
  };
  onDrag = () => {
    this.setState({ mousePressed: false, moveStart : false , moveEnd : false })
  }
  setAlgorithm = (algo) => {
    
        this.setState(
          {
            selectedAlgorithm : algo , 
            algoName : `Selected algorithm : ${algo.name}`
          }
        )
  }
  mouseEnter =async (x, y) => {
    const {grid , startNode , endNode , moveStart , moveEnd , mousePressed} = this.state
    if (moveStart)
    {
      this.clearPath()
      grid[startNode.x][startNode.y].type=''
      grid[x][y].type='start'

      this.setState({
        grid: grid,
        startNode : {x: x , y: y}
      });
      return
    }
    if (moveEnd)
    {
      
      grid[endNode.x][endNode.y].type=''
      grid[x][y].type='end'

      this.setState({
        grid: grid,
        endNode : {x: x , y: y}
      });
      return
    }
    if (mousePressed) {
      
      
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
      grid[node.x][node.y].parent=null
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
  clearParent = ()=>{
    this.setState(
      prev=>{
        const {grid} = prev

        grid.map(
          row=>row.map(node=>{node.parent=undefined; return(node);})
        )
      }
    )
  }
  visualize =async ()=>{
    const {startNode , endNode , grid , selectedAlgorithm} = this.state
    if (!selectedAlgorithm)
      {
         await this.setState({algoName : 'Please select an algorithm'})
          return
      }
    this.clearPath()
  const  ret =await this.state.selectedAlgorithm.object.search(grid , startNode,endNode,this.state.gridSize)

    var {path,visited} = ret
    this.setState(
      {
        path : path ,
        visited : visited
        
      }
       
    )
this.animateVisited()
this.clearParent()
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
        Algorithms={this.state.Algorithms}
         />
        <Container>
        <div className='dashboard'>
          <div className='algorithm'>{this.state.algoName}</div>
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
            MouseEnter={this.mouseEnter}
            MouseDown={this.mouseDown}
            MouseUp={this.mouseUp}
            onDragHandler={this.onDrag}
          />
        
        </Container>
      </Box>
    );
  }
}
