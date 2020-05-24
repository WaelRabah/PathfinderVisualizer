const Djikstra = {
  manhattanDistance: (A, B) => {
    var d1 = Math.abs(A.x - B.x);
    var d2 = Math.abs(A.y - B.y);
    return d1 + d2;
  },
  heap: class heap {
    constructor() {
      this.data = [];
    }
    sort = () => {
      this.data.sort((a, b) => a.d <= b.d);
    };
    insert = (x) => {
      if (this.data.length === 0) {
        this.data.push(x);
        return;
      }
      this.data.push(x);
      this.sort();
    };
    pop = () => {
      if (this.data.length === 0) {
        return null;
      }
      const x = this.data.shift();

      return x;
    };
    isEmpty = () => this.data.length === 0;

    has = (node) => {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].x === node.x && this.data[i].y === node.y) {
          return true;
        }
      }
      return false;
    };
  },
  search: function (grid, startPoint, endPoint, gridSize) {
    var current=null
    var heap = new Djikstra.heap();
    var discovered = [];
    var path = []
    var end = grid[endPoint.x][endPoint.y];
    grid.map((row) => {
      row.map((node) => {
        node.d = Infinity;
        return node;
      });
      return row;
    });
    grid[startPoint.x][startPoint.y].d = 0;
    heap.insert(grid[startPoint.x][startPoint.y]);
 
    while (!heap.isEmpty()) {
      current = heap.pop();
      discovered.push(current);
      const children = [
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: -1, dy: 0 },
      ];
      // eslint-disable-next-line no-loop-func
      children.forEach((child) => {
   
        
      
        const x = current.x+child.dx
        const y = current.y+child.dy
    
     if (x<gridSize.h && y < gridSize.w && x>= 0 && y >= 0)
     {
        const neighbor = grid[x][y];
        if ( (neighbor.type==='barrier'))
        {

            return 
        }
        if (!Djikstra.isIn(discovered, neighbor)) {
          const minDist = Math.min(neighbor.d, current.d + 1);
          if (minDist !== neighbor.d) {
            neighbor.d = minDist;
            neighbor.parent = current;
          }
          if (heap.has(neighbor))
          {
              heap.sort()
          }
          else 
          {
              heap.insert(neighbor)
          }
        }
    }
      });
      
      
      if (current.x=== endPoint.x && current.y === endPoint.y)
      {
      
        current = end 
        while (current.parent)
        {
            path.push(current)
            current=current.parent
        }
       path= path.reverse()
       var visited = discovered
    
                path.splice(path.length -1 ,1)
                visited.pop()
                const ret = {path , visited}
          
    return ret
      }

    }

        return({path : [] , visited : discovered})
    

  },

  isIn: function (l, node) {
    for (let i = 0; i < l.length; i++) {
      if (l[i].x === node.x && l[i].y === node.y) return true;
    }
    return false;
  },
};
export default Djikstra ;
