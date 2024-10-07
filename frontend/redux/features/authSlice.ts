// app/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { postData } from '@/utils/fetch.api';  // Import your postData API helper

// Define initial state for auth
interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  userId: null,
};

type logInResponse = {
    message: string;
    status: boolean;
    token?: string;
    id?: string;
  };
  

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credential: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response:logInResponse = await postData('/auth/login', credential);
      if (response && response.status && response.token && response.id) {
        // Save token and id in cookies
        Cookies.set('token', response.token);
        Cookies.set('id', response.id);
        return { token: response.token, userId: response.id };
      } else {
        return rejectWithValue(response.message || 'Login failed');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
      Cookies.remove('token');
      Cookies.remove('id');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
