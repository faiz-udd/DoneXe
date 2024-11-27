import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from './taskService'

const initialState = {
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//create Task
export const createTask = createAsyncThunk(
    'tasks/create',
    async (taskData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await taskService.createTask(taskData, token)
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )
//GetTask
export const getTasks = createAsyncThunk(
    'tasks/getAll',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user?.token; // Ensure user and token exist
  
        // If token is missing, reject the request early
        if (!token) {
          return thunkAPI.rejectWithValue('No authentication token found');
        }
  
        return await taskService.getTasks(token);
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
  
        return thunkAPI.rejectWithValue(message);
        
      }
    });

 //Delete task
 export const deleteTask = createAsyncThunk(
    'tasks/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await taskService.deleteTask(id, token);
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  

export const taskSlice = createSlice({
  name: 'task', // Fixed quotes
  initialState,
  reducers: {
    reset: (state) => initialState, // Reset the state
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload); // Assuming action.payload contains the newly created task
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // Handle the error message
      })
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;  // Set tasks to the payload (list of tasks)
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;  // Set error message from the action payload
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = state.tasks.filter(task => task._id !== action.payload.id); // Ensure `action.payload.id` matches the backend response
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
      
  },  
})




export const { reset } = taskSlice.actions; // Destructure reset action
export default taskSlice.reducer; // Export the reducer
