var grid1 = [];
var x =0
for (let i = 0; i < 16; i++) {
  var a = [];
  for (var j = 0; j < 16; j++) {
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
grid1[0][0].type = 'start'
grid1[10][10].type = 'end'

const grid = grid1

const DFS = {
    visited : [] ,
    search:(grid , startPoint , endPoint , gridSize)=>{

        const children=[
            {dx : 0 , dy : 1 },{dx : 0 , dy : -1 }
           ,{dx : 1 , dy : 0 },{dx : -1 , dy : 0 }]
    children.forEach(child=>{
        var {x,y} = startPoint
        const {dx , dy} = child
        x=x+dx
        y=y+dy
        if (!(x<gridSize.h && y < gridSize.w && x>= 0 && y >= 0))
        { return  }
        const v = grid[x][y]
        if (DFS.isIn(DFS.visited,v) )
        { return  }
        if ((v.x===endPoint.x && v.y === endPoint.y) || (DFS.dfsVisit(grid , v ,children,endPoint,gridSize)===true))
        {   startPoint.parent = undefined
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
            return({path : path , visited : DFS.visited})
        }

                v.parent = undefined
                
    return({path : [] , visited : DFS.visited})


    })


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
 
             if (DFS.isIn(DFS.visited,v) )
             { continue  }
             if ((v.x===endPoint.x && v.y === endPoint.y) || (DFS.dfsVisit(grid , v ,children,endPoint,gridSize)===true))
                 {
                     v.parent = p
                     return true
                 }
                 DFS.visited.push(v)         
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
console.log(DFS.search(grid,{x:0,y:0},{x:10,y:10},{h:16,w:16}))