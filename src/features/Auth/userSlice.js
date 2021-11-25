import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import StorageKeys from 'constants/storage-keys';

export const register = createAsyncThunk('users/register', async (payload) => {
  // neu can dispatch mot action khac thi sai thunkAPI. thunkAPI them o phan tham so
  // call API to register
  const data = await userApi.register(payload);
  // save data to local storage
  // localStorage.setItem('token', data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
  // data tra ra khi request to server
  // console.log(data);
  return data.user; //cho nay return ra payload cho action*  Vi vay cho nay return ra user data
});

export const login = createAsyncThunk('users/login', async (payload) => {
  // neu can dispatch mot action khac thi sai thunkAPI. thunkAPI them o phan tham so
  const data = await userApi.login(payload);
  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.token);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  return data.user; //cho nay return ra payload cho action*  Vi vay cho nay return ra user data
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {}, // O day set gia tri State luc khoi tao
    setting: {},
  },
  reducers: {},
  extraReducers: {
    // [register.fulfilled] thuc ra cung la mot cai chuoi.
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    }, // action* here

    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { reducer } = userSlice;
export default reducer;
