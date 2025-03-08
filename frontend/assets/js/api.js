// Base API URL
const API_URL = '/api';

// Helper function to handle fetch responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'API request failed');
  }
  return response.json();
};

// Add auth token to requests
const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// API functions for Applicants
export const applicantAPI = {
  // Get all applicants
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/applicants`, {
        method: 'GET',
        headers: getHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      throw error;
    }
  },
  
  // Get applicant by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/applicants/${id}`, {
        method: 'GET',
        headers: getHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error fetching applicant ${id}:`, error);
      throw error;
    }
  },
  
  // Create new applicant
  create: async (applicantData) => {
    try {
      const response = await fetch(`${API_URL}/applicants`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(applicantData)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error creating applicant:', error);
      throw error;
    }
  },
  
  // Update applicant
  update: async (id, applicantData) => {
    try {
      const response = await fetch(`${API_URL}/applicants/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(applicantData)
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error updating applicant ${id}:`, error);
      throw error;
    }
  },
  
  // Delete applicant
  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/applicants/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error deleting applicant ${id}:`, error);
      throw error;
    }
  }
};
