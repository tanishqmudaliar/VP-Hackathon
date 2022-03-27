import React,{ useState } from 'react';
import logo from '../assets/vp-logo.png'
import '../styles/Header.css';
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from 'react-router-dom';
import { 
  styled,
  useTheme,
  Box,
  Drawer,
  Button,
  Toolbar,
  Divider,
  IconButton,
  List,
  ListItem,
  Breadcrumbs,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  emphasize,
  Chip,
  Collapse
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CollectionsIcon from '@mui/icons-material/Collections';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import HomeRounded from '@mui/icons-material/HomeRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AccountPopover from './AccountPopover';

const drawerWidth = 240;

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3.5),
    cursor: 'pointer',
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Header() {
  const theme = useTheme();
  const { user } = useUserAuth();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCollapse, setOpenCollapse] = React.useState(false);
  const navigate = useNavigate();

  function handleOpenSettings(){
     setOpenCollapse(!openCollapse);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateHome = () => {
    navigate('/home');
  }

  const navigateGallery = () => {
    navigate('/gallery');
  }

  return (
    <div className='Header'>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar open={open} sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="success"
            aria-label="menu"
            sx={{ mr: 2, height: '50px', width: 50, ...(open && { display: 'none' }), }}
            onClick={handleDrawerOpen}
          >
            <MenuRoundedIcon />
          </IconButton>
          <img src={logo} className="logo_mainpage" alt="logo"/>
          <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1, width: '100%', display: 'grid', placeItems: 'center' }}>
            <StyledBreadcrumb 
              label="Home"
              icon={<HomeRounded fontSize="small" />}
              onClick={navigateHome}
            />
            <StyledBreadcrumb
              label="Events"
              icon={<EmojiEventsIcon fontSize="small"/>}
              onClick={handleMenu}
            />
            <StyledBreadcrumb
              label="Gallery"
              icon={<CollectionsIcon fontSize="small"/>}
              onClick={navigateGallery}
            />
          </Breadcrumbs>
          {user ? (
            <AccountPopover />
          ) : (
            <div className='login_signup'>
              <Button variant="contained" color="success" href="/login" sx={{ minWidth: 80 }}>Login</Button>
              <Button variant="text" sx={{ ml: 1, color: 'green', minWidth: 80 }} color="success" href="/signup">Sign Up</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        keepMounted
          transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        >
          <MenuItem>2022</MenuItem>
          <MenuItem>2021</MenuItem>
          <MenuItem>2020</MenuItem>
          <MenuItem>2019</MenuItem>
          <MenuItem>2018</MenuItem>
      </Menu>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} color="success">
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ display: 'grid', placeItems: 'center' }}>
        <ListItem button onClick={handleOpenSettings} sx={{ width: '90%', borderRadius: 3, '&:hover' : { background: '#ebebeb' } }}>
          <ListItemIcon sx={{ display: 'grid', placeItems: 'center' }}>
            <EmojiEventsIcon />
          </ListItemIcon>
          <ListItemText sx={{ display: 'grid', placeItems: 'center' }}>
            Events
          </ListItemText>
          <ListItemIcon sx={{ display: 'grid', placeItems: 'center' }}>
            {openCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemIcon>
        </ListItem>
        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
          <List component="div" sx={{ display: 'grid', placeItems: 'center', width: 200 }}>
            <ListItem button sx={{ width: '90%', borderRadius: 3, textAlign: 'center', '&:hover' : { background: '#ebebeb' } }}>
              <ListItemText>
                2022
              </ListItemText>
            </ListItem>
            <ListItem button sx={{ width: '90%', borderRadius: 3, textAlign: 'center', '&:hover' : { background: '#ebebeb' } }}>
              <ListItemText>
                2021
              </ListItemText>
            </ListItem>
            <ListItem button sx={{ width: '90%', borderRadius: 3, textAlign: 'center', '&:hover' : { background: '#ebebeb' } }}>
              <ListItemText>
                2020
              </ListItemText>
            </ListItem>
            <ListItem button sx={{ width: '90%', borderRadius: 3, textAlign: 'center', '&:hover' : { background: '#ebebeb' } }}>
              <ListItemText>
                2019
              </ListItemText>
            </ListItem>
            <ListItem button sx={{ width: '90%', borderRadius: 3, textAlign: 'center', '&:hover' : { background: '#ebebeb' } }}>
              <ListItemText>
                2018
              </ListItemText>
            </ListItem>
          </List>
        </Collapse>
          <ListItem button sx={{ width: '90%', borderRadius: 3, '&:hover' : { background: '#ebebeb' } }}>
            <ListItemIcon sx={{ display: 'grid', placeItems: 'center' }}>
              <CloudDownloadIcon />
            </ListItemIcon>
            <ListItemText sx={{ ml: 1.2 }}>
              Certificates
            </ListItemText>
          </ListItem>
          <ListItem button sx={{ width: '90%', borderRadius: 3, '&:hover' : { background: '#ebebeb' } }}>
            <ListItemIcon sx={{ display: 'grid', placeItems: 'center' }}>
              <CollectionsIcon />
            </ListItemIcon>
            <ListItemText sx={{ ml: 1.2 }}>
              Gallery
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </Box>
    </div>
  )
}