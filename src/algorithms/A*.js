




const Astar = {
    manhattanDistance : (A,B)=>
    {
        var d1 = Math.abs (A.x - B.x);
        var d2 = Math.abs (A.y - B.y);
        return d1 + d2; 
    
        
    },
    search : function (grid,startPoint,endPoint,gridSize)
    {  var current = null 
       var open=[]
       var close = [] 
       var path = []
       var visited=[]
    
       grid[startPoint.x][startPoint.y].g=0
       grid[startPoint.x][startPoint.y].h=Astar.manhattanDistance(grid[startPoint.x][startPoint.y],grid[endPoint.x][endPoint.y])
       grid[startPoint.x][startPoint.y].f=grid[startPoint.x][startPoint.y].g+grid[startPoint.x][startPoint.y].h
       open.push(grid[startPoint.x][startPoint.y])
       
       while (open.length > 0)
       {
        const {min,idx} = Astar.minNode(open)
        current = min 
        visited.push(current)
        open=open.filter((val,index)=>index!== idx)
        close.push(current)
        if (current.x===endPoint.x && current.y===endPoint.y)
        {
            
            var currentNode = current
            while (typeof currentNode !== 'undefined')
            {
                    path.push({x:currentNode.x,y:currentNode.y})
                    currentNode=currentNode.parent
                
    
            }
            path=path.reverse()
            path.splice(0,1)
            path.splice(path.length -1 ,1)
            visited.splice(0,1)
            visited.splice(visited.length -1 ,1)
            const ret = {path , visited}
            return ret
        }
        const {open1 , grid1}=Astar.generateChildren(grid,current,close,open,startPoint,endPoint,gridSize)
        open = open1
        grid = grid1
       
       } 
       const ret = {path , visited}
       return (ret)
    },
    minNode : function (list)
    {
      var min =list[0]
      var minIdx = 0 
      for (let i = 1 ; i< list.length ; i++)
      {
          if (list[i].f < min.f)
          {
              min = list[i]
              minIdx = i
          }
      }
      return {min : min , idx : minIdx}
    },
  generateChildren :  function (grid , current,close,open,startPoint,endPoint,gridSize)
{
    //    const children=[
    //      {dx : 0 , dy : 1 },{dx : 0 , dy : -1 }
    //     ,{dx : 1 , dy : 1 },{dx : 1 , dy : -1 }
    //     ,{dx : -1 , dy : 1 },{dx : -1 , dy : -1 }
    //     ,{dx : 1 , dy : 0 },{dx : -1 , dy : 0 }]
    
    const children=[
        {dx : 0 , dy : 1 },{dx : 0 , dy : -1 }
       ,{dx : 1 , dy : 0 },{dx : -1 , dy : 0 }]
       children.forEach(
           item=>{
               
               const x = current.x+item.dx
               const y = current.y+item.dy
           
            if (x<gridSize.h && y < gridSize.w && x>= 0 && y >= 0)
            {
                const node = grid[x][y]
                
                if (Astar.isIn(close,node) || (node.type==='barrier'))
                {

                    return 
                }
              
                node.g=current.g+Astar.manhattanDistance(node,current)
                node.h=Astar.manhattanDistance(node,endPoint)
                node.f=node.g+node.h
                grid[current.x+item.dx][current.y+item.dy] = node
                if (Astar.isIn(open,node))
                {
                   
                        return
                    
                }
            
                  node.parent=current
                open.push(node)
                
            }   
            
           }
       )
        return {grid1 : grid , open1 : open }
},
isIn : function  (l,node)
{
    for (let i =0 ; i<l.length ; i++)
    {
        if (l[i].x===node.x && l[i].y===node.y)
            return true
        
    }
    return false
}
}
export default Astar