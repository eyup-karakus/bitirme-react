import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Button,
  IconButton,
  Pagination,
  Stack,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Assignment as ProjectIcon,
  BugReport as IssueIcon,
  Timeline as SprintIcon,
  Warning as WarningIcon,
  ArrowForward as ArrowForwardIcon,
  Visibility as ViewIcon,
  BugReport,
  Assignment,
  Star,
  MoreVert as MoreVertIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useProject } from '../context/ProjectContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { projects } = useProject();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const issuesPerPage = 8;

  // Mock data for dashboard
  const [issues] = useState([
    { id: 1, title: 'Fix login authentication bug', type: 'bug', status: 'in_progress', priority: 'high', assignee: 'John Doe', project: 'E-Commerce Platform' },
    { id: 2, title: 'Implement user dashboard', type: 'story', status: 'todo', priority: 'medium', assignee: 'Alice Johnson', project: 'E-Commerce Platform' },
    { id: 3, title: 'Setup CI/CD pipeline', type: 'task', status: 'done', priority: 'high', assignee: 'Charlie Brown', project: 'Mobile App Development' },
    { id: 4, title: 'Mobile responsive design', type: 'story', status: 'in_progress', priority: 'medium', assignee: 'David Lee', project: 'Data Analytics Dashboard' },
    { id: 5, title: 'Database optimization', type: 'task', status: 'todo', priority: 'low', assignee: 'Emma Wilson', project: 'E-Commerce Platform' },
    { id: 6, title: 'API security improvements', type: 'bug', status: 'in_progress', priority: 'critical', assignee: 'Frank Miller', project: 'Mobile App Development' },
    { id: 7, title: 'User interface redesign', type: 'story', status: 'todo', priority: 'medium', assignee: 'Grace Chen', project: 'Data Analytics Dashboard' },
    { id: 8, title: 'Performance optimization', type: 'task', status: 'done', priority: 'high', assignee: 'Henry Davis', project: 'E-Commerce Platform' },
    { id: 9, title: 'Email notification system', type: 'story', status: 'in_progress', priority: 'low', assignee: 'Ivy Zhang', project: 'Mobile App Development' },
    { id: 10, title: 'Data backup automation', type: 'task', status: 'todo', priority: 'medium', assignee: 'Jack Wilson', project: 'Data Analytics Dashboard' },
    { id: 11, title: 'Cross-browser compatibility', type: 'bug', status: 'done', priority: 'high', assignee: 'Kate Brown', project: 'E-Commerce Platform' },
    { id: 12, title: 'Payment gateway integration', type: 'story', status: 'in_progress', priority: 'critical', assignee: 'Liam Johnson', project: 'Mobile App Development' },
    { id: 13, title: 'Search functionality enhancement', type: 'task', status: 'todo', priority: 'medium', assignee: 'Mia Davis', project: 'Data Analytics Dashboard' },
    { id: 14, title: 'Social media login integration', type: 'story', status: 'done', priority: 'low', assignee: 'Noah Wilson', project: 'E-Commerce Platform' },
    { id: 15, title: 'Real-time notifications', type: 'task', status: 'in_progress', priority: 'high', assignee: 'Olivia Chen', project: 'Mobile App Development' },
  ]);

  // Calculate statistics
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  
  const totalIssues = issues.length;
  const completedIssues = issues.filter(i => i.status === 'done').length;
  const inProgressIssues = issues.filter(i => i.status === 'in_progress').length;
  const todoIssues = issues.filter(i => i.status === 'todo').length;

  const highPriorityIssues = issues.filter(i => i.priority === 'high').length;
  const criticalIssues = issues.filter(i => i.priority === 'critical').length;

  // Pagination logic
  const totalPages = Math.ceil(issues.length / issuesPerPage);
  const startIndex = (currentPage - 1) * issuesPerPage;
  const currentIssues = issues.slice(startIndex, startIndex + issuesPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getProjectProgress = (project) => {
    if (!project.issues) return Math.floor(Math.random() * 100);
    return Math.round((project.completedIssues / project.issues) * 100);
  };

  const getStatusColor = (status) => {
    const colors = {
      todo: { bg: '#F4F5F7', color: '#42526E' },
      in_progress: { bg: '#FFF0B3', color: '#974F0C' },
      done: { bg: '#E3FCEF', color: '#006644' },
    };
    return colors[status] || { bg: '#F4F5F7', color: '#42526E' };
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: { bg: '#E3FCEF', color: '#006644' },
      medium: { bg: '#FFF4E6', color: '#974F0C' },
      high: { bg: '#FFEBE6', color: '#BF2600' },
      critical: { bg: '#FFEBE6', color: '#DE350B' },
    };
    return colors[priority] || { bg: '#E3FCEF', color: '#006644' };
  };

  const getTypeIcon = (type) => {
    const icons = {
      bug: <BugReport sx={{ color: '#FF5630', fontSize: 16 }} />,
      task: <Assignment sx={{ color: '#0052CC', fontSize: 16 }} />,
      story: <Star sx={{ color: '#36B37E', fontSize: 16 }} />,
    };
    return icons[type] || <Assignment sx={{ fontSize: 16 }} />;
  };

  const statsCards = [
    {
      title: 'Total Projects',
      value: totalProjects,
      subtitle: `${activeProjects} active • ${completedProjects} completed`,
      icon: <ProjectIcon sx={{ fontSize: 28 }} />,
      color: '#0052CC',
      bgColor: '#E3F2FD',
    },
    {
      title: 'Total Issues',
      value: totalIssues,
      subtitle: `${completedIssues} completed • ${inProgressIssues} in progress`,
      icon: <IssueIcon sx={{ fontSize: 28 }} />,
      color: '#FF5630',
      bgColor: '#FFEBE6',
    },
    {
      title: 'Active Sprints',
      value: 3,
      subtitle: '2 on track • 1 at risk',
      icon: <SprintIcon sx={{ fontSize: 28 }} />,
      color: '#36B37E',
      bgColor: '#E3FCEF',
    },
    {
      title: 'High Priority',
      value: highPriorityIssues + criticalIssues,
      subtitle: 'Needs immediate attention',
      icon: <WarningIcon sx={{ fontSize: 28 }} />,
      color: '#FF8B00',
      bgColor: '#FFF4E6',
    },
  ];

  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 112px)', 
      backgroundColor: '#F0F4F8',
      pb: 3 
    }}>
      {/* Header */}
      <Box mb={4} sx={{ backgroundColor: 'white', p: 3, borderBottom: '1px solid #DFE1E6' }}>
        <Typography variant="h4" fontWeight="600" color="#172B4D" mb={1}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="#6B778C" sx={{ fontSize: '15px' }}>
          Welcome back! Here's what's happening with your projects.
        </Typography>
      </Box>

      <Box sx={{ px: 3 }}>
        {/* Statistics Cards */}
        <Grid container spacing={4} mb={4}>
          {statsCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={6} xl={3} key={index}> {/* lg: 3'den lg: 6'ya değiştirildi, md ve xl eklendi */}
              <Card 
                sx={{ 
                  height: '180px',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  border: '1px solid #DFE1E6',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                  }
                }}
              >
                <CardContent sx={{ width: '100%', p: 4 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.5}>
                    <Box sx={{ flex: 1 }}> {/* flex: 1 eklendi */}
                      <Typography variant="h3" fontWeight="600" color="#172B4D" sx={{ fontSize: '3rem', lineHeight: 1 }}>
                        {card.value}
                      </Typography>
                      <Typography variant="body2" color="#6B778C" sx={{ fontWeight: 500, fontSize: '16px', mt: 0.5 }}>
                        {card.title}
                      </Typography>
                    </Box>
                    <Box 
                      sx={{ 
                        backgroundColor: card.bgColor,
                        borderRadius: '12px',
                        p: 2.5,
                        color: card.color,
                        ml: 2 // margin-left eklendi
                      }}
                    >
                      <Box sx={{ fontSize: 32 }}>
                        {React.cloneElement(card.icon, { sx: { fontSize: 32 } })}
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="caption" color="#6B778C" sx={{ fontSize: '13px' }}>
                    {card.subtitle}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Project Overview */}
        <Paper 
          sx={{ 
            p: 3, 
            mb: 4,
            backgroundColor: 'white',
            border: '1px solid #DFE1E6',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6" fontWeight="600" color="#172B4D">
              Project Overview
            </Typography>
            <Button
              variant="text"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/projects')}
              sx={{ 
                color: '#0052CC',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': { backgroundColor: '#E3F2FD' }
              }}
            >
              View All Projects
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {projects.slice(0, 4).map((project) => (
              <Grid item xs={12} sm={6} lg={3} key={project.id}>
                <Card 
                  sx={{ 
                    height: '180px',
                    backgroundColor: 'white',
                    border: '1px solid #DFE1E6',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" fontWeight="600" color="#172B4D" mb={0.5}>
                          {project.name}
                        </Typography>
                        <Typography variant="body2" color="#6B778C" sx={{ fontSize: '12px' }}>
                          Company-managed software
                        </Typography>
                      </Box>
                      
                      <IconButton 
                        size="small" 
                        onClick={() => navigate(`/projects/${project.id}`)}
                        sx={{ 
                          color: '#6B778C',
                          '&:hover': { color: '#0052CC', backgroundColor: '#E3F2FD' }
                        }}
                      >
                        <SettingsIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" color="#0052CC" sx={{ fontSize: '12px', fontWeight: 500, mb: 1 }}>
                        Quick links
                      </Typography>
                      
                      <Box mb={2}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                          <Typography variant="body2" color="#172B4D" sx={{ fontSize: '12px' }}>
                            My open work items
                          </Typography>
                          <Typography variant="body2" fontWeight="600" color="#172B4D" sx={{ fontSize: '12px' }}>
                            {Math.floor(Math.random() * 15)}
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" color="#6B778C" sx={{ fontSize: '12px', mb: 1 }}>
                          Done work items
                        </Typography>
                        
                        <Typography variant="body2" color="#0052CC" sx={{ fontSize: '12px', fontWeight: 500 }}>
                          {Math.floor(Math.random() * 5) + 1} board{Math.floor(Math.random() * 5) + 1 > 1 ? 's' : ''}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Recent Issues - Full Width */}
        <Paper 
          sx={{ 
            p: 3,
            backgroundColor: 'white',
            border: '1px solid #DFE1E6',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6" fontWeight="600" color="#172B4D">
              Recent Issues
            </Typography>
            <Button
              variant="text"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/issues')}
              sx={{ 
                color: '#0052CC',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': { backgroundColor: '#E3F2FD' }
              }}
            >
              View All Issues
            </Button>
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#F4F5F7' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#6B778C', fontSize: '12px', py: 1.5 }}>
                    Issue
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B778C', fontSize: '12px', py: 1.5 }}>
                    Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B778C', fontSize: '12px', py: 1.5 }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B778C', fontSize: '12px', py: 1.5 }}>
                    Priority
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B778C', fontSize: '12px', py: 1.5 }}>
                    Assignee
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B778C', fontSize: '12px', py: 1.5 }}>
                    Project
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B778C', fontSize: '12px', py: 1.5, width: 40 }}>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentIssues.map((issue) => (
                  <TableRow 
                    key={issue.id} 
                    hover
                    sx={{ 
                      '&:hover': { backgroundColor: '#F4F5F7' },
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate(`/issues/${issue.id}`)}
                  >
                    <TableCell sx={{ py: 2 }}>
                      <Box>
                        <Typography variant="body2" fontWeight="600" color="#0052CC" sx={{ fontSize: '13px' }}>
                          #{issue.id}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="#172B4D" 
                          sx={{ 
                            fontSize: '13px',
                            mt: 0.5
                          }}
                        >
                          {issue.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        {getTypeIcon(issue.type)}
                        <Typography variant="body2" color="#6B778C" sx={{ fontSize: '12px', textTransform: 'capitalize' }}>
                          {issue.type}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Chip
                        label={issue.status.replace('_', ' ').toUpperCase()}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(issue.status).bg,
                          color: getStatusColor(issue.status).color,
                          fontWeight: 600,
                          fontSize: '10px',
                          height: '22px',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Chip
                        label={issue.priority.toUpperCase()}
                        size="small"
                        sx={{
                          backgroundColor: getPriorityColor(issue.priority).bg,
                          color: getPriorityColor(issue.priority).color,
                          fontWeight: 600,
                          fontSize: '10px',
                          height: '22px',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar sx={{ width: 24, height: 24, fontSize: 11, bgcolor: '#0052CC' }}>
                          {issue.assignee?.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" color="#172B4D" sx={{ fontSize: '12px' }}>
                          {issue.assignee}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" color="#6B778C" sx={{ fontSize: '12px' }}>
                        {issue.project}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <IconButton 
                        size="small"
                        sx={{ 
                          color: '#6B778C',
                          '&:hover': { color: '#0052CC' }
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <MoreVertIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="medium"
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontSize: '14px',
                  }
                }}
              />
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
