const DFS = {
    visited : [] ,
    search:(grid , startPoint , endPoint , gridSize)=>{
        DFS.visited=[]
        const children=[
            {dx : -1 , dy : 0 },{dx : 0 , dy : 1 }
          ,{dx : 1 , dy : 0 } ,{dx : 0 , dy : -1 }]
           DFS.visited.push(startPoint)
    for (let i =0 ; i<children.length ; i++)
    {
         const child = children[i]   
         var {x,y} = startPoint
         const {dx , dy} = child
         x=x+dx
         y=y+dy
         if (!(x<gridSize.h && y < gridSize.w && x>= 0 && y >= 0))
         { continue  }
         const v = grid[x][y]
         if (v.type==='barrier')
         {continue}
         if (DFS.isIn(DFS.visited,v) )
         { continue  }
     
      

         if ((v.x===endPoint.x && v.y === endPoint.y) )
         {   DFS.visited.push(v)
             startPoint.parent = undefined
             v.parent = startPoint
             let path = []
             x=endPoint.x
             y=endPoint.y
 
             let current =  grid[x][y]
             while (current)
             {
                 path.push({x : current.x , y : current.y})
 
                 current = current.parent
                
             }
             path=path.reverse()
             path.splice(0,1)
             path.splice(path.length -1 ,1)
             const res = {path : path , visited : DFS.visited}
             return(res)
         }
         else 
         {
            DFS.visited.push(v) 
            const dfsvis = DFS.dfsVisit(grid , v ,children,endPoint,gridSize)
            if (dfsvis)
            {
                startPoint.parent = undefined
                v.parent = startPoint
                let path = []
                x=endPoint.x
                y=endPoint.y
    
                let current =  grid[x][y]
                while (current)
                {
                    path.push({x : current.x , y : current.y})
    
                    current = current.parent
                   
                }
                path=path.reverse()
                path.splice(0,1)
                path.splice(path.length -1 ,1)
                DFS.visited.splice(0,1)
                DFS.visited.splice(DFS.visited.length  ,1)
                const res = {path : path , visited : DFS.visited}
                return(res)
            }
         }
           
    }

    return({path : [] , visited : DFS.visited})
    },
    dfsVisit :(grid , p ,children,endPoint,gridSize)=> {
        for (let i =0 ; i<children.length ; i++)
        {
             const child = children[i]   
             var {x,y} = p
             const {dx , dy} = child
             x=x+dx
             y=y+dy
 
             if (!(x<gridSize.h && y < gridSize.w && x>= 0 && y >= 0))
             { continue  }
             const v = grid[x][y]
             if (v.type==='barrier')
             {continue}
             if (DFS.isIn(DFS.visited,v) )
             { continue  }
             
             
             if ((v.x===endPoint.x && v.y === endPoint.y) )
                 {
                             
                     v.parent = p
                     return true
                 }
                 else 
                 {
                    DFS.visited.push(v) 
                    const dfsvis = DFS.dfsVisit(grid , v ,children,endPoint,gridSize)
                    if (dfsvis)
                    {
                        v.parent = p
                        return true  
                    }
                 }
               
        }
            return false
    }
    ,
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
export default DFS