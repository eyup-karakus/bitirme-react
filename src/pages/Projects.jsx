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
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  People as PeopleIcon,
  BugReport as IssueIcon,
} from '@mui/icons-material';
import { useProject } from '../context/ProjectContext';

const Projects = () => {
  const { projects, setProjects } = useProject();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'planning',
    priority: 'medium',
  });

  const statusColors = {
    planning: '#FFA500',
    active: '#36B37E',
    completed: '#0052CC',
    on_hold: '#FF5630',
  };

  const priorityColors = {
    low: '#36B37E',
    medium: '#FFA500',
    high: '#FF5630',
    critical: '#DE350B',
  };

  const handleOpenDialog = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData(project);
    } else {
      setEditingProject(null);
      setFormData({
        name: '',
        description: '',
        status: 'planning',
        priority: 'medium',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProject(null);
    setFormData({
      name: '',
      description: '',
      status: 'planning',
      priority: 'medium',
    });
  };

  const handleSaveProject = () => {
    if (editingProject) {
      // Update existing project
      setProjects(projects.map(p => 
        p.id === editingProject.id 
          ? { ...formData, id: editingProject.id }
          : p
      ));
    } else {
      // Add new project
      const newProject = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        issues: Math.floor(Math.random() * 20) + 1,
        completedIssues: Math.floor(Math.random() * 10),
        teamMembers: Math.floor(Math.random() * 8) + 2,
      };
      setProjects([...projects, newProject]);
    }
    handleCloseDialog();
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId));
    handleCloseMenu();
  };

  const handleMenuClick = (event, project) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedProject(null);
  };

  const getProgressPercentage = (project) => {
    if (!project.issues) return 0;
    return Math.round((project.completedIssues / project.issues) * 100);
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="#172B4D">
          Projects
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
          New Project
        </Button>
      </Box>

      {/* Projects Grid */}
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                {/* Project Header */}
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" fontWeight="bold" color="#172B4D">
                    {project.name}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, project)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                {/* Status and Priority */}
                <Box display="flex" gap={1} mb={2}>
                  <Chip
                    label={project.status.replace('_', ' ').toUpperCase()}
                    size="small"
                    sx={{
                      backgroundColor: statusColors[project.status],
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                  <Chip
                    label={project.priority.toUpperCase()}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: priorityColors[project.priority],
                      color: priorityColors[project.priority],
                    }}
                  />
                </Box>

                {/* Description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mb={2}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {project.description}
                </Typography>

                {/* Progress */}
                <Box mb={2}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      Progress
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {getProgressPercentage(project)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={getProgressPercentage(project)}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: '#E4E6EA',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#36B37E',
                      },
                    }}
                  />
                </Box>

                {/* Stats */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <IssueIcon sx={{ fontSize: 16, color: '#6B778C' }} />
                    <Typography variant="body2" color="text.secondary">
                      {project.completedIssues || 0}/{project.issues || 0} issues
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <PeopleIcon sx={{ fontSize: 16, color: '#6B778C' }} />
                    <Typography variant="body2" color="text.secondary">
                      {project.teamMembers || 0} members
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => { /* View project logic */ handleCloseMenu(); }}>
          <ViewIcon sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={() => { handleOpenDialog(selectedProject); handleCloseMenu(); }}>
          <EditIcon sx={{ mr: 1 }} />
          Edit Project
        </MenuItem>
        <MenuItem 
          onClick={() => handleDeleteProject(selectedProject?.id)}
          sx={{ color: '#FF5630' }}
        >
          <DeleteIcon sx={{ mr: 1 }} />
          Delete Project
        </MenuItem>
      </Menu>

      {/* Add/Edit Project Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProject ? 'Edit Project' : 'Create New Project'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Project Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="planning">Planning</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="on_hold">On Hold</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Priority</InputLabel>
              <Select
                value={formData.priority}
                label="Priority"
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveProject} 
            variant="contained"
            disabled={!formData.name.trim()}
          >
            {editingProject ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects;
