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
  Tabs,
  Tab,
  Alert,
  FormGroup,
  Checkbox,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TextFields as TextIcon,
  Numbers as NumberIcon,
  CalendarToday as DateIcon,
  CheckBox as CheckboxIcon,
  RadioButtonChecked as RadioIcon,
  List as ListIcon,
  Person as PersonIcon,
  Link as UrlIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  AttachFile as FileIcon,
  Visibility as ViewIcon,
  VisibilityOff as HideIcon,
} from '@mui/icons-material';

const CustomFieldsAdmin = () => {
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'text',
    required: false,
    searchable: true,
    options: [],
    defaultValue: '',
    issueTypes: [],
    projects: []
  });

  // Field Types
  const fieldTypes = [
    { value: 'text', label: 'Text Field', icon: <TextIcon />, description: 'Single line text input' },
    { value: 'textarea', label: 'Text Area', icon: <TextIcon />, description: 'Multi-line text input' },
    { value: 'number', label: 'Number', icon: <NumberIcon />, description: 'Numeric input' },
    { value: 'date', label: 'Date', icon: <DateIcon />, description: 'Date picker' },
    { value: 'datetime', label: 'Date Time', icon: <DateIcon />, description: 'Date and time picker' },
    { value: 'checkbox', label: 'Checkbox', icon: <CheckboxIcon />, description: 'Single checkbox' },
    { value: 'select', label: 'Select List', icon: <ListIcon />, description: 'Dropdown selection' },
    { value: 'multiselect', label: 'Multi Select', icon: <ListIcon />, description: 'Multiple selection' },
    { value: 'radio', label: 'Radio Buttons', icon: <RadioIcon />, description: 'Single choice from options' },
    { value: 'user', label: 'User Picker', icon: <PersonIcon />, description: 'Select user from system' },
    { value: 'url', label: 'URL', icon: <UrlIcon />, description: 'Web link input' },
    { value: 'email', label: 'Email', icon: <EmailIcon />, description: 'Email address input' },
    { value: 'phone', label: 'Phone', icon: <PhoneIcon />, description: 'Phone number input' },
    { value: 'file', label: 'File Upload', icon: <FileIcon />, description: 'File attachment' },
  ];

  // Mock data
  const [customFields, setCustomFields] = useState([
    {
      id: 1,
      name: 'Story Points',
      description: 'Estimation points for stories',
      type: 'number',
      required: false,
      searchable: true,
      defaultValue: '',
      issueTypes: [2, 3], // Task, Story
      projects: [1, 2],
      options: [],
      created: '2024-01-15',
      usage: 45
    },
    {
      id: 2,
      name: 'Priority Level',
      description: 'Business priority classification',
      type: 'select',
      required: true,
      searchable: true,
      defaultValue: 'Medium',
      issueTypes: [1, 2, 3], // Bug, Task, Story
      projects: [1],
      options: ['Low', 'Medium', 'High', 'Critical'],
      created: '2024-01-10',
      usage: 78
    },
    {
      id: 3,
      name: 'Customer Email',
      description: 'Customer contact email',
      type: 'email',
      required: false,
      searchable: true,
      defaultValue: '',
      issueTypes: [1], // Bug
      projects: [1, 2],
      options: [],
      created: '2024-01-20',
      usage: 23
    },
    {
      id: 4,
      name: 'Testing Environment',
      description: 'Environment where testing should be done',
      type: 'multiselect',
      required: false,
      searchable: true,
      defaultValue: '',
      issueTypes: [1, 2], // Bug, Task
      projects: [1],
      options: ['Development', 'Staging', 'UAT', 'Production'],
      created: '2024-01-25',
      usage: 34
    },
    {
      id: 5,
      name: 'Due Date',
      description: 'Expected completion date',
      type: 'date',
      required: false,
      searchable: true,
      defaultValue: '',
      issueTypes: [2, 3, 4], // Task, Story, Epic
      projects: [1, 2],
      options: [],
      created: '2024-01-12',
      usage: 56
    }
  ]);

  const issueTypes = [
    { id: 1, name: 'Bug', color: '#E53E3E' },
    { id: 2, name: 'Task', color: '#3182CE' },
    { id: 3, name: 'Story', color: '#38A169' },
    { id: 4, name: 'Epic', color: '#805AD5' },
  ];

  const projects = [
    { id: 1, name: 'E-Commerce Platform' },
    { id: 2, name: 'Mobile App' },
    { id: 3, name: 'Admin Dashboard' },
  ];

  const getFieldTypeInfo = (type) => {
    return fieldTypes.find(ft => ft.value === type) || fieldTypes[0];
  };

  const handleOpen = (field = null) => {
    if (field) {
      setEditingField(field);
      setFormData({
        ...field,
        options: field.options || []
      });
    } else {
      setEditingField(null);
      setFormData({
        name: '',
        description: '',
        type: 'text',
        required: false,
        searchable: true,
        options: [],
        defaultValue: '',
        issueTypes: [],
        projects: []
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingField(null);
  };

  const handleSave = () => {
    if (editingField) {
      setCustomFields(prev => prev.map(field => 
        field.id === editingField.id 
          ? { ...formData, id: editingField.id, created: editingField.created, usage: editingField.usage }
          : field
      ));
    } else {
      setCustomFields(prev => [...prev, { 
        ...formData, 
        id: Date.now(),
        created: new Date().toISOString().split('T')[0],
        usage: 0
      }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setCustomFields(prev => prev.filter(field => field.id !== id));
  };

  const addOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, '']
    });
  };

  const updateOption = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const removeOption = (index) => {
    setFormData({
      ...formData,
      options: formData.options.filter((_, i) => i !== index)
    });
  };

  const needsOptions = ['select', 'multiselect', 'radio'].includes(formData.type);

  const FieldPreview = ({ field }) => {
    const typeInfo = getFieldTypeInfo(field.type);
    
    return (
      <Box sx={{ p: 2, border: '1px solid #E0E0E0', borderRadius: 1, backgroundColor: '#F9F9F9' }}>
        <Typography variant="subtitle2" gutterBottom>
          Field Preview
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Box sx={{ color: 'primary.main' }}>
            {typeInfo.icon}
          </Box>
          <Typography variant="body2" fontWeight="bold">
            {field.name || 'Field Name'}
            {field.required && <span style={{ color: 'red' }}> *</span>}
          </Typography>
        </Box>
        
        {field.description && (
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            {field.description}
          </Typography>
        )}

        {/* Preview based on field type */}
        {field.type === 'text' && (
          <TextField size="small" placeholder="Enter text..." disabled />
        )}
        {field.type === 'textarea' && (
          <TextField size="small" multiline rows={2} placeholder="Enter text..." disabled />
        )}
        {field.type === 'number' && (
          <TextField size="small" type="number" placeholder="0" disabled />
        )}
        {field.type === 'select' && field.options.length > 0 && (
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select disabled value="">
              {field.options.map((option, index) => (
                <MenuItem key={index} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {field.type === 'checkbox' && (
          <FormControlLabel control={<Checkbox disabled />} label="Checkbox option" />
        )}
        {field.type === 'date' && (
          <TextField size="small" type="date" disabled />
        )}
      </Box>
    );
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Custom Fields
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Create and manage custom fields for your issues
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Custom Field
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 3 }}>
        <Tab label="All Fields" />
        <Tab label="Field Types" />
        <Tab label="Usage Statistics" />
      </Tabs>

      {tabValue === 0 && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Field Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Required</TableCell>
                  <TableCell>Issue Types</TableCell>
                  <TableCell>Projects</TableCell>
                  <TableCell>Usage</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customFields.map((field) => {
                  const typeInfo = getFieldTypeInfo(field.type);
                  return (
                    <TableRow key={field.id}>
                      <TableCell>
                        <Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Box sx={{ color: 'primary.main' }}>
                              {typeInfo.icon}
                            </Box>
                            <Typography fontWeight="bold">{field.name}</Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {field.description}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={typeInfo.label} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        {field.required ? (
                          <Chip label="Required" size="small" color="error" />
                        ) : (
                          <Chip label="Optional" size="small" color="default" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={0.5} flexWrap="wrap">
                          {field.issueTypes.map(typeId => {
                            const issueType = issueTypes.find(t => t.id === typeId);
                            return issueType ? (
                              <Chip
                                key={typeId}
                                label={issueType.name}
                                size="small"
                                sx={{
                                  backgroundColor: `${issueType.color}20`,
                                  color: issueType.color,
                                }}
                              />
                            ) : null;
                          })}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {field.projects.length} project(s)
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {field.usage} issues
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleOpen(field)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(field.id)}
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

      {tabValue === 1 && (
        <Grid container spacing={3}>
          {fieldTypes.map((type) => (
            <Grid item xs={12} sm={6} md={4} key={type.value}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Box sx={{ color: 'primary.main' }}>
                      {type.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold">
                      {type.label}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {type.description}
                  </Typography>
                  <Chip
                    label={`${customFields.filter(f => f.type === type.value).length} fields`}
                    size="small"
                    color="primary"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Most Used Fields
                </Typography>
                <List>
                  {customFields
                    .sort((a, b) => b.usage - a.usage)
                    .slice(0, 5)
                    .map((field) => (
                      <ListItem key={field.id}>
                        <ListItemText
                          primary={field.name}
                          secondary={`Used in ${field.usage} issues`}
                        />
                        <ListItemSecondaryAction>
                          <Chip label={field.usage} size="small" color="primary" />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Field Type Distribution
                </Typography>
                {fieldTypes.map((type) => {
                  const count = customFields.filter(f => f.type === type.value).length;
                  if (count === 0) return null;
                  
                  return (
                    <Box key={type.value} display="flex" alignItems="center" gap={2} mb={1}>
                      <Box sx={{ color: 'primary.main' }}>
                        {type.icon}
                      </Box>
                      <Typography variant="body2" sx={{ flexGrow: 1 }}>
                        {type.label}
                      </Typography>
                      <Chip label={count} size="small" />
                    </Box>
                  );
                })}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingField ? 'Edit Custom Field' : 'Add Custom Field'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ pt: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Field Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                margin="normal"
                required
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
                <InputLabel>Field Type</InputLabel>
                <Select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  label="Field Type"
                >
                  {fieldTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box display="flex" alignItems="center" gap={1}>
                        {type.icon}
                        <Box>
                          <Typography>{type.label}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {type.description}
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormGroup sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.required}
                      onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
                    />
                  }
                  label="Required Field"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.searchable}
                      onChange={(e) => setFormData({ ...formData, searchable: e.target.checked })}
                    />
                  }
                  label="Searchable"
                />
              </FormGroup>

              {!needsOptions && (
                <TextField
                  fullWidth
                  label="Default Value"
                  value={formData.defaultValue}
                  onChange={(e) => setFormData({ ...formData, defaultValue: e.target.value })}
                  margin="normal"
                />
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <FieldPreview field={formData} />
              
              {needsOptions && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Options
                  </Typography>
                  {formData.options.map((option, index) => (
                    <Box key={index} display="flex" gap={1} mb={1}>
                      <TextField
                        size="small"
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        sx={{ flexGrow: 1 }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => removeOption(index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    size="small"
                    onClick={addOption}
                    startIcon={<AddIcon />}
                  >
                    Add Option
                  </Button>
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                Apply to Issue Types
              </Typography>
              <FormGroup row>
                {issueTypes.map((type) => (
                  <FormControlLabel
                    key={type.id}
                    control={
                      <Checkbox
                        checked={formData.issueTypes.includes(type.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              issueTypes: [...formData.issueTypes, type.id]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              issueTypes: formData.issueTypes.filter(id => id !== type.id)
                            });
                          }
                        }}
                      />
                    }
                    label={type.name}
                  />
                ))}
              </FormGroup>

              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Apply to Projects
              </Typography>
              <FormGroup row>
                {projects.map((project) => (
                  <FormControlLabel
                    key={project.id}
                    control={
                      <Checkbox
                        checked={formData.projects.includes(project.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              projects: [...formData.projects, project.id]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              projects: formData.projects.filter(id => id !== project.id)
                            });
                          }
                        }}
                      />
                    }
                    label={project.name}
                  />
                ))}
              </FormGroup>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingField ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomFieldsAdmin;
