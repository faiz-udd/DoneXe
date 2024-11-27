import axios from 'axios';

const API_URL = '/api/tasks/';

//Create Tasks

const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const response = await axios.post(API_URL, taskData, config);
  return response.data;
};
//Get Tasks
const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};
//delete Task
const deleteTask = async (id, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization header for the token
      },
    };
  
    const response = await axios.delete(`${API_URL}${id}`, config); // Use template literals for clarity
    return response.data;
  };
  


const taskService = { createTask, getTasks, deleteTask };
export default taskService;
