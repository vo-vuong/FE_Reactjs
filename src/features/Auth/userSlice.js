import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';

export const register = createAsyncThunk('users/register', async (payload) => {
  // neu can dispatch mot action khac thi sai thunkAPI. thunkAPI them o phan tham so
  // call API to register
  const data = await userApi.register(payload);
  // save data to local storage
  // localStorage.setItem('token', data.jwt);
  localStorage.setItem('user', JSON.stringify(data.data.object));
  // data tra ra khi request to server
  // console.log(data);
  // console.log(data.data.object);
  return data.data.object; //cho nay return ra payload cho action*  Vi vay cho nay return ra user data
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {},
    setting: {},
  },
  reducers: {},
  extraReducers: {
    // [register.fulfilled] thuc ra cung la mot cai chuoi.
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    }, // action* here
  },
});

const { reducer } = userSlice;
export default reducer;
