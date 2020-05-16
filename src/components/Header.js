import React  from 'react'
import {AppBar, Toolbar   }  from  '@material-ui/core'
import { KeyboardArrowDown } from '@material-ui/icons'
import { styled } from '@material-ui/core/styles';
import  './header.css'
function Header({setAlgorithm,visualize,Algorithms}) {

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
                  (algo,index)=>(
                    <div key={index} className='algo' onClick={()=>setAlgorithm(algo)}>{algo.name}</div>
                  )
                )
              }
              </div>
             
            </div>
            
            <div className='btn-cover'>
            <button 
            className='btn'
            onClick={visualize}
            >Visualize</button>
            </div>
            </MyToolBar>
       </MyAppBar>
    )
}

export default Header
