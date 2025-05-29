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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  FormGroup,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  BugReport,
  Assignment,
  Timeline,
  Flag,
  Settings as SettingsIcon,
  TextFields as TextIcon,
  Numbers as NumberIcon,
  CalendarToday as DateIcon,
  CheckBox as CheckboxIcon,
  List as ListIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const IssueTypesAdmin = () => {
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [fieldsDialogOpen, setFieldsDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [selectedTypeForFields, setSelectedTypeForFields] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'Assignment',
    color: '#3182CE'
  });

  // Mock Custom Fields Data
  const [customFields] = useState([
    {
      id: 1,
      name: 'Story Points',
      description: 'Estimation points for stories',
      type: 'number',
      required: false,
      icon: <NumberIcon />
    },
    {
      id: 2,
      name: 'Priority Level',
      description: 'Business priority classification',
      type: 'select',
      required: true,
      options: ['Low', 'Medium', 'High', 'Critical'],
      icon: <ListIcon />
    },
    {
      id: 3,
      name: 'Customer Email',
      description: 'Customer contact email',
      type: 'email',
      required: false,
      icon: <TextIcon />
    },
    {
      id: 4,
      name: 'Testing Environment',
      description: 'Environment where testing should be done',
      type: 'multiselect',
      required: false,
      options: ['Development', 'Staging', 'UAT', 'Production'],
      icon: <ListIcon />
    },
    {
      id: 5,
      name: 'Due Date',
      description: 'Expected completion date',
      type: 'date',
      required: false,
      icon: <DateIcon />
    },
    {
      id: 6,
      name: 'Assignee',
      description: 'Person responsible for the issue',
      type: 'user',
      required: false,
      icon: <PersonIcon />
    },
    {
      id: 7,
      name: 'Severity',
      description: 'Impact level of the bug',
      type: 'select',
      required: true,
      options: ['Minor', 'Major', 'Critical', 'Blocker'],
      icon: <ListIcon />
    },
    {
      id: 8,
      name: 'Browser',
      description: 'Browser where bug occurred',
      type: 'multiselect',
      required: false,
      options: ['Chrome', 'Firefox', 'Safari', 'Edge'],
      icon: <ListIcon />
    }
  ]);

  const [issueTypes, setIssueTypes] = useState([
    {
      id: 1,
      name: 'Bug',
      description: 'A problem that impairs or prevents the functions of the product',
      icon: 'BugReport',
      color: '#E53E3E',
      customFields: [2, 3, 7, 8] // Priority Level, Customer Email, Severity, Browser
    },
    {
      id: 2,
      name: 'Task',
      description: 'A piece of work to be done or undertaken',
      icon: 'Assignment',
      color: '#3182CE',
      customFields: [2, 5, 6] // Priority Level, Due Date, Assignee
    },
    {
      id: 3,
      name: 'Story',
      description: 'A user story represents a feature from the perspective of the end user',
      icon: 'Timeline',
      color: '#38A169',
      customFields: [1, 2, 5, 6] // Story Points, Priority Level, Due Date, Assignee
    },
    {
      id: 4,
      name: 'Epic',
      description: 'A large body of work that can be broken down into smaller stories',
      icon: 'Flag',
      color: '#805AD5',
      customFields: [2, 5] // Priority Level, Due Date
    }
  ]);

  const iconOptions = [
    { value: 'BugReport', label: 'Bug Report', component: <BugReport /> },
    { value: 'Assignment', label: 'Assignment', component: <Assignment /> },
    { value: 'Timeline', label: 'Timeline', component: <Timeline /> },
    { value: 'Flag', label: 'Flag', component: <Flag /> }
  ];

  const colorOptions = [
    '#E53E3E', '#3182CE', '#38A169', '#805AD5',
    '#FF8B00', '#0052CC', '#36B37E', '#FF5630'
  ];

  const getIcon = (iconName) => {
    const iconMap = {
      BugReport: <BugReport />,
      Assignment: <Assignment />,
      Timeline: <Timeline />,
      Flag: <Flag />
    };
    return iconMap[iconName] || <Assignment />;
  };

  const handleOpen = (type = null) => {
    if (type) {
      setEditingType(type);
      setFormData({
        name: type.name,
        description: type.description,
        icon: type.icon,
        color: type.color
      });
    } else {
      setEditingType(null);
      setFormData({
        name: '',
        description: '',
        icon: 'Assignment',
        color: '#3182CE'
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingType(null);
  };

  const handleSave = () => {
    if (editingType) {
      setIssueTypes(prev => prev.map(type => 
        type.id === editingType.id 
          ? { ...type, ...formData }
          : type
      ));
    } else {
      setIssueTypes(prev => [...prev, { 
        ...formData, 
        id: Date.now(),
        customFields: []
      }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setIssueTypes(prev => prev.filter(type => type.id !== id));
  };

  const openFieldsDialog = (type) => {
    setSelectedTypeForFields(type);
    setFieldsDialogOpen(true);
  };

  const closeFieldsDialog = () => {
    setFieldsDialogOpen(false);
    setSelectedTypeForFields(null);
  };

  const toggleCustomField = (fieldId) => {
    if (!selectedTypeForFields) return;

    setIssueTypes(prev => prev.map(type => {
      if (type.id === selectedTypeForFields.id) {
        const currentFields = type.customFields || [];
        const hasField = currentFields.includes(fieldId);
        
        return {
          ...type,
          customFields: hasField 
            ? currentFields.filter(id => id !== fieldId)
            : [...currentFields, fieldId]
        };
      }
      return type;
    }));

    // Update selectedTypeForFields for real-time preview
    setSelectedTypeForFields(prev => {
      const currentFields = prev.customFields || [];
      const hasField = currentFields.includes(fieldId);
      
      return {
        ...prev,
        customFields: hasField 
          ? currentFields.filter(id => id !== fieldId)
          : [...currentFields, fieldId]
      };
    });
  };

  const getCustomFieldById = (id) => {
    return customFields.find(field => field.id === id);
  };

  const getFieldTypeColor = (type) => {
    const colors = {
      text: '#3182CE',
      number: '#38A169',
      date: '#805AD5',
      select: '#FF8B00',
      multiselect: '#E53E3E',
      email: '#0052CC',
      user: '#FF5630'
    };
    return colors[type] || '#3182CE';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Issue Types
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Configure issue types and their custom fields
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Issue Type
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 3 }}>
        <Tab label="Issue Types" />
        <Tab label="Field Configuration" />
      </Tabs>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          {issueTypes.map((type) => (
            <Grid item xs={12} sm={6} md={4} key={type.id}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Box sx={{ color: type.color, fontSize: 32 }}>
                      {getIcon(type.icon)}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {type.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {type.description}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box mb={2}>
                    <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                      Custom Fields ({(type.customFields || []).length})
                    </Typography>
                    <Box display="flex" gap={0.5} flexWrap="wrap">
                      {(type.customFields || []).slice(0, 3).map(fieldId => {
                        const field = getCustomFieldById(fieldId);
                        return field ? (
                          <Chip
                            key={fieldId}
                            label={field.name}
                            size="small"
                            sx={{
                              backgroundColor: `${getFieldTypeColor(field.type)}20`,
                              color: getFieldTypeColor(field.type),
                            }}
                          />
                        ) : null;
                      })}
                      {(type.customFields || []).length > 3 && (
                        <Chip
                          label={`+${(type.customFields || []).length - 3} more`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </Box>

                  <Box display="flex" gap={1}>
                    <Button
                      size="small"
                      startIcon={<SettingsIcon />}
                      onClick={() => openFieldsDialog(type)}
                      variant="outlined"
                      fullWidth
                    >
                      Configure Fields
                    </Button>
                    <IconButton
                      size="small"
                      onClick={() => handleOpen(type)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(type.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 1 && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Issue Type</TableCell>
                  <TableCell>Custom Fields</TableCell>
                  <TableCell>Required Fields</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {issueTypes.map((type) => {
                  const typeFields = (type.customFields || []).map(id => getCustomFieldById(id)).filter(Boolean);
                  const requiredFields = typeFields.filter(field => field.required);
                  
                  return (
                    <TableRow key={type.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Box sx={{ color: type.color }}>
                            {getIcon(type.icon)}
                          </Box>
                          <Box>
                            <Typography fontWeight="bold">{type.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {type.description}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={0.5} flexWrap="wrap">
                          {typeFields.map(field => (
                            <Chip
                              key={field.id}
                              label={field.name}
                              size="small"
                              sx={{
                                backgroundColor: `${getFieldTypeColor(field.type)}20`,
                                color: getFieldTypeColor(field.type),
                              }}
                            />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {requiredFields.length} of {typeFields.length} required
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          startIcon={<SettingsIcon />}
                          onClick={() => openFieldsDialog(type)}
                        >
                          Configure
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Add/Edit Issue Type Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingType ? 'Edit Issue Type' : 'Add Issue Type'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Type Name"
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
              rows={3}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Icon</InputLabel>
              <Select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                label="Icon"
              >
                {iconOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box display="flex" alignItems="center" gap={1}>
                      {option.component}
                      {option.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Color
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
            </Box>

            <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Preview
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Box sx={{ color: formData.color }}>
                  {getIcon(formData.icon)}
                </Box>
                <Typography fontWeight="bold">
                  {formData.name || 'Issue Type Name'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingType ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Custom Fields Configuration Dialog */}
      <Dialog 
        open={fieldsDialogOpen} 
        onClose={closeFieldsDialog} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          Configure Custom Fields - {selectedTypeForFields?.name}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ pt: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Available Custom Fields
              </Typography>
              <FormGroup>
                {customFields.map((field) => (
                  <FormControlLabel
                    key={field.id}
                    control={
                      <Checkbox
                        checked={(selectedTypeForFields?.customFields || []).includes(field.id)}
                        onChange={() => toggleCustomField(field.id)}
                      />
                    }
                    label={
                      <Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Box sx={{ color: getFieldTypeColor(field.type) }}>
                            {field.icon}
                          </Box>
                          <Typography fontWeight="bold">{field.name}</Typography>
                          {field.required && (
                            <Chip label="Required" size="small" color="error" />
                          )}
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {field.description} • Type: {field.type}
                        </Typography>
                      </Box>
                    }
                  />
                ))}
              </FormGroup>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Selected Fields Preview
              </Typography>
              <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1, backgroundColor: '#f9f9f9' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Fields for {selectedTypeForFields?.name}
                </Typography>
                {(selectedTypeForFields?.customFields || []).length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No custom fields selected
                  </Typography>
                ) : (
                  <List dense>
                    {(selectedTypeForFields?.customFields || []).map(fieldId => {
                      const field = getCustomFieldById(fieldId);
                      return field ? (
                        <ListItem key={fieldId}>
                          <Box sx={{ color: getFieldTypeColor(field.type), mr: 1 }}>
                            {field.icon}
                          </Box>
                          <ListItemText
                            primary={field.name}
                            secondary={field.type}
                          />
                          {field.required && (
                            <Chip label="Required" size="small" color="error" />
                          )}
                        </ListItem>
                      ) : null;
                    })}
                  </List>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFieldsDialog}>Close</Button>
          <Button onClick={closeFieldsDialog} variant="contained">
            Save Configuration
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IssueTypesAdmin;
