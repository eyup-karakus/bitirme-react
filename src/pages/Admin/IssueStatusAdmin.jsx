import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';

const IssueStatusAdmin = () => {
  const [statuses, setStatuses] = useState([
    { id: 1, name: 'To Do', color: '#DDD', category: 'todo', order: 1, description: 'Work has not started' },
    { id: 2, name: 'In Progress', color: '#0052CC', category: 'inprogress', order: 2, description: 'Work is actively being done' },
    { id: 3, name: 'Code Review', color: '#FF8B00', category: 'inprogress', order: 3, description: 'Code is being reviewed' },
    { id: 4, name: 'Testing', color: '#FF5630', category: 'inprogress', order: 4, description: 'Work is being tested' },
    { id: 5, name: 'Done', color: '#36B37E', category: 'done', order: 5, description: 'Work has been completed' },
    { id: 6, name: 'Cancelled', color: '#6B778C', category: 'done', order: 6, description: 'Work has been cancelled' },
  ]);

  const [open, setOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    color: '#0052CC',
    category: 'todo',
    description: ''
  });

  const categoryOptions = [
    { value: 'todo', label: 'To Do', description: 'Work has not been started' },
    { value: 'inprogress', label: 'In Progress', description: 'Work is actively being done' },
    { value: 'done', label: 'Done', description: 'Work has been completed' },
  ];

  const colorOptions = [
    '#DDD', '#0052CC', '#36B37E', '#FF5630', '#FF8B00', 
    '#6B778C', '#8777D9', '#FF991F', '#00875A', '#DE350B'
  ];

  const handleOpen = (status = null) => {
    if (status) {
      setEditingStatus(status);
      setFormData(status);
    } else {
      setEditingStatus(null);
      setFormData({
        name: '',
        color: '#0052CC',
        category: 'todo',
        description: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingStatus(null);
  };

  const handleSave = () => {
    if (editingStatus) {
      setStatuses(prev => prev.map(status => 
        status.id === editingStatus.id ? { ...formData, id: editingStatus.id, order: editingStatus.order } : status
      ));
    } else {
      const maxOrder = Math.max(...statuses.map(s => s.order), 0);
      setStatuses(prev => [...prev, { 
        ...formData, 
        id: Date.now(),
        order: maxOrder + 1
      }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setStatuses(prev => prev.filter(status => status.id !== id));
  };

  const getCategoryColor = (category) => {
    const colors = {
      todo: '#DDD',
      inprogress: '#0052CC',
      done: '#36B37E'
    };
    return colors[category] || '#DDD';
  };

  const getCategoryIcon = (category) => {
    return <CircleIcon sx={{ fontSize: 16 }} />;
  };

  const getStatusesByCategory = (category) => {
    return statuses.filter(status => status.category === category).sort((a, b) => a.order - b.order);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Issue Status
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage status workflow for your issues
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Status
        </Button>
      </Box>

      {/* Status Categories */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {categoryOptions.map((category) => (
          <Grid item xs={12} md={4} key={category.value}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Box sx={{ color: getCategoryColor(category.value) }}>
                    {getCategoryIcon(category.value)}
                  </Box>
                  <Typography variant="h6" fontWeight="bold">
                    {category.label}
                  </Typography>
                  <Chip 
                    label={getStatusesByCategory(category.value).length} 
                    size="small" 
                    color="primary"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {category.description}
                </Typography>
                
                {/* Status List for Category */}
                <Box>
                  {getStatusesByCategory(category.value).map((status) => (
                    <Box
                      key={status.id}
                      display="flex"
                      alignItems="center"
                      gap={1}
                      py={0.5}
                    >
                      <DragIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Chip
                        label={status.name}
                        size="small"
                        sx={{
                          backgroundColor: status.color,
                          color: status.color === '#DDD' ? '#000' : '#fff',
                          flexGrow: 1,
                        }}
                      />
                      <IconButton size="small" onClick={() => handleOpen(status)}>
                        <EditIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Status Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {statuses.sort((a, b) => a.order - b.order).map((status) => (
                <TableRow key={status.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <DragIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      {status.order}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={status.name}
                      sx={{
                        backgroundColor: status.color,
                        color: status.color === '#DDD' ? '#000' : '#fff',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={categoryOptions.find(c => c.value === status.category)?.label}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{status.description}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        backgroundColor: status.color,
                        borderRadius: '50%',
                        border: '1px solid #ccc',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpen(status)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(status.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingStatus ? 'Edit Status' : 'Add Status'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Status Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
              multiline
              rows={2}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                label="Category"
              >
                {categoryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box sx={{ color: getCategoryColor(option.value) }}>
                        {getCategoryIcon(option.value)}
                      </Box>
                      <Box>
                        <Typography>{option.label}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {option.description}
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Status Color
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {colorOptions.map((color) => (
                  <Box
                    key={color}
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: color,
                      borderRadius: '50%',
                      cursor: 'pointer',
                      border: formData.color === color ? '3px solid #000' : '2px solid #fff',
                      boxShadow: '0 0 0 1px #ccc',
                    }}
                    onClick={() => setFormData({ ...formData, color })}
                  />
                ))}
              </Box>
              <Box display="flex" alignItems="center" gap={2} mt={2}>
                <Typography variant="body2">Preview:</Typography>
                <Chip
                  label={formData.name || 'Status Name'}
                  sx={{
                    backgroundColor: formData.color,
                    color: formData.color === '#DDD' ? '#000' : '#fff',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingStatus ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IssueStatusAdmin;
