import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Category as CategoryIcon,
  Timeline as TimelineIcon,
  AccountTree as WorkflowIcon,
  TextFields as CustomFieldsIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  ExitToApp as LogoutIcon,
  Security as SecurityIcon,
  Storage as BackupIcon,
  Email as EmailIcon,
  Palette as ThemeIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      category: 'Overview',
      items: [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin', badge: null },
      ]
    },
    {
      category: 'Issue Management',
      items: [
        { text: 'Issue Types', icon: <CategoryIcon />, path: '/admin/issue-types', badge: null },
        { text: 'Issue Status', icon: <TimelineIcon />, path: '/admin/issue-status', badge: null },
        { text: 'Workflows', icon: <WorkflowIcon />, path: '/admin/workflows', badge: 'New' },
        { text: 'Custom Fields', icon: <CustomFieldsIcon />, path: '/admin/custom-fields', badge: null },
      ]
    },
    {
      category: 'User Management',
      items: [
        { text: 'Users', icon: <PeopleIcon />, path: '/admin/users', badge: null },
        { text: 'Permissions', icon: <SecurityIcon />, path: '/admin/permissions', badge: 'Soon' },
      ]
    },
    {
      category: 'System',
      items: [
        { text: 'Email Settings', icon: <EmailIcon />, path: '/admin/email-settings', badge: null },
        { text: 'Theme Settings', icon: <ThemeIcon />, path: '/admin/theme-settings', badge: null },
        { text: 'Backup & Restore', icon: <BackupIcon />, path: '/admin/backup', badge: null },
        { text: 'System Settings', icon: <SettingsIcon />, path: '/admin/system-settings', badge: null },
      ]
    }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Logout logic here
    navigate('/login');
  };

  const isActivePath = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
        <Typography variant="h6" fontWeight="bold">
          🔧 Admin Panel
        </Typography>
        <Typography variant="caption">
          System Administration
        </Typography>
      </Box>
      
      <Box sx={{ overflow: 'auto', height: 'calc(100vh - 80px)' }}>
        {menuItems.map((category, categoryIndex) => (
          <Box key={categoryIndex}>
            <Box sx={{ px: 2, py: 1, backgroundColor: '#f5f5f5' }}>
              <Typography variant="caption" fontWeight="bold" color="text.secondary">
                {category.category}
              </Typography>
            </Box>
            <List dense>
              {category.items.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    selected={isActivePath(item.path)}
                    onClick={() => navigate(item.path)}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                        '& .MuiListItemIcon-root': {
                          color: 'white',
                        }
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: isActivePath(item.path) ? 'bold' : 'normal'
                      }}
                    />
                    {item.badge && (
                      <Chip 
                        label={item.badge} 
                        size="small" 
                        color={item.badge === 'New' ? 'success' : 'warning'}
                        sx={{ height: 20, fontSize: '0.7rem' }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            {categoryIndex < menuItems.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'white',
          color: 'text.primary',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {menuItems.flatMap(cat => cat.items).find(item => isActivePath(item.path))?.text || 'Admin Panel'}
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            <IconButton
              color="inherit"
              onClick={handleMenuClick}
            >
              <Avatar sx={{ width: 32, height: 32, backgroundColor: 'primary.main' }}>
                A
              </Avatar>
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AccountIcon />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          backgroundColor: '#f5f5f5',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
