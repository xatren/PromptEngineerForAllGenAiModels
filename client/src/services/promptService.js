import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generate a prompt using the API
export const generatePrompt = async (promptData) => {
  try {
    const response = await axios.post(`${API_URL}/generator/generate`, promptData);
    return response.data;
  } catch (error) {
    console.error('Error generating prompt:', error);
    throw error;
  }
};

// Save a prompt using the API
export const savePrompt = async (promptData) => {
  try {
    const response = await axios.post(`${API_URL}/prompts/save`, promptData);
    return response.data;
  } catch (error) {
    console.error('Error saving prompt:', error);
    throw error;
  }
};

// Get all saved prompts
export const getSavedPrompts = async () => {
  try {
    const response = await axios.get(`${API_URL}/prompts/saved`);
    return response.data;
  } catch (error) {
    console.error('Error fetching saved prompts:', error);
    throw error;
  }
};

// Update a saved prompt
export const updatePrompt = async (id, promptData) => {
  try {
    // Prompt güncelleme API'si henüz uygulanmadı, savePrompt'u kullanabiliriz
    const response = await axios.post(`${API_URL}/prompts/save`, promptData);
    return response.data;
  } catch (error) {
    console.error('Error updating prompt:', error);
    throw error;
  }
};

// Delete a saved prompt
export const deletePrompt = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/prompts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting prompt:', error);
    throw error;
  }
}; 