import React , {useState} from 'react'
import {AppBar, Toolbar , colors , Menu , MenuItem, Button , Fade}  from  '@material-ui/core'
import { KeyboardArrowDown } from '@material-ui/icons'
import { styled } from '@material-ui/core/styles';
function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const open = ()=>setMenuOpen(true)
    const close = ()=>setMenuOpen(false)
    const MyButton = styled(Button)({
        background: `linear-gradient(45deg, ${colors.yellow['500']} 30%, ${colors.amber['600']} 90%)`,
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        height: 48,
        padding: '0 30px',
        marginLeft : 150
      });
    const MyAppBar = styled(AppBar)({
       background : colors.blueGrey['900']
      });
      const MyMenuItem = styled(MenuItem)(
        {
            background : colors.yellow['500']
        }
    )
      
    return (
       <MyAppBar position='static' >
            <Toolbar>
            <MyButton onClick={open} >Algorithms <KeyboardArrowDown /></MyButton>
            <anchorEl />
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
