import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
} from '@mui/material';
import {
  Category as TypesIcon,
  Timeline as StatusIcon,
  AccountTree as WorkflowIcon,
  People as UsersIcon,
  FolderOpen as ProjectsIcon,
  ViewColumn as FieldsIcon,
} from '@mui/icons-material';

const AdminDashboard = () => {
  const stats = [
    { title: 'Issue Types', count: 5, icon: <TypesIcon />, color: '#4CAF50' },
    { title: 'Issue Status', count: 6, icon: <StatusIcon />, color: '#2196F3' },
    { title: 'Workflows', count: 3, icon: <WorkflowIcon />, color: '#FF9800' },
    { title: 'Users', count: 25, icon: <UsersIcon />, color: '#9C27B0' },
    { title: 'Projects', count: 8, icon: <ProjectsIcon />, color: '#F44336' },
    { title: 'Custom Fields', count: 12, icon: <FieldsIcon />, color: '#607D8B' },
  ];

  const recentActivities = [
    { action: 'New issue type "Epic" created', time: '2 hours ago', type: 'create' },
    { action: 'Workflow updated for Bug issues', time: '4 hours ago', type: 'update' },
    { action: 'User "john.doe@example.com" added', time: '1 day ago', type: 'create' },
    { action: 'Custom field "Story Points" modified', time: '2 days ago', type: 'update' },
  ];

  const quickActions = [
    { title: 'Create Issue Type', description: 'Add new issue type', path: '/admin/issue-types' },
    { title: 'Manage Workflows', description: 'Configure issue workflows', path: '/admin/workflows' },
    { title: 'Add User', description: 'Create new user account', path: '/admin/users' },
    { title: 'Custom Fields', description: 'Manage custom fields', path: '/admin/custom-fields' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Manage your Jira instance configuration
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      backgroundColor: `${stat.color}20`,
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.count}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: '#F5F5F5' }
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {action.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {action.description}
                      </Typography>
                      <Button size="small" sx={{ mt: 1 }}>
                        Go
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <ListItem key={index} divider={index < recentActivities.length - 1}>
                  <ListItemText
                    primary={activity.action}
                    secondary={activity.time}
                  />
                  <Chip
                    label={activity.type}
                    size="small"
                    color={activity.type === 'create' ? 'success' : 'info'}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
