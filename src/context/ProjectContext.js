import React, { createContext, useContext, useState } from 'react';

const ProjectContext = createContext();

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'Building a modern e-commerce platform with React and Node.js',
      status: 'active',
      priority: 'high',
      createdAt: '2024-01-15',
      issues: 24,
      completedIssues: 18,
      teamMembers: 6,
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Cross-platform mobile application using React Native',
      status: 'planning',
      priority: 'medium',
      createdAt: '2024-02-01',
      issues: 12,
      completedIssues: 3,
      teamMembers: 4,
    },
    {
      id: 3,
      name: 'Data Analytics Dashboard',
      description: 'Real-time analytics dashboard for business intelligence',
      status: 'completed',
      priority: 'low',
      createdAt: '2023-12-10',
      issues: 15,
      completedIssues: 15,
      teamMembers: 3,
    },
  ]);

  const value = {
    projects,
    setProjects,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
