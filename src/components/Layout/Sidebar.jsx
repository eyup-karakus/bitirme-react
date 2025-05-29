import React from 'react';
import {
  Drawer,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Avatar,
} from '@mui/material';
import {
  GridView as DashboardIcon,
  Folder as ProjectsIcon,
  BugReport as IssuesIcon,
  PlayCircle as SprintsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 20 }} />, path: '/' },
    { text: 'Projects', icon: <ProjectsIcon sx={{ fontSize: 20 }} />, path: '/projects' },
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

  const drawer = (
    <div>
      {/* Empty Toolbar for spacing */}
      <Toolbar sx={{ minHeight: '48px !important' }} />
      
      {/* Main Navigation */}
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
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
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  fontSize: '14px',
                  fontWeight: 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ mx: 2, my: 1 }} />

      {/* Recent Projects Section */}
      <Box sx={{ px: 1 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            px: 2, 
            py: 1, 
            display: 'block',
            color: '#6B778C',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          Recent Projects
        </Typography>
        
        <List sx={{ py: 0 }}>
          {recentProjects.map((project, index) => (
            <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(`/projects/${project.code}`)}
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
                  <Avatar
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: project.color,
                      fontSize: '10px',
                      fontWeight: 600,
                    }}
                  >
                    {project.code.substring(0, 2)}
                  </Avatar>
                </ListItemIcon>
                <Box sx={{ overflow: 'hidden' }}>
                  <Typography
                    sx={{
                      fontSize: '13px',
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
                      fontSize: '11px',
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

      <Divider sx={{ mx: 2, my: 1 }} />

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
            height: 'calc(100vh - 48px)',
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
            height: 'calc(100vh - 48px)',
            borderRight: '1px solid #DFE1E6',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
