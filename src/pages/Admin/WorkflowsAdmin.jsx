import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowForward as ArrowIcon,
  AccountTree as WorkflowIcon,
  BugReport,
  Assignment,
  Timeline,
  Flag,
} from '@mui/icons-material';

const WorkflowsAdmin = () => {
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fromStatus: '',
    toStatus: '',
    issueType: ''
  });

  // Mock data
  const issueTypes = [
    { id: 1, name: 'Bug', icon: 'BugReport', color: '#E53E3E' },
    { id: 2, name: 'Task', icon: 'Assignment', color: '#3182CE' },
    { id: 3, name: 'Story', icon: 'Timeline', color: '#38A169' },
    { id: 4, name: 'Epic', icon: 'Flag', color: '#805AD5' },
  ];

  const statuses = [
    { id: 1, name: 'To Do', color: '#DDD', category: 'todo' },
    { id: 2, name: 'In Progress', color: '#0052CC', category: 'inprogress' },
    { id: 3, name: 'Code Review', color: '#FF8B00', category: 'inprogress' },
    { id: 4, name: 'Testing', color: '#FF5630', category: 'inprogress' },
    { id: 5, name: 'Done', color: '#36B37E', category: 'done' },
    { id: 6, name: 'Cancelled', color: '#6B778C', category: 'done' },
  ];

  const [workflows, setWorkflows] = useState([
    { id: 1, fromStatus: 1, toStatus: 2, issueType: 1 }, // To Do -> In Progress (Bug)
    { id: 2, fromStatus: 2, toStatus: 3, issueType: 1 }, // In Progress -> Code Review (Bug)
    { id: 3, fromStatus: 3, toStatus: 4, issueType: 1 }, // Code Review -> Testing (Bug)
    { id: 4, fromStatus: 4, toStatus: 5, issueType: 1 }, // Testing -> Done (Bug)
    { id: 5, fromStatus: 1, toStatus: 2, issueType: 2 }, // To Do -> In Progress (Task)
    { id: 6, fromStatus: 2, toStatus: 5, issueType: 2 }, // In Progress -> Done (Task)
    { id: 7, fromStatus: 1, toStatus: 6, issueType: 2 }, // To Do -> Cancelled (Task)
  ]);

  const getStatusById = (id) => statuses.find(s => s.id === id);
  const getIssueTypeById = (id) => issueTypes.find(t => t.id === id);

  const getIcon = (iconName) => {
    const icons = {
      BugReport: <BugReport />,
      Assignment: <Assignment />,
      Timeline: <Timeline />,
      Flag: <Flag />,
    };
    return icons[iconName] || <Assignment />;
  };

  const getWorkflowsByIssueType = (issueTypeId) => {
    return workflows.filter(w => w.issueType === issueTypeId);
  };

  const handleSave = () => {
    setWorkflows(prev => [...prev, {
      id: Date.now(),
      fromStatus: parseInt(formData.fromStatus),
      toStatus: parseInt(formData.toStatus),
      issueType: parseInt(formData.issueType)
    }]);
    setOpen(false);
    setFormData({ fromStatus: '', toStatus: '', issueType: '' });
  };

  const handleDelete = (id) => {
    setWorkflows(prev => prev.filter(w => w.id !== id));
  };

  const WorkflowVisualization = ({ issueType }) => {
    const typeWorkflows = getWorkflowsByIssueType(issueType.id);
    const usedStatuses = new Set();
    
    typeWorkflows.forEach(w => {
      usedStatuses.add(w.fromStatus);
      usedStatuses.add(w.toStatus);
    });

    const statusList = Array.from(usedStatuses).map(id => getStatusById(id)).filter(Boolean);

    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Box sx={{ color: issueType.color }}>
              {getIcon(issueType.icon)}
            </Box>
            <Typography variant="h6" fontWeight="bold">
              {issueType.name} Workflow
            </Typography>
            <Chip label={`${typeWorkflows.length} transitions`} size="small" />
          </Box>

          {/* Visual Workflow */}
          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap" mb={3}>
            {statusList.map((status, index) => (
              <React.Fragment key={status.id}>
                <Chip
                  label={status.name}
                  sx={{
                    backgroundColor: status.color,
                    color: status.color === '#DDD' ? '#000' : '#fff',
                    fontWeight: 'bold',
                  }}
                />
                {index < statusList.length - 1 && (
                  <ArrowIcon color="action" />
                )}
              </React.Fragment>
            ))}
          </Box>

          {/* Transitions Table */}
          <Typography variant="subtitle2" gutterBottom fontWeight="bold">
            Available Transitions
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>From Status</TableCell>
                <TableCell>To Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {typeWorkflows.map((workflow) => {
                const fromStatus = getStatusById(workflow.fromStatus);
                const toStatus = getStatusById(workflow.toStatus);
                return (
                  <TableRow key={workflow.id}>
                    <TableCell>
                      <Chip
                        label={fromStatus?.name}
                        size="small"
                        sx={{
                          backgroundColor: fromStatus?.color,
                          color: fromStatus?.color === '#DDD' ? '#000' : '#fff',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={toStatus?.name}
                        size="small"
                        sx={{
                          backgroundColor: toStatus?.color,
                          color: toStatus?.color === '#DDD' ? '#000' : '#fff',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(workflow.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Workflows
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Configure status transitions for different issue types
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Transition
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 3 }}>
        <Tab label="Visual Workflows" />
        <Tab label="All Transitions" />
      </Tabs>

      {tabValue === 0 && (
        <Box>
          {issueTypes.map((issueType) => (
            <WorkflowVisualization key={issueType.id} issueType={issueType} />
          ))}
        </Box>
      )}

      {tabValue === 1 && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Issue Type</TableCell>
                  <TableCell>From Status</TableCell>
                  <TableCell>To Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workflows.map((workflow) => {
                  const issueType = getIssueTypeById(workflow.issueType);
                  const fromStatus = getStatusById(workflow.fromStatus);
                  const toStatus = getStatusById(workflow.toStatus);
                  
                  return (
                    <TableRow key={workflow.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Box sx={{ color: issueType?.color }}>
                            {getIcon(issueType?.icon)}
                          </Box>
                          {issueType?.name}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={fromStatus?.name}
                          sx={{
                            backgroundColor: fromStatus?.color,
                            color: fromStatus?.color === '#DDD' ? '#000' : '#fff',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={toStatus?.name}
                          sx={{
                            backgroundColor: toStatus?.color,
                            color: toStatus?.color === '#DDD' ? '#000' : '#fff',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(workflow.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Add Transition Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Workflow Transition</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Issue Type</InputLabel>
              <Select
                value={formData.issueType}
                onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                label="Issue Type"
              >
                {issueTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box sx={{ color: type.color }}>
                        {getIcon(type.icon)}
                      </Box>
                      {type.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>From Status</InputLabel>
              <Select
                value={formData.fromStatus}
                onChange={(e) => setFormData({ ...formData, fromStatus: e.target.value })}
                label="From Status"
              >
                {statuses.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    <Chip
                      label={status.name}
                      size="small"
                      sx={{
                        backgroundColor: status.color,
                        color: status.color === '#DDD' ? '#000' : '#fff',
                      }}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>To Status</InputLabel>
              <Select
                value={formData.toStatus}
                onChange={(e) => setFormData({ ...formData, toStatus: e.target.value })}
                label="To Status"
              >
                {statuses.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    <Chip
                      label={status.name}
                      size="small"
                      sx={{
                        backgroundColor: status.color,
                        color: status.color === '#DDD' ? '#000' : '#fff',
                      }}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Add Transition
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkflowsAdmin;
