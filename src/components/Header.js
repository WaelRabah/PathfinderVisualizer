import React  from 'react'
import {AppBar, Toolbar   }  from  '@material-ui/core'
import { KeyboardArrowDown } from '@material-ui/icons'
import { styled } from '@material-ui/core/styles';
import './header.css'
function Header() {
    // const [menuOpen, setMenuOpen] = useState(false)
    // const open = ()=>setMenuOpen(true)
    // const close = ()=>setMenuOpen(false)
    // const MyButton = styled(Button)({
    //     background: `#114064`,
    //     border: 'solid 1px #fff',
    //     borderRadius: 3,
        
    //     color: 'white',
    //     height: 48,
    //     padding: '0px 30px',
    //     marginLeft : 100 ,
    //     padding : '0px 80px'
    //   });
    const MyAppBar = styled(AppBar)({
       backgroundColor : '#114064'
       ,
      });
      
      
    return (
       <MyAppBar position='static' >
            <Toolbar>
           
            <div className={`dropdown`}>
               <div className='label'> Algorithms </div> 
               <div className='icon'>
               <KeyboardArrowDown></KeyboardArrowDown>
               </div>
              <div className={`dropdown-content`}>
                <div className='algo'>A*</div>
                <div className='algo'>Djikstra</div>
              </div>
            </div>
            </Toolbar>
       </MyAppBar>
    )
}

export default Header
