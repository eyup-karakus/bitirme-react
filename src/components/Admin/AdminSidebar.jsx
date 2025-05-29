import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Collapse,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Category as TypesIcon,
  AccountTree as WorkflowIcon,
  People as UsersIcon,
  Security as RolesIcon,
  ViewColumn as FieldsIcon,
  FolderOpen as ProjectsIcon,
  ExpandLess,
  ExpandMore,
  Timeline as StatusIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

const AdminSidebar = ({ open, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = React.useState(['configuration']);

  const handleExpand = (item) => {
    setExpandedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const menuItems = [
    {
      id: 'dashboard',
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/admin',
      type: 'single'
    },
    {
      id: 'configuration',
      text: 'Configuration',
      icon: <SettingsIcon />,
      type: 'expandable',
      children: [
        {
          text: 'Issue Types',
          icon: <TypesIcon />,
          path: '/admin/issue-types'
        },
        {
          text: 'Issue Status',
          icon: <StatusIcon />,
          path: '/admin/issue-status'
        },
        {
          text: 'Workflows',
          icon: <WorkflowIcon />,
          path: '/admin/workflows'
        },
        {
          text: 'Custom Fields',
          icon: <FieldsIcon />,
          path: '/admin/custom-fields'
        }
      ]
    },
    {
      id: 'user-management',
      text: 'User Management',
      icon: <UsersIcon />,
      type: 'expandable',
      children: [
        {
          text: 'Users',
          icon: <UsersIcon />,
          path: '/admin/users'
        },
        {
          text: 'Roles',
          icon: <RolesIcon />,
          path: '/admin/roles'
        }
      ]
    },
    {
      id: 'projects',
      text: 'Project Settings',
      icon: <ProjectsIcon />,
      path: '/admin/projects',
      type: 'single'
    }
  ];

  const renderMenuItem = (item) => {
    if (item.type === 'single') {
      return (
        <ListItem key={item.id} disablePadding>
          <ListItemButton
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#E3F2FD',
                borderRight: '3px solid #1976D2',
                '& .MuiListItemIcon-root': { color: '#1976D2' },
                '& .MuiListItemText-primary': { 
                  color: '#1976D2', 
                  fontWeight: 'bold' 
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      );
    }

    if (item.type === 'expandable') {
      const isExpanded = expandedItems.includes(item.id);
      
      return (
        <React.Fragment key={item.id}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleExpand(item.id)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => (
                <ListItem key={child.path} disablePadding>
                  <ListItemButton
                    selected={location.pathname === child.path}
                    onClick={() => navigate(child.path)}
                    sx={{
                      pl: 4,
                      '&.Mui-selected': {
                        backgroundColor: '#E3F2FD',
                        borderRight: '3px solid #1976D2',
                        '& .MuiListItemIcon-root': { color: '#1976D2' },
                        '& .MuiListItemText-primary': { 
                          color: '#1976D2', 
                          fontWeight: 'bold' 
                        },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {child.icon}
                    </ListItemIcon>
                    <ListItemText primary={child.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      );
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 60,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E0E0E0',
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid #E0E0E0' }}>
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 36,
              height: 36,
              background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="white">
              A
            </Typography>
          </Box>
          {open && (
            <Box>
              <Typography variant="h6" fontWeight="bold" color="#1976D2">
                Admin Panel
              </Typography>
              <Typography variant="caption" color="text.secondary">
                System Configuration
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <List sx={{ pt: 1 }}>
        {menuItems.map(renderMenuItem)}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
