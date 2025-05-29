import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Button,
  ListItemIcon as MenuListItemIcon,
  Divider,
  ListItemButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  GridView as DashboardIcon,
  Folder as ProjectsIcon,
  BugReport as IssuesIcon,
  PlayCircle as SprintsIcon,
  AccountCircle,
  Logout,
  Settings as SettingsIcon,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 240;

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 20 }} />, path: '/' },
    { text: 'Issues', icon: <IssuesIcon sx={{ fontSize: 20 }} />, path: '/issues' },
    { text: 'Sprints', icon: <SprintsIcon sx={{ fontSize: 20 }} />, path: '/sprints' },
  ];

  // Recent Projects Data
  const recentProjects = [
    {
      name: 'TST2024000 Test',
      code: 'TST2024000',
      type: 'Software project',
      color: '#0052CC'
    },
    {
      name: 'Mobile App',
      code: 'MOB2024',
      type: 'Software project',
      color: '#36B37E'
    },
    {
      name: 'Web Platform',
      code: 'WEB2024',
      type: 'Software project',
      color: '#FF5630'
    }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleCloseProfileMenu();
  };

  const drawer = (
    <div>
      {/* Main Navigation - Üstten başlasın */}
      <List sx={{ px: 1, pt: 2 }}>
        {/* Dashboard */}
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            selected={location.pathname === '/'}
            onClick={() => navigate('/')}
            sx={{
              borderRadius: 1,
              minHeight: 36,
              px: 2,
              py: 1,
              '&.Mui-selected': {
                backgroundColor: '#E3F2FD',
                '& .MuiListItemIcon-root': {
                  color: '#0052CC',
                },
                '& .MuiListItemText-primary': {
                  color: '#0052CC',
                  fontWeight: 500,
                },
              },
              '&:hover': {
                backgroundColor: '#F4F5F7',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <DashboardIcon sx={{ fontSize: 20 }} />
            </ListItemIcon>
            <ListItemText 
              primary="Dashboard" 
              primaryTypographyProps={{
                fontSize: '14px',
                fontWeight: 400,
              }}
            />
          </ListItemButton>
        </ListItem>

        {/* Projects - Ana başlık */}
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            selected={location.pathname === '/projects'}
            onClick={() => navigate('/projects')}
            sx={{
              borderRadius: 1,
              minHeight: 36,
              px: 2,
              py: 1,
              '&.Mui-selected': {
                backgroundColor: '#E3F2FD',
                '& .MuiListItemIcon-root': {
                  color: '#0052CC',
                },
                '& .MuiListItemText-primary': {
                  color: '#0052CC',
                  fontWeight: 500,
                },
              },
              '&:hover': {
                backgroundColor: '#F4F5F7',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ProjectsIcon sx={{ fontSize: 20 }} />
            </ListItemIcon>
            <ListItemText 
              primary="Projects" 
              primaryTypographyProps={{
                fontSize: '14px',
                fontWeight: 400,
              }}
            />
          </ListItemButton>
        </ListItem>

        {/* Recent Projects - Alt başlık */}
        <Box sx={{ ml: 2 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              px: 2, 
              py: 0.5,  // py: 1 yerine py: 0.5
              display: 'block',
              color: '#6B778C',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            Recent
          </Typography>
          
          <List sx={{ py: 0 }}>
            {recentProjects.map((project, index) => (
              <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => navigate(`/projects/${project.code}`)}
                  sx={{
                    borderRadius: 1,
                    minHeight: 32,
                    px: 2,
                    py: 0.5,
                    '&:hover': {
                      backgroundColor: '#F4F5F7',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Avatar
                      sx={{
                        width: 18,
                        height: 18,
                        backgroundColor: project.color,
                        fontSize: '9px',
                        fontWeight: 600,
                      }}
                    >
                      {project.code.substring(0, 2)}
                    </Avatar>
                  </ListItemIcon>
                  <Box sx={{ overflow: 'hidden' }}>
                    <Typography
                      sx={{
                        fontSize: '12px',
                        fontWeight: 400,
                        color: '#172B4D',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.2,
                      }}
                    >
                      {project.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '10px',
                        color: '#6B778C',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: 1,
                      }}
                    >
                      {project.type}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Issues */}
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            selected={location.pathname === '/issues'}
            onClick={() => navigate('/issues')}
            sx={{
              borderRadius: 1,
              minHeight: 36,
              px: 2,
              py: 1,
              '&.Mui-selected': {
                backgroundColor: '#E3F2FD',
                '& .MuiListItemIcon-root': {
                  color: '#0052CC',
                },
                '& .MuiListItemText-primary': {
                  color: '#0052CC',
                  fontWeight: 500,
                },
              },
              '&:hover': {
                backgroundColor: '#F4F5F7',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <IssuesIcon sx={{ fontSize: 20 }} />
            </ListItemIcon>
            <ListItemText 
              primary="Issues" 
              primaryTypographyProps={{
                fontSize: '14px',
                fontWeight: 400,
              }}
            />
          </ListItemButton>
        </ListItem>

        {/* Sprints */}
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            selected={location.pathname === '/sprints'}
            onClick={() => navigate('/sprints')}
            sx={{
              borderRadius: 1,
              minHeight: 36,
              px: 2,
              py: 1,
              '&.Mui-selected': {
                backgroundColor: '#E3F2FD',
                '& .MuiListItemIcon-root': {
                  color: '#0052CC',
                },
                '& .MuiListItemText-primary': {
                  color: '#0052CC',
                  fontWeight: 500,
                },
              },
              '&:hover': {
                backgroundColor: '#F4F5F7',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <SprintsIcon sx={{ fontSize: 20 }} />
            </ListItemIcon>
            <ListItemText 
              primary="Sprints" 
              primaryTypographyProps={{
                fontSize: '14px',
                fontWeight: 400,
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ mx: 2, my: 2 }} />

      {/* Settings */}
      <List sx={{ px: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderRadius: 1,
              minHeight: 36,
              px: 2,
              py: 1,
              '&:hover': {
                backgroundColor: '#F4F5F7',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <SettingsIcon sx={{ fontSize: 20 }} />
            </ListItemIcon>
            <ListItemText 
              primary="Settings" 
              primaryTypographyProps={{
                fontSize: '14px',
                fontWeight: 400,
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* NAVBAR */}
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          backgroundColor: 'white',
          color: '#172B4D',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{ minHeight: '48px !important', px: 2 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              fontSize: '16px',
              color: '#0052CC',
              mr: 4
            }}
          >
            ProjectFlow
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
            <Button
              sx={{
                color: '#172B4D',
                fontSize: '13px',
                fontWeight: 500,
                textTransform: 'none',
                px: 2,
                py: 0.5,
                minHeight: '32px',
                '&:hover': {
                  backgroundColor: '#F4F5F7',
                }
              }}
              endIcon={<KeyboardArrowDown sx={{ fontSize: '16px' }} />}
              onClick={() => navigate('/projects')}
            >
              Projects
            </Button>

            <Button
              sx={{
                color: '#172B4D',
                fontSize: '13px',
                fontWeight: 500,
                textTransform: 'none',
                px: 2,
                py: 0.5,
                minHeight: '32px',
                '&:hover': {
                  backgroundColor: '#F4F5F7',
                }
              }}
              endIcon={<KeyboardArrowDown sx={{ fontSize: '16px' }} />}
              onClick={() => navigate('/issues')}
            >
              Issues
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#dc3545',
                color: 'white',
                fontSize: '13px',
                fontWeight: 500,
                textTransform: 'none',
                px: 2,
                py: 0.5,
                minHeight: '32px',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#c82333',
                  boxShadow: 'none',
                }
              }}
              onClick={() => navigate('/create')}
            >
              Create
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              size="small"
              sx={{
                color: '#6B778C',
                '&:hover': {
                  backgroundColor: '#F4F5F7',
                }
              }}
            >
              <SettingsIcon sx={{ fontSize: '18px' }} />
            </IconButton>

            <IconButton
              size="small"
              onClick={handleProfileMenu}
              sx={{
                p: 0.5,
                '&:hover': {
                  backgroundColor: '#F4F5F7',
                }
              }}
            >
              <Avatar 
                sx={{ 
                  width: 28, 
                  height: 28, 
                  backgroundColor: '#0052CC',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseProfileMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: {
                  mt: 1,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  border: '1px solid #DFE1E6',
                  borderRadius: '4px',
                  minWidth: '180px',
                }
              }}
            >
              <MenuItem 
                onClick={handleCloseProfileMenu}
                sx={{ 
                  fontSize: '13px',
                  py: 1,
                  '&:hover': {
                    backgroundColor: '#F4F5F7',
                  }
                }}
              >
                <MenuListItemIcon>
                  <AccountCircle sx={{ fontSize: '18px' }} />
                </MenuListItemIcon>
                Profile
              </MenuItem>
              <MenuItem 
                onClick={handleCloseProfileMenu}
                sx={{ 
                  fontSize: '13px',
                  py: 1,
                  '&:hover': {
                    backgroundColor: '#F4F5F7',
                  }
                }}
              >
                <MenuListItemIcon>
                  <SettingsIcon sx={{ fontSize: '18px' }} />
                </MenuListItemIcon>
                Settings
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem 
                onClick={handleLogout}
                sx={{ 
                  fontSize: '13px',
                  py: 1,
                  '&:hover': {
                    backgroundColor: '#F4F5F7',
                  }
                }}
              >
                <MenuListItemIcon>
                  <Logout sx={{ fontSize: '18px' }} />
                </MenuListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth, 
              mt: '48px',
              borderRight: '1px solid #DFE1E6',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth, 
              mt: '48px',
              borderRight: '1px solid #DFE1E6',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: '#F4F5F7',
          minHeight: '100vh',
          ml: { sm: 0 },
        }}
      >
        <Toolbar sx={{ minHeight: '48px !important' }} />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
