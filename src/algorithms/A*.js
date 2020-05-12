const euclideanDistance = (A,B)=>
{
    var c = (B.x-A.x)*(B.x-A.x) + (B.y-A.y)*(B.y-A.y)    

    return (c)
}
function minNode (list)
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
}
function maxNode (list)
{
  var max =list[0]
  var maxIdx = 0 
  for (let i = 1 ; i< list.length ; i++)
  {
      if (list[i].g > max.g)
      {
          max = list[i]
          maxIdx = i
      }
  }
  return {max : max , idx : maxIdx}
}
function isIn (l,node)
{
    for (let i =0 ; i<l.length ; i++)
    {
        if (l[i].x===node.x && l[i].y===node.y)
            return true
        
    }
    return false
}
function generateChildren (grid , current,close,open,endPoint)
{
       const children=[
         {dx : 0 , dy : 1 },{dx : 0 , dy : -1 }
        ,{dx : 1 , dy : 1 },{dx : 1 , dy : -1 }
        ,{dx : -1 , dy : 1 },{dx : -1 , dy : -1 }
        ,{dx : 1 , dy : 0 },{dx : -1 , dy : 0 }]
       children.forEach(
           item=>{
               
               const x = current.x+item.dx
               const y = current.y+item.dy
            if (x<16 && y < 36 && x>= 0 && y >= 0)
            {
                const node = grid[x][y]
                
                if (isIn(close,node) || (node.type==='barrier'))
                {
                    return 
                }
                node.g=current.g+euclideanDistance(node,current)
                node.h=euclideanDistance(node,endPoint)
                node.f=node.g+node.h
                grid[current.x+item.dx][current.y+item.dy] = node
                if (isIn(open,node))
                {
                    if ((node.g) > maxNode(open).max.g)
                    {
                        return
                    }
                }
                node.parent=current
                open.push(node)
                
            }   
            
           }
       )
        return {grid1 : grid , open1 : open }
}
function findShortestPath (grid,startPoint,endPoint)
{  var current = null 
   var open=[]
   var close = [] 
   
   grid[startPoint.x][startPoint.y].g=0
   grid[startPoint.x][startPoint.y].h=euclideanDistance(grid[startPoint.x][startPoint.y],grid[endPoint.x][endPoint.y])
   grid[startPoint.x][startPoint.y].f=grid[startPoint.x][startPoint.y].g+grid[startPoint.x][startPoint.y].h
   open.push(grid[startPoint.x][startPoint.y])
   
   while (open.length > 0)
   {
    const {min,idx} = minNode(open)
    current = min 
    open=open.filter((val,index)=>index!== idx)
    close.push(current)
    if (current.x===endPoint.x && current.y===endPoint.y)
    {
        var path = []
        var currentNode = current
        while (typeof currentNode !== 'undefined')
        {
                path.push({x:currentNode.x,y:currentNode.y})
                currentNode=currentNode.parent

        }
        path=path.reverse()
        path.splice(0,1)
        path.splice(path.length -1 ,1)
        return path
    }
    const {open1 , grid1}=generateChildren(grid,current,close,open,endPoint)
    open = open1
    grid = grid1
    
   } 
}
export {findShortestPath}