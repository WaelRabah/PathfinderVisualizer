import React , {useState} from 'react'
import {AppBar, Toolbar , colors , Menu , MenuItem, Button , Fade}  from  '@material-ui/core'
import { KeyboardArrowDown } from '@material-ui/icons'
import { styled } from '@material-ui/core/styles';
function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const open = ()=>setMenuOpen(true)
    const close = ()=>setMenuOpen(false)
    const MyButton = styled(Button)({
        background: `#114064`,
        border: 'solid 1px #fff',
        borderRadius: 3,
        
        color: 'white',
        height: 48,
        padding: '0px 30px',
        marginLeft : 100 ,
        padding : '0px 80px'
      });
    const MyAppBar = styled(AppBar)({
       backgroundColor : '#114064'
       ,
      });
      
      
    return (
       <MyAppBar position='static' >
            <Toolbar>
            <MyButton onClick={open}  >  Algorithms  <KeyboardArrowDown /></MyButton>
           
            <Menu
  id="fade-menu"
  anchorEl={menuOpen}
  open={menuOpen}
  onClose={close}
  TransitionComponent={Fade}
  style={{marginTop : 42,marginLeft : 158}}
  
>
  <MenuItem 
  style={{width : 250}}
  onClick={close}>A*</MenuItem>
 
</Menu>    
            </Toolbar>
       </MyAppBar>
    )
}

export default Header
