// createSlice 创建 reducer 且 处理 action 并更新状态
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 使用 createAsyncThunk 创建异步 action
export const incrementAsync = createAsyncThunk(
  'count/incrementAsync',
  async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return amount;
  }
);

const countSlice = createSlice({
  name: 'count',
  initialState: {
    counter: 0,
    status: 'idle',
    error: null,
  },
  reducers: {
    increment: (state, action) => {
      console.log(state, action, 666);
      state.counter += action.payload;
    },
    decrement: (state, action) => {
      state.counter -= action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.counter += action.payload;
      })
      .addCase(incrementAsync.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

// 导出 action creator
export const { increment, decrement } = countSlice.actions;
// 导出 countSlice 的 reducer
export default countSlice.reducer;
