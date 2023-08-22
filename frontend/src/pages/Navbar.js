import { useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha, useTheme } from '@mui/material/styles';


// icons
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../features/UserSlice';




function Navbar() {
  const navigate = useNavigate();
  const disaptch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const searchInputRef = useRef(null);


  const user = JSON.parse(localStorage.getItem("profile"))

  const userId = user?.id;
//   const token = user?.token;
  
//   if(token) {
//     const decodeToken = decode(token);
//     if(decodeToken.exp * 1000 < new Date().getTime()) {
//       disaptch(logout())
//     }
//   }

  const [state, setState] = useState({
    left: false,
  });

  /* Drawer for keyboard */
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
  
    setState({ left: open });
  };

  /* For MObile Drawer */
  const list = (anchor) => (
  <Box
    role="presentation"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
  >
    { userId && <Typography component="h1" paddingX={5} paddingY={4} sx={{ fontSize: "25px", fontWeight: 600, fontStyle: "oblique", backgroundColor: "#6d1b7b", color: "white"}}>{ user?.username }</Typography> }
    <List>
        <ListItem sx={{ display: "grid",}}>
          <ListItemButton 
             onClick={() => {
              userId ? navigate("/post/addPost") :
                      navigate("/login");
              }}
          >
            <ListItemIcon sx={{ display: "contents"}}>
              <AddIcon /> 
            </ListItemIcon>
            <ListItemText primary="Add Post" sx={{ marginLeft: "10px"}} />
          </ListItemButton>

          { userId && (
             <ListItemButton onClick={ () => navigate(`post/dashboard/${userId}`)}>
             <ListItemIcon  sx={{ display: "contents"}}>
               <DashboardIcon /> 
             </ListItemIcon>
             <ListItemText primary="Dashboard" sx={{ marginLeft: "10px"}}/>
           </ListItemButton>
          )}

          { userId ? (
          <ListItemButton onClick={ () => disaptch(logout())}>
            <ListItemIcon sx={{ display: "contents"}} >
              <LogoutIcon /> 
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ marginLeft: "10px"}} />
          </ListItemButton>
          ) : (
          <ListItemButton onClick={ () => navigate("/login") }>
            <ListItemIcon sx={{ display: "contents"}} >
              <LoginIcon /> 
            </ListItemIcon>
            <ListItemText primary="Login" sx={{ marginLeft: "10px"}} />
          </ListItemButton>

          ) }
        </ListItem>
    </List>
  </Box>
  );
 
  return (
    <AppBar position="sticky" sx={{ background: "#6d1b7b"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Desktop start*/}
          <TravelExploreIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: "20px",
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Blog
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
             <Button
                sx={{ color: 'white', display: 'block' }}
                 onClick={ () => {
                    userId ? navigate("/post/addPost")
                       : navigate("/login")
                 }}
              >
                Add Post
              </Button>
              { userId && (
                <Button
                 sx={{ color: 'white', display: 'block' }}
                  onClick = { () => {
                    navigate(`post/dashboard/${userId}`)
                  }}
                  >
                  Dashboard
                </Button>
              )}
          </Box>
          { !isMobile && (
            <Box sx={{ display: "flex", alignItems: "center"}}>
              <>
                { userId ? (
                  <Button
                  sx={{ color: 'white', display: 'block' }}
                    onClick={() => {
                      disaptch(logout());
                    }}
                    >
                    Logout
                  </Button>
                ) : (
                  <Button
                  onClick={ () => navigate("/login")}
                  sx={{ color: 'white', display: 'block' }}
                  >
                    Login
                  </Button>
                )}
                <Tooltip title={user?.username}>
                  <IconButton sx={{ p: 0 }}>
                    <Avatar>{ user?.username[0] }</Avatar>
                  </IconButton>
                </Tooltip>
              </>
            </Box>
          )}
          {/* Desktop end */}

           
          {/* Mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, width: "100%", alignItems: "center" }}>
            <IconButton
              size="large"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <IconButton color='inherit' size='large' onClick={ () => navigate("/")} sx={{ margin: "auto"}}>
             <TravelExploreIcon sx={{ display: { xs: 'flex', md: 'none', } }} />
            </IconButton>
            <Drawer open={state.left} onClose={toggleDrawer(false)}
              sx={{ '& .MuiDrawer-paper': { background: '#9c27b0' } }}
            >
              {list()}
            </Drawer>
         </Box>

         {/* Mobile End */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;