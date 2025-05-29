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
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Badge,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  BugReport as BugIcon,
  Assignment as TaskIcon,
  NewReleases as StoryIcon,
  KeyboardArrowUp as HighIcon,
  KeyboardArrowDown as LowIcon,
  Remove as MediumIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useProject } from '../context/ProjectContext';

const Issues = () => {
  const { projects } = useProject();
  const [issues, setIssues] = useState([
    {
      id: '1',
      title: 'Fix login authentication bug',
      description: 'Users are unable to login with correct credentials',
      type: 'bug',
      status: 'todo',
      priority: 'high',
      projectId: 1,
      assignee: 'John Doe',
      reporter: 'Jane Smith',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-22',
    },
    {
      id: '2',
      title: 'Implement user dashboard',
      description: 'Create a comprehensive dashboard for users to track their activities',
      type: 'story',
      status: 'in_progress',
      priority: 'medium',
      projectId: 1,
      assignee: 'Alice Johnson',
      reporter: 'Bob Wilson',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-18',
    },
    {
      id: '3',
      title: 'Setup CI/CD pipeline',
      description: 'Configure automated deployment pipeline for the project',
      type: 'task',
      status: 'done',
      priority: 'high',
      projectId: 2,
      assignee: 'Charlie Brown',
      reporter: 'David Lee',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-21',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingIssue, setEditingIssue] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'task',
    status: 'todo',
    priority: 'medium',
    projectId: '',
    assignee: '',
  });

  const issueTypes = {
    bug: { icon: <BugIcon />, color: '#FF5630', label: 'Bug' },
    task: { icon: <TaskIcon />, color: '#0052CC', label: 'Task' },
    story: { icon: <StoryIcon />, color: '#36B37E', label: 'Story' },
  };

  const statusConfig = {
    todo: { 
      title: 'TO DO', 
      color: '#DFE1E6',
      bgColor: '#FAFBFC',
      borderColor: '#DFE1E6'
    },
    in_progress: { 
      title: 'IN PROGRESS', 
      color: '#0052CC',
      bgColor: '#E6F3FF',
      borderColor: '#0052CC'
    },
    done: { 
      title: 'DONE', 
      color: '#36B37E',
      bgColor: '#E6FCFF',
      borderColor: '#36B37E'
    },
  };

  const priorityIcons = {
    low: <LowIcon sx={{ color: '#36B37E' }} />,
    medium: <MediumIcon sx={{ color: '#FFA500' }} />,
    high: <HighIcon sx={{ color: '#FF5630' }} />,
    critical: <HighIcon sx={{ color: '#DE350B' }} />,
  };

  // Drag and Drop Handler
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedIssues = issues.map(issue => {
      if (issue.id === draggableId) {
        return {
          ...issue,
          status: destination.droppableId,
          updatedAt: new Date().toISOString()
        };
      }
      return issue;
    });

    setIssues(updatedIssues);
  };

  const handleOpenDialog = (issue = null) => {
    if (issue) {
      setEditingIssue(issue);
      setFormData(issue);
    } else {
      setEditingIssue(null);
      setFormData({
        title: '',
        description: '',
        type: 'task',
        status: 'todo',
        priority: 'medium',
        projectId: projects[0]?.id || '',
        assignee: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingIssue(null);
  };

  const handleSaveIssue = () => {
    if (editingIssue) {
      setIssues(issues.map(i => 
        i.id === editingIssue.id 
          ? { ...formData, id: editingIssue.id, updatedAt: new Date().toISOString() }
          : i
      ));
    } else {
      const newIssue = {
        ...formData,
        id: Date.now().toString(),
        reporter: 'Current User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setIssues([...issues, newIssue]);
    }
    handleCloseDialog();
  };

  const handleDeleteIssue = (issueId) => {
    setIssues(issues.filter(i => i.id !== issueId));
    handleCloseMenu();
  };

  const handleMenuClick = (event, issue) => {
    setAnchorEl(event.currentTarget);
    setSelectedIssue(issue);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedIssue(null);
  };

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown Project';
  };

  const filterIssuesByStatus = (status) => {
    return issues.filter(issue => issue.status === status);
  };

  // Issue Card Component
  const IssueCard = ({ issue, index }) => (
    <Draggable draggableId={issue.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            mb: 2,
            cursor: 'grab',
            transform: snapshot.isDragging ? 'rotate(5deg)' : 'none',
            boxShadow: snapshot.isDragging ? 4 : 1,
            '&:hover': {
              boxShadow: 2,
            },
            '&:active': {
              cursor: 'grabbing',
            },
          }}
        >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
              <Typography variant="body2" color="text.secondary" fontSize="11px">
                #{issue.id}
              </Typography>
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuClick(e, issue);
                }}
                sx={{ p: 0.5 }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
            
            <Typography 
              variant="body2" 
              mb={2} 
              sx={{ 
                fontWeight: 500,
                lineHeight: 1.4,
                fontSize: '14px',
                color: '#172B4D'
              }}
            >
              {issue.title}
            </Typography>
            
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" gap={0.5}>
                <Box sx={{ color: issueTypes[issue.type].color, display: 'flex' }}>
                  {React.cloneElement(issueTypes[issue.type].icon, { fontSize: 'small' })}
                </Box>
                <Tooltip title={`Priority: ${issue.priority}`}>
                  <Box sx={{ display: 'flex' }}>
                    {React.cloneElement(priorityIcons[issue.priority], { fontSize: 'small' })}
                  </Box>
                </Tooltip>
              </Box>
              <Avatar sx={{ width: 24, height: 24, fontSize: 11, bgcolor: '#0052CC' }}>
                {issue.assignee?.charAt(0) || 'U'}
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );

  // Kanban Board View
  const KanbanBoard = () => {
    const columns = [
      { id: 'todo', ...statusConfig.todo, issues: filterIssuesByStatus('todo') },
      { id: 'in_progress', ...statusConfig.in_progress, issues: filterIssuesByStatus('in_progress') },
      { id: 'done', ...statusConfig.done, issues: filterIssuesByStatus('done') },
    ];

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ 
          display: 'flex', 
          gap: 3, 
          minHeight: '70vh',
          overflow: 'auto',
          pb: 2
        }}>
          {columns.map((column) => (
            <Box 
              key={column.id} 
              sx={{ 
                minWidth: '300px',
                width: '300px',
                backgroundColor: column.bgColor,
                borderRadius: 1,
                p: 2,
              }}
            >
              {/* Column Header */}
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography 
                  variant="subtitle2" 
                  fontWeight="bold" 
                  sx={{ 
                    color: '#5E6C84',
                    fontSize: '12px',
                    letterSpacing: '0.5px'
                  }}
                >
                  {column.title}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      bgcolor: '#DFE1E6',
                      borderRadius: '10px',
                      px: 1,
                      py: 0.2,
                      fontSize: '11px',
                      fontWeight: 'bold',
                      color: '#5E6C84'
                    }}
                  >
                    {column.issues.length}
                  </Typography>
                  {column.id === 'todo' && (
                    <IconButton 
                      size="small" 
                      onClick={() => handleOpenDialog()}
                      sx={{ p: 0.5 }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>

              {/* Droppable Area */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      minHeight: 200,
                      backgroundColor: snapshot.isDraggingOver ? '#F4F5F7' : 'transparent',
                      borderRadius: 1,
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    {/* Create Work Item Card (only for TODO) */}
                    {column.id === 'todo' && column.issues.length === 0 && (
                      <Card 
                        sx={{ 
                          mb: 2, 
                          cursor: 'pointer',
                          border: '2px dashed #DFE1E6',
                          backgroundColor: 'transparent',
                          '&:hover': {
                            borderColor: '#0052CC',
                            backgroundColor: '#F4F5F7'
                          }
                        }}
                        onClick={() => handleOpenDialog()}
                      >
                        <CardContent sx={{ 
                          textAlign: 'center', 
                          py: 3,
                          '&:last-child': { pb: 3 }
                        }}>
                          <Box sx={{ mb: 2, opacity: 0.6 }}>
                            <img 
                              src="/api/placeholder/80/60" 
                              alt="Create item"
                              style={{ width: 80, height: 60, objectFit: 'contain' }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" mb={1}>
                            Create a work item to get started.
                          </Typography>
                          <Button 
                            variant="text" 
                            size="small"
                            sx={{ 
                              textTransform: 'none',
                              color: '#0052CC',
                              fontWeight: 500
                            }}
                          >
                            Create work item
                          </Button>
                        </CardContent>
                      </Card>
                    )}

                    {/* Issues */}
                    {column.issues.map((issue, index) => (
                      <IssueCard key={issue.id} issue={issue} index={index} />
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>

              {/* See older items link (only for DONE) */}
              {column.id === 'done' && (
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Button 
                    variant="text" 
                    size="small"
                    startIcon={<SearchIcon />}
                    sx={{ 
                      textTransform: 'none',
                      color: '#5E6C84',
                      fontSize: '12px'
                    }}
                  >
                    See older work items
                  </Button>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </DragDropContext>
    );
  };

  // List View (önceki kodunuz aynı kalacak)
  const ListView = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#F4F5F7' }}>
            <TableCell>Issue</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Assignee</TableCell>
            <TableCell>Updated</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id} hover>
              <TableCell>
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    #{issue.id} {issue.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {issue.description.substring(0, 50)}...
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  {issueTypes[issue.type].icon}
                  <Typography variant="body2">
                    {issueTypes[issue.type].label}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={issue.status.replace('_', ' ').toUpperCase()}
                  size="small"
                  sx={{
                    backgroundColor: statusConfig[issue.status]?.color || '#DFE1E6',
                    color: '#172B4D',
                  }}
                />
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  {priorityIcons[issue.priority]}
                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                    {issue.priority}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {getProjectName(issue.projectId)}
                </Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                    {issue.assignee?.charAt(0) || 'U'}
                  </Avatar>
                  <Typography variant="body2">
                    {issue.assignee || 'Unassigned'}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {new Date(issue.updatedAt).toLocaleDateString()}
                </Typography>
              </TableCell>
              <TableCell>
                <IconButton size="small" onClick={(e) => handleMenuClick(e, issue)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="#172B4D">
          Issues
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            sx={{ borderColor: '#DFE1E6' }}
          >
            Filter
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              backgroundColor: '#0052CC',
              '&:hover': { backgroundColor: '#0065FF' },
            }}
          >
            Create Issue
          </Button>
        </Box>
      </Box>

      {/* View Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
          <Tab label="Kanban Board" />
          <Tab label="List View" />
        </Tabs>
      </Box>

      {/* Content */}
      {currentTab === 0 ? <KanbanBoard /> : <ListView />}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => { handleOpenDialog(selectedIssue); handleCloseMenu(); }}>
          <EditIcon sx={{ mr: 1 }} />
          Edit Issue
        </MenuItem>
        <MenuItem 
          onClick={() => handleDeleteIssue(selectedIssue?.id)}
          sx={{ color: '#FF5630' }}
        >
          <DeleteIcon sx={{ mr: 1 }} />
          Delete Issue
        </MenuItem>
      </Menu>

      {/* Add/Edit Issue Dialog - önceki kodunuz aynı kalacak */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingIssue ? 'Edit Issue' : 'Create New Issue'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Issue Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
            />
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Issue Type</InputLabel>
                  <Select
                    value={formData.type}
                    label="Issue Type"
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <MenuItem value="bug">🐛 Bug</MenuItem>
                    <MenuItem value="task">📋 Task</MenuItem>
                    <MenuItem value="story">📖 Story</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    label="Status"
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <MenuItem value="todo">To Do</MenuItem>
                    <MenuItem value="in_progress">In Progress</MenuItem>
                    <MenuItem value="done">Done</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
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
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Assignee"
                  value={formData.assignee}
                  onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveIssue} 
            variant="contained"
            disabled={!formData.title.trim()}
          >
            {editingIssue ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Issues;