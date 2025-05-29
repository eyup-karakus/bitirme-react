import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  LinearProgress,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as StartIcon,
  Stop as EndIcon,
  ExpandMore as ExpandMoreIcon,
  BugReport as BugIcon,
  Assignment as TaskIcon,
  NewReleases as StoryIcon,
  CalendarToday as CalendarIcon,
  Timeline as TimelineIcon,
  Assessment as ReportIcon,
} from '@mui/icons-material';
import { useProject } from '../context/ProjectContext';

const Sprints = () => {
  const { projects } = useProject();
  const [sprints, setSprints] = useState([
    {
      id: 1,
      name: 'Sprint 1 - Authentication Module',
      description: 'Focus on user authentication and security features',
      status: 'active',
      projectId: 1,
      startDate: '2024-01-15',
      endDate: '2024-01-29',
      goal: 'Complete user login, registration, and password reset functionality',
      issues: [
        { id: 1, title: 'Fix login authentication bug', type: 'bug', status: 'done', points: 5 },
        { id: 2, title: 'Implement password reset', type: 'story', status: 'in_progress', points: 8 },
        { id: 3, title: 'Add two-factor authentication', type: 'story', status: 'todo', points: 13 },
        { id: 4, title: 'Setup session management', type: 'task', status: 'done', points: 3 },
      ],
    },
    {
      id: 2,
      name: 'Sprint 2 - Dashboard Development',
      description: 'Create user dashboard and analytics',
      status: 'planned',
      projectId: 1,
      startDate: '2024-01-30',
      endDate: '2024-02-13',
      goal: 'Build comprehensive dashboard with real-time data',
      issues: [
        { id: 5, title: 'Design dashboard layout', type: 'story', status: 'todo', points: 8 },
        { id: 6, title: 'Implement charts and graphs', type: 'task', status: 'todo', points: 13 },
        { id: 7, title: 'Add data filtering', type: 'story', status: 'todo', points: 5 },
      ],
    },
    {
      id: 3,
      name: 'Sprint 3 - Mobile Optimization',
      description: 'Optimize application for mobile devices',
      status: 'completed',
      projectId: 2,
      startDate: '2024-01-01',
      endDate: '2024-01-15',
      goal: 'Ensure responsive design across all devices',
      issues: [
        { id: 8, title: 'Responsive navigation', type: 'task', status: 'done', points: 5 },
        { id: 9, title: 'Mobile touch gestures', type: 'story', status: 'done', points: 8 },
        { id: 10, title: 'Performance optimization', type: 'task', status: 'done', points: 13 },
      ],
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingSprint, setEditingSprint] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    goal: '',
    projectId: '',
    startDate: '',
    endDate: '',
    status: 'planned',
  });

  const statusColors = {
    planned: '#DFE1E6',
    active: '#36B37E',
    completed: '#0052CC',
  };

  const issueTypes = {
    bug: { icon: <BugIcon />, color: '#FF5630' },
    task: { icon: <TaskIcon />, color: '#0052CC' },
    story: { icon: <StoryIcon />, color: '#36B37E' },
  };

  const handleOpenDialog = (sprint = null) => {
    if (sprint) {
      setEditingSprint(sprint);
      setFormData({
        name: sprint.name,
        description: sprint.description,
        goal: sprint.goal,
        projectId: sprint.projectId,
        startDate: sprint.startDate,
        endDate: sprint.endDate,
        status: sprint.status,
      });
    } else {
      setEditingSprint(null);
      setFormData({
        name: '',
        description: '',
        goal: '',
        projectId: projects[0]?.id || '',
        startDate: '',
        endDate: '',
        status: 'planned',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSprint(null);
  };

  const handleSaveSprint = () => {
    if (editingSprint) {
      setSprints(sprints.map(s => 
        s.id === editingSprint.id 
          ? { ...editingSprint, ...formData }
          : s
      ));
    } else {
      const newSprint = {
        ...formData,
        id: Date.now(),
        issues: [],
      };
      setSprints([...sprints, newSprint]);
    }
    handleCloseDialog();
  };

  const handleDeleteSprint = (sprintId) => {
    setSprints(sprints.filter(s => s.id !== sprintId));
    handleCloseMenu();
  };

  const handleMenuClick = (event, sprint) => {
    setAnchorEl(event.currentTarget);
    setSelectedSprint(sprint);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedSprint(null);
  };

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown Project';
  };

  const getSprintProgress = (sprint) => {
    if (!sprint.issues || sprint.issues.length === 0) return 0;
    const completedIssues = sprint.issues.filter(issue => issue.status === 'done').length;
    return Math.round((completedIssues / sprint.issues.length) * 100);
  };

  const getTotalStoryPoints = (sprint) => {
    if (!sprint.issues) return 0;
    return sprint.issues.reduce((total, issue) => total + (issue.points || 0), 0);
  };

  const getCompletedStoryPoints = (sprint) => {
    if (!sprint.issues) return 0;
    return sprint.issues
      .filter(issue => issue.status === 'done')
      .reduce((total, issue) => total + (issue.points || 0), 0);
  };

  const getDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Sprint Board View
  const SprintBoard = () => (
    <Grid container spacing={3}>
      {sprints.map((sprint) => (
        <Grid item xs={12} key={sprint.id}>
          <Accordion defaultExpanded={sprint.status === 'active'}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h6" fontWeight="bold">
                    {sprint.name}
                  </Typography>
                  <Chip
                    label={sprint.status.toUpperCase()}
                    size="small"
                    sx={{
                      backgroundColor: statusColors[sprint.status],
                      color: sprint.status === 'planned' ? '#172B4D' : 'white',
                      fontWeight: 'bold',
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {getProjectName(sprint.projectId)}
                  </Typography>
                </Box>
                <IconButton onClick={(e) => { e.stopPropagation(); handleMenuClick(e, sprint); }}>
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                {/* Sprint Info */}
                <Grid item xs={12} md={8}>
                  <Paper sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                      Sprint Goal
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {sprint.goal}
                    </Typography>
                    
                    <Box display="flex" gap={4} mb={2}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                      {sprint.status === 'active' && (
                        <Typography variant="body2" color="primary" fontWeight="bold">
                          {getDaysRemaining(sprint.endDate)} days remaining
                        </Typography>
                      )}
                    </Box>

                    <Box mb={2}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="body2">
                          Progress ({sprint.issues?.filter(i => i.status === 'done').length || 0}/{sprint.issues?.length || 0} issues)
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {getSprintProgress(sprint)}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={getSprintProgress(sprint)}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: '#E4E6EA',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: sprint.status === 'completed' ? '#36B37E' : '#0052CC',
                          },
                        }}
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      Story Points: {getCompletedStoryPoints(sprint)}/{getTotalStoryPoints(sprint)}
                    </Typography>
                  </Paper>

                  {/* Issues List */}
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                      Issues ({sprint.issues?.length || 0})
                    </Typography>
                    <List dense>
                      {sprint.issues?.map((issue) => (
                        <React.Fragment key={issue.id}>
                          <ListItem>
                            <ListItemIcon>
                              {issueTypes[issue.type].icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Box display="flex" alignItems="center" gap={1}>
                                  <Typography variant="body2" fontWeight="bold">
                                    #{issue.id}
                                  </Typography>
                                  <Typography variant="body2">
                                    {issue.title}
                                  </Typography>
                                </Box>
                              }
                              secondary={
                                <Box display="flex" alignItems="center" gap={2} mt={0.5}>
                                  <Chip
                                    label={issue.status.replace('_', ' ').toUpperCase()}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.7rem', height: 20 }}
                                  />
                                  <Typography variant="caption">
                                    {issue.points} points
                                  </Typography>
                                </Box>
                              }
                            />
                          </ListItem>
                          <Divider />
                        </React.Fragment>
                      ))}
                    </List>
                  </Paper>
                </Grid>

                {/* Sprint Stats */}
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                      Sprint Statistics
                    </Typography>
                    
                    <Box mb={2}>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        Completion Rate
                      </Typography>
                      <Typography variant="h4" fontWeight="bold" color="primary">
                        {getSprintProgress(sprint)}%
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box mb={2}>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        Total Issues
                      </Typography>
                      <Typography variant="h5" fontWeight="bold">
                        {sprint.issues?.length || 0}
                      </Typography>
                    </Box>

                    <Box mb={2}>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        Story Points
                      </Typography>
                      <Typography variant="h5" fontWeight="bold">
                        {getCompletedStoryPoints(sprint)}/{getTotalStoryPoints(sprint)}
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        Issue Breakdown
                      </Typography>
                      {['todo', 'in_progress', 'done'].map((status) => {
                        const count = sprint.issues?.filter(i => i.status === status).length || 0;
                        return (
                          <Box key={status} display="flex" justifyContent="space-between" mb={0.5}>
                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                              {status.replace('_', ' ')}
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {count}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </Grid>
  );

  // Sprint Planning View
  const SprintPlanning = () => (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Sprint Planning
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        Plan your next sprint by selecting issues from the backlog and setting sprint goals.
      </Typography>
      <Button variant="outlined" startIcon={<AddIcon />}>
        Start Sprint Planning
      </Button>
    </Paper>
  );

  // Sprint Reports View
  const SprintReports = () => (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Sprint Reports
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>Burndown Chart</Typography>
              <Typography variant="body2" color="text.secondary">
                Track sprint progress over time
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>Velocity Chart</Typography>
              <Typography variant="body2" color="text.secondary">
                Monitor team velocity across sprints
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="#172B4D">
          Sprints
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            backgroundColor: '#0052CC',
            '&:hover': { backgroundColor: '#0065FF' },
          }}
        >
          Create Sprint
        </Button>
      </Box>

      {/* View Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
          <Tab icon={<TimelineIcon />} label="Active Sprints" />
          <Tab icon={<CalendarIcon />} label="Sprint Planning" />
          <Tab icon={<ReportIcon />} label="Reports" />
        </Tabs>
      </Box>

      {/* Content */}
      {currentTab === 0 && <SprintBoard />}
      {currentTab === 1 && <SprintPlanning />}
      {currentTab === 2 && <SprintReports />}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => { handleOpenDialog(selectedSprint); handleCloseMenu(); }}>
          <EditIcon sx={{ mr: 1 }} />
          Edit Sprint
        </MenuItem>
        {selectedSprint?.status === 'planned' && (
          <MenuItem onClick={handleCloseMenu}>
            <StartIcon sx={{ mr: 1 }} />
            Start Sprint
          </MenuItem>
        )}
        {selectedSprint?.status === 'active' && (
          <MenuItem onClick={handleCloseMenu}>
            <EndIcon sx={{ mr: 1 }} />
            Complete Sprint
          </MenuItem>
        )}
        <MenuItem 
          onClick={() => handleDeleteSprint(selectedSprint?.id)}
          sx={{ color: '#FF5630' }}
        >
          <DeleteIcon sx={{ mr: 1 }} />
          Delete Sprint
        </MenuItem>
      </Menu>

      {/* Add/Edit Sprint Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingSprint ? 'Edit Sprint' : 'Create New Sprint'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Sprint Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Sprint Goal"
              multiline
              rows={2}
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              margin="normal"
            />
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Project</InputLabel>
                  <Select
                    value={formData.projectId}
                    label="Project"
                    onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                  >
                    {projects.map((project) => (
                      <MenuItem key={project.id} value={project.id}>
                        {project.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveSprint} 
            variant="contained"
            disabled={!formData.name.trim()}
          >
            {editingSprint ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sprints;
