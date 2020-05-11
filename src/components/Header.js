import React  from 'react'
import {AppBar, Toolbar, Button   }  from  '@material-ui/core'
import { KeyboardArrowDown } from '@material-ui/icons'
import { styled } from '@material-ui/core/styles';
import  './header.css'
function Header({setAlgorithm}) {

    const MyAppBar = styled(AppBar)({
       backgroundColor : '#114064'
       ,
      });
      const MyToolBar = styled(Toolbar)({
        backgroundColor : '#114064'
        ,
        display : 'flex',
        justifyContent :'space-between'
       });
     
        const Algorithms = ['A*']
    return (
       <MyAppBar position='static' >
            <MyToolBar>
           
            <div className='dropdown'>
               <div className='label'> Algorithms </div> 
               <div className='icon'>
               <KeyboardArrowDown></KeyboardArrowDown>
               </div>
              <div className={`dropdownContent`}>
              {
                Algorithms.map(
                  algo=>(
                    <div className='algo' onClick={()=>setAlgorithm(algo)}>{algo}</div>
                  )
                )
              }
              </div>
             
            </div>
            
            <div className='btn-cover'>
            <button className='btn'>Visualize</button>
            </div>
            </MyToolBar>
       </MyAppBar>
    )
}

export default Header
