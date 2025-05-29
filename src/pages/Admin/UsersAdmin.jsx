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
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  AdminPanelSettings as AdminIcon,
  Person as UserIcon,
  Block as BlockIcon,
  CheckCircle as ActiveIcon,
} from '@mui/icons-material';

const UsersAdmin = () => {
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    role: 'user',
    active: true
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      phone: '+1 234 567 8901',
      department: 'Engineering',
      role: 'admin',
      active: true,
      lastLogin: '2024-01-28',
      issuesAssigned: 12,
      issuesCreated: 8
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      phone: '+1 234 567 8902',
      department: 'Product',
      role: 'user',
      active: true,
      lastLogin: '2024-01-27',
      issuesAssigned: 15,
      issuesCreated: 23
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      phone: '+1 234 567 8903',
      department: 'QA',
      role: 'user',
      active: false,
      lastLogin: '2024-01-20',
      issuesAssigned: 8,
      issuesCreated: 5
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      phone: '+1 234 567 8904',
      department: 'Design',
      role: 'user',
      active: true,
      lastLogin: '2024-01-28',
      issuesAssigned: 6,
      issuesCreated: 11
    }
  ]);

  const roles = [
    { value: 'admin', label: 'Administrator', color: '#E53E3E', icon: <AdminIcon /> },
    { value: 'user', label: 'User', color: '#3182CE', icon: <UserIcon /> },
  ];

  const departments = [
    'Engineering',
    'Product',
    'Design',
    'QA',
    'Marketing',
    'Sales',
    'Support'
  ];

  const handleOpen = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData(user);
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        role: 'user',
        active: true
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const handleSave = () => {
    if (editingUser) {
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id 
          ? { ...formData, id: editingUser.id, lastLogin: editingUser.lastLogin, issuesAssigned: editingUser.issuesAssigned, issuesCreated: editingUser.issuesCreated }
          : user
      ));
    } else {
      setUsers(prev => [...prev, { 
        ...formData, 
        id: Date.now(),
        lastLogin: new Date().toISOString().split('T')[0],
        issuesAssigned: 0,
        issuesCreated: 0
      }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const toggleUserStatus = (id) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, active: !user.active } : user
    ));
  };

  const getRoleInfo = (role) => {
    return roles.find(r => r.value === role) || roles[1];
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const activeUsers = users.filter(u => u.active).length;
  const adminUsers = users.filter(u => u.role === 'admin').length;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Users
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage user accounts and permissions
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add User
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ backgroundColor: '#3182CE' }}>
                  <UserIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {users.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Users
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ backgroundColor: '#38A169' }}>
                  <ActiveIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {activeUsers}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Users
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ backgroundColor: '#E53E3E' }}>
                  <AdminIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {adminUsers}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Administrators
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ backgroundColor: '#FF8B00' }}>
                  <BusinessIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {new Set(users.map(u => u.department)).size}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Departments
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 3 }}>
        <Tab label="All Users" />
        <Tab label="Departments" />
        <Tab label="User Activity" />
      </Tabs>

      {tabValue === 0 && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell>Issues</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => {
                  const roleInfo = getRoleInfo(user.role);
                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ backgroundColor: roleInfo.color }}>
                            {getInitials(user.name)}
                          </Avatar>
                          <Box>
                            <Typography fontWeight="bold">{user.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              ID: {user.id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                            <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2">{user.email}</Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2">{user.phone}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.department}
                          size="small"
                          variant="outlined"
                          icon={<BusinessIcon />}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={roleInfo.label}
                          size="small"
                          sx={{
                            backgroundColor: `${roleInfo.color}20`,
                            color: roleInfo.color,
                          }}
                          icon={roleInfo.icon}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.active ? 'Active' : 'Inactive'}
                          size="small"
                          color={user.active ? 'success' : 'error'}
                          icon={user.active ? <ActiveIcon /> : <BlockIcon />}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {user.lastLogin}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">
                            Assigned: {user.issuesAssigned}
                          </Typography>
                          <Typography variant="body2">
                            Created: {user.issuesCreated}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => toggleUserStatus(user.id)}
                          color={user.active ? 'error' : 'success'}
                        >
                          {user.active ? <BlockIcon /> : <ActiveIcon />}
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleOpen(user)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(user.id)}
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
          {departments.map((dept) => {
            const deptUsers = users.filter(u => u.department === dept);
            const activeDeptUsers = deptUsers.filter(u => u.active).length;
            
            return (
              <Grid item xs={12} sm={6} md={4} key={dept}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Avatar sx={{ backgroundColor: '#3182CE' }}>
                        <BusinessIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {dept}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {deptUsers.length} users ({activeDeptUsers} active)
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box>
                      {deptUsers.slice(0, 3).map((user) => (
                        <Box key={user.id} display="flex" alignItems="center" gap={1} mb={1}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                            {getInitials(user.name)}
                          </Avatar>
                          <Typography variant="body2">{user.name}</Typography>
                          {!user.active && (
                            <Chip label="Inactive" size="small" color="error" />
                          )}
                        </Box>
                      ))}
                      {deptUsers.length > 3 && (
                        <Typography variant="caption" color="text.secondary">
                          +{deptUsers.length - 3} more users
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {tabValue === 2 && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Issues Assigned</TableCell>
                  <TableCell>Issues Created</TableCell>
                  <TableCell>Total Activity</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell>Activity Level</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .sort((a, b) => (b.issuesAssigned + b.issuesCreated) - (a.issuesAssigned + a.issuesCreated))
                  .map((user) => {
                    const totalActivity = user.issuesAssigned + user.issuesCreated;
                    const activityLevel = totalActivity > 20 ? 'High' : totalActivity > 10 ? 'Medium' : 'Low';
                    const activityColor = totalActivity > 20 ? 'success' : totalActivity > 10 ? 'warning' : 'error';
                    
                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={2}>
                            <Avatar sx={{ width: 32, height: 32 }}>
                              {getInitials(user.name)}
                            </Avatar>
                            <Typography fontWeight="bold">{user.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" color="primary">
                            {user.issuesAssigned}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" color="secondary">
                            {user.issuesCreated}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" fontWeight="bold">
                            {totalActivity}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {user.lastLogin}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={activityLevel}
                            size="small"
                            color={activityColor}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Add/Edit User Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingUser ? 'Edit User' : 'Add User'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
              required
            />
            
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Department</InputLabel>
              <Select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                label="Department"
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                label="Role"
              >
                {roles.map((role) => (
                  <MenuItem key={role.value} value={role.value}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box sx={{ color: role.color }}>
                        {role.icon}
                      </Box>
                      {role.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
              }
              label="Active User"
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingUser ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersAdmin;
  