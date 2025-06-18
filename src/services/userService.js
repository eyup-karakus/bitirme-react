// src/services/userService.js
import { userService as apiUserService } from './api';

// API'den gelen kullanıcı verisini frontend formatına dönüştürme
const mapUserFromApi = (apiUser) => {
  return {
    userId: apiUser.userId,
    firstName: apiUser.firstName || '',
    lastName: apiUser.lastName || '',
    fullName: apiUser.fullName || '',
    email: apiUser.email || '',
    roleId: apiUser.roleId,
    isActive: apiUser.isActive,
    createdAt: apiUser.createdAt,
    updatedAt: apiUser.updatedAt,
    passwordResetToken: apiUser.passwordResetToken,
    resetTokenExpires: apiUser.resetTokenExpires
  };
};

// Frontend'den API'ye gönderilecek kullanıcı verisini dönüştürme
const mapUserToApi = (frontendUser) => {
  const apiData = {
    firstName: frontendUser.firstName,
    lastName: frontendUser.lastName,
    fullName: frontendUser.fullName,
    email: frontendUser.email,
    roleId: frontendUser.roleId,
    isActive: frontendUser.isActive
  };

  // Password sadece varsa ekle
  if (frontendUser.password) {
    apiData.password = frontendUser.password;
  }

  return apiData;
};

export const userService = {
  getAll: async () => {
    try {
      const response = await apiUserService.getAll();
      // Response'ı kontrol et ve map et
      const users = response.data || response;
      return Array.isArray(users) ? users.map(mapUserFromApi) : [];
    } catch (error) {
      console.error('UserService.getAll error:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await apiUserService.getById(id);
      return mapUserFromApi(response.data || response);
    } catch (error) {
      console.error('UserService.getById error:', error);
      throw error;
    }
  },
  
  create: async (userData) => {
    try {
      const apiData = mapUserToApi(userData);
      const response = await apiUserService.create(apiData);
      return mapUserFromApi(response.data || response);
    } catch (error) {
      console.error('UserService.create error:', error);
      throw error;
    }
  },
  
  update: async (id, userData) => {
    try {
      const apiData = mapUserToApi(userData);
      const response = await apiUserService.update(id, apiData);
      return mapUserFromApi(response.data || response);
    } catch (error) {
      console.error('UserService.update error:', error);
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await apiUserService.delete(id);
      return true;
    } catch (error) {
      console.error('UserService.delete error:', error);
      throw error;
    }
  }
};